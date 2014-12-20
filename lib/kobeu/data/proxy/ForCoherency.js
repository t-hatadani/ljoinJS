/**
 *
 * The ForCoherency proxy is a proxy wrapper to attach the following facilities:
 *     * prepare instance cache and check the cache before invoking Web request,
 *     * prepare request buffers to restrain the number of Web requests at a time and merge multiple requests into a single one,
 *     * watch the incoming instances to keep the singleness of each incomming object,
 *     * and watch data changes on the instances and reflect the changes onto the joined instances ({@link KobeU.data.LJoinManager}).
 *
 * You can wrap ProxyA with the ForCoherency proxy as follows:
 *
 *     proxy: {
 *         type: forCoherency,
 *         delegatedTo: ProxyA,
 *         // and other attributes for ProxyA
 *     }
 *
 * @author Tomio Kamada, Takuya Hatadani
 */

Ext.define('KobeU.data.proxy.ForCoherency', {
	extend : 'Ext.data.proxy.Client',
	requires : ['Ext.util.MixedCollection', 'Ext.data.Store',
			'Ext.data.StoreManager', 'KobeU.data.ViewEditManager'],
	alias : 'proxy.forCoherency',
	nowRequesting : false,

	/**
	 * create a Proxy.
	 *
	 * @param {} config Config Object
	 */
	constructor : function(config) {
		this.callParent([]);
		var a = new Date;
		this.proxyBody = Ext
				.createByAlias("proxy." + config.delegateTo, config);
		if (!this.bufferingTime) this.bufferingTime = 100;
		if (!this.expiration) this.expiration=5*60*1000;
	},
	/**
     * @cfg {Boolean} delegatedTo
     * The proxy to be wrapped. Required.
     * If the delegatedTo proxy has a method mergeRequests(....)
     *
     *
     */

	/**
     * @cfg {int} bufferingTime
     * the buffering time (in msec) for merge Web requests. Optional. The default value is set to 100.
     */


	/**
	 * This method inserts the hooks onto the target Model of the proxy, and call the parent.
	 * @param {} model  target model class
	 * @param {} setOnStore this argument is passed to the parent.
	 */
	setModel : function(model, setOnStore) {
		// customize the target model
		var proxy4coherent = this;

		model.addMembers({
				isEditable: function(fields, flag) {
							return KobeU.data.ViewEditManager.checkEditableSrc({},this,
								fields, flag);
				},
				attendJRecord: function(joined, label) {
						return KobeU.data.ViewEditManager.srcAttendJRecord(this,
							joined, label);
				},
				leaveJRecord:  function(joined, label) {
					return KobeU.data.ViewEditManager.srcLeaveJRecord(this,
							joined, label);
				},
				cusDestroy: function(options) {
						var successHook = function(scope, args) {
							if(options)
								Ext.callback(options.success, scope, args);
						};
						var options2 = Ext.applyIf({
									"success" : successHook
								}, options);
						this.orgDestroy(options2);
						if(!options || !options.ackedDestroy) {
							KobeU.data.ViewEditManager.deleteSrc(this); // check after removeing this from cache.
						}
				},
				cusSet: function(field, val) {
						if (field === "") {
							Ext.log("set receives empty field name>kumagai");
							return;
						}
						var single = (typeof field == 'string'), f2v, f;
						if (single) {
							f2v = {};
							f2v[field] = val;
						} else {
							f2v = field;
						}
						KobeU.data.ViewEditManager.editSrc(this, f2v);
				}
		});
		model.override('init', function() {
					proxy4coherent.add2Cache(this);
					this.time=new Date().getTime();
					this.orgSet = this.set;
					this.orgDestroy = this.destroy;
					this.set = this.cusSet;
					this.destroy = this.cusDestroy;
					KobeU.data.ViewEditManager.setupJoinInfo(this);
					KobeU.data.ViewEditManager.editSrc(this,this.data);
				});

		this.proxyBody.setModel(model, setOnStore);
		this.callParent([model, setOnStore]);
		var storekey = 'CoherentStore' + model.getName();
		this.cache = Ext.data.StoreManager.get(storekey);
		if (!this.cache) {
			this.cache = Ext.create('Ext.data.Store', {
						model : this.proxyBody.getModel(),
						proxy : this.proxyBody,
						storeId : storekey
					});
			this.cache.msgBuffer = [];
			this.cache.msgPending = false;
			this.cache.internal = {};
		}
	},

	/*
	 *
	 * add the record to the cache pool.
	 * @param {} record
	 */
	add2Cache : function(record) {
		// FIXME
		// This method is not only called by user, but also by the import routines
		// of proxies to build the instances from the received data.
		// Now, we add the both elements in the cache, and remove the later ones at merging processes.
		if(record.phantom || (record.getId()&&!this.cache.getById(record.getId()))) {
			this.cache.add(record);
		}
	},
	/**
	 * remote cached records that are not belongs to other stores, any joined elements, and not dirty.
	 */
	clearCache : function() {
		var me=this,
			toRemove = [];
		me.cache.each(function(record0) {
			if(record0.stores.length===1 && Ext.isEmpty(record0.attendingJRecord)
				&& !record0.dirty) {
				toRemove.push(record0);
			}
		});
		me.cache.remove(toRemove);
	},

	/*
	 *
	 * This method is used to merges the incoming source elements with the previously image that received before.
	 *
	 * @param {} ope
	 * @return {}
	 */
	mergeRecords : function(ope) {
		var me = this,
			records = ope.getRecords(),
			isSuccess = ope['success'];
		if (!records)
			return [];

		records.forEach(function(record) {
			me.cache.each(function(record0) {
				if((record0.getId() == record.getId()) && (record0 != record)) {
					if(isSuccess) me.mergeArrived(record0, record);
				}
			});
		});
		return this.readCache(ope).result;
	},

	/*
	 * This method is used to afterprocess of create/update methods for ForCohenrecy.
	 * For the creation, this may include update of id properties, and we have to propage the modifications.
	 *
	 * @param {} ope
	 * @param {} isCreate
	 * @return {}
	 */
	mergeRecordsForCU : function(ope, isCreate) {
		var records = ope.getRecords(),
			toRemove = [],
			nrecords = [],
			me = this;
		records.forEach(function(record) {
			var src = undefined;
			me.cache.each(function(record0) {
				if((record0.getId() == record.getId()) && (record0 != record)) {
					src = record0;
				}
			});
			//FIXME
			delete record.inMutation;
			if(src) {
				toRemove.push(src);
				nrecords.push(record);
			} else {
				//nrecords.push(src);
			}
		});
		this.cache.remove(toRemove);
		records = nrecords;
		for (i = 0, len = records.length; i < len; i++) {
			KobeU.data.ViewEditManager.editSrc(records[i], {});
		}
		return records;
	},
	/*
	 * This method is used to process the acknowledgeent of the source deletion requests.
	 * We have to remove the source elements from the cache.
	 *
	 * @param {} ope
	 * @param {} ackedDestroy tells whether the source elements is deleted from the cache after receiving the acknowledgement from the servers.
	 * @return {} return the deleted records
	 */
	mergeRecordsForDelete : function(ope, ackedDestroy) {
		var records = ope.getRecords();
		for (i = 0, len = records.length; i < len; i++) {
			var index=0, toRemove=undefined;
			if(ackedDestroy) {
				KobeU.data.ViewEditManager.deleteSrc(records[i]);
			}

			this.cache.each(function(record0) {
				if(record0.getId()==records[i].getId()) toRemove=index;
				index++;
			});

			this.cache.removeAt(toRemove);
		}
		return records;
	},

	/*
	 * This method is used to merge the newly received element with the previosly reeived image of the same element.
	 * @param {} record0 previous one
	 * @param {} record1 new one
	 */

	mergeArrived : function(record0, record1) {
		var fs = record0.fields, dirty = false, modified = {}, changed = {};
		fs.each(function(f) {
					var nval = record1.get(f.name);
					if (record0.modified[f.name] == nval) {
						// When a field is in modification and the previous value is equals to the received one,
						// keep the modified state.
						dirty = true;
						modified[f.name] = nval;
						changed[f.name] = record0.modified[f.name];
					} else if (record0.modified[f.name]) {
						// TODO
						// When a field in in modification and a new value is arrived from server,
						// it may be better to ask the users to the situations.
						dirty = true;
						modified[f.name] = record1.data[f.name];
						changed[f.name] = record0.modified[f.name];
					} else if (record0.get(f.name) != nval) {
						record0.set(f.name, nval);
					}
				});
		// The following implementation throw modifications and accept new data from servers.
		for (c in modified) {
			if (changed[c] != record1.get(c)) {
				record0.data[c] = modified[c];
				delete modified[c];
			}
		};
		record0.modified = modified;
		if (Object.keys(record0.modified).length == 0) {
			record0.dirty = false;
			record0.editing = false;
		}
		record0.time=new Date().getTime();
		// FIXME
		//record0.id = record1.id;
		//record0.internalId = record1.internalId;
	},

	/*
	 * This method is used to check whether the given filter will retrun true on the source element
	 * when we revert the the modification on the elements.
	 *
	 *
	 * @param {} filter
	 * @param {} elem
	 * @return {}
	 */
	orgvalFilter : function(filter, elem) {
		var data0 = elem.data;
		var data = Ext.apply({}, data0);
		Ext.apply(data, elem.modified);
		elem.data = data;
		var result = filter.filter.call(filter, elem);
		elem.data = data0;
		return result;
	},

	/*
	 * search on the cache.
	 * Note that the elements in mutation needs special care for concurrent read on the target elements.
	 * @param {} ope
	 * @param {} scope
	 * @return {} The result is formed as { result: results, removed: removed}. The elements in removed does not satisfy the search filter now, but satisfied the filter before the modification was applied.
	 */
	readCache : function(ope, scope) {
		var me = this, limit = ope.limit, result = [], oresult = [], filters = ope.filters;
		for (i = 0; i < filters.length; i++) {
			if (!filters[i].filter) {
				return [];
			}
		}

		this.cache.findBy(function(elem) {
					if (limit > 0) {
						var i=0, j;
						if(elem.inMutation!='delete') {
							for (; i < filters.length; i++) {
								if (!filters[i].filter.call(filters[i], elem))
									break;
							}
						}
						if (elem.inMutation!='delete' && i == filters.length) {
							result.push(elem);
							limit--;
						} else {
							for (j = 0; j < filters.length; j++) {
								if (!me.orgvalFilter(filters[j], elem))
									break;
							}
							if (j == filters.length) {
								oresult.push(elem);
							}
						}
					}
					return limit == 0;
				});
		var now=new Date().getTime();
		var checkedResult=[];
		var expirationTime=this.expiration
		result.forEach(function(record){
			if(now-record.time<expirationTime){
				checkedResult.push(record);
			}
		});
		return {
			result : checkedResult,
			removed : oresult
		};
	},


	packAndCallback : function(results, ope, callback, scope) {
		Ext.apply(ope, {
					resultSet : new Ext.data.ResultSet({
								records : results
							})
				});
		ope.setCompleted();
		ope.setSuccessful();
		Ext.callback(callback, ope.scope || scope, [ope]);
	},

	/*
	 * check whether there are pending requests to the server,
	 * and trigger sending of message in the bufferingTime period.
	 *
	 */
	checkMsgSend : function(method, ope, callback, scope) {
		this.cache.msgBuffer.push({
					method : method,
					ope : ope,
					callback : callback,
					scope : scope
				});
		if (this.cache.msgPending) {
			// TODO
			// 長かったらなんかすべきでは？
			return true;
		} else {
			// TODO
			// The following code may need care for race conditions..
			var me = this, time = Ext.Date.now();
			this.cache.msgPending = time;
			setTimeout(function() {
						if (me.cache.msgPending == time) {
							me.cache.msgPending = me.checkMsgBuffer();
						}
					}, me.bufferingTime);
			return false;
		}
	},

	/*
	 * merge requests when proxyBody has mergeRequests method.
	 */
	mergeRequests : function(keepRequest, nextRequest, cacheResult) {
		// call the mergeRequests method if the proxy provides.
		if (this.proxyBody.mergeRequests != null) {
			keepRequest = this.proxyBody.mergeRequests(keepRequest, nextRequest, cacheResult);
		}
		return keepRequest;
	},

	/*
	 *
	 */
	checkMsgBuffer : function() {
		var me = this;
		var buf = this.cache.msgBuffer;
		var keepOpe = null;
		var newOpe = null;
		this.cache.msgBuffer = [];
		this.cache.msgPending = false;

		for (i in buf) {
			var next = buf[i];
			var cacheResult = this.readCache(next.ope);
			var isComplete = false;

			if (arguments.callee.caller.arguments.length != 0) {
				isComplete = arguments.callee.caller.arguments[0].complete;
			}

			if (cacheResult.result.length >= next.ope.limit || isComplete) {
				// if you can find enough results from cache, exec packAndCallback.
				this.packAndCallback(cacheResult.result, next.ope,
						next.callback, next.scope);
				arguments.callee.caller.arguments[0].complete = false;
				continue;
			} else {
				// start request invocation process
				this.cache.msgBuffer.push(next);
				if (this.proxyBody.mergeRequests) {
					keepOpe = this.proxyBody.mergeRequests(keepOpe, next, cacheResult);
				} else {
					if (keepOpe == null)
						keepOpe = next.ope;
				}
			}
		}

		if (arguments.callee.caller.arguments.length != 0) {
			isComplete = false;
		}

		if (keepOpe != null && this.nowRequesting == false) {
			this.nowRequesting = true;
			var callback = function(operation) {
				me.nowRequesting = false;
				if(operation.action=="read") {
				    me.mergeRecords(operation);
				} else {
					me.mergeRecordsForCU(operation);
				}
				me.checkMsgBuffer();
				// TODO
				// If the number of results is less than limit value,
				// our system SHOULD recognize that the server has no more elements that meets the search conditions.
			};
			var ope = new Ext.data.Operation(keepOpe);
			ope.setStarted();
			this.proxyBody.read(ope, callback, callback);
		}
		return (this.cache.msgBuffer.length != 0);
	},

	/**
	 * This method process read operations.
	 * This proxy first checks the caches and the it return the result if enough records
	 * are found in the record. Otherwise, it prepares search queries to servers.
	 *
	 */
	read : function(orgoperation, orgcallback, orgscope) {
		var me = this;
		// cache check
		var cacheResult = this.readCache(orgoperation);
		if (cacheResult.result.length >= orgoperation.limit) {
			// OR has some results in early response mode.
			this.packAndCallback(cacheResult.result, orgoperation, orgcallback,
					orgscope);
			return;
		}
		orgoperation.complete = false;
		this.checkMsgSend('read', orgoperation, orgcallback, orgscope)
	},

	/**
	 * This method process create operations.
	 * @param {} operation
	 * @param {} callback
	 * @param {} scope
	 */
	create : function(orgoperation, orgcallback, orgscope) {
		// delegate all the create requests.
		if (orgoperation.records) {
			var rBeforeCreation = [], records=orgoperation.records;
			records.forEach(function (record) {
				if(record.phantom && !record.inMutation) {
					rBeforeCreation.push(record);
					record.inMutation='create';
				}
			});
			orgoperation.records=rBeforeCreation;
			var me = this, orecords = orgoperation.records;
			var callback = function(operation) {
				var jrecords = me.mergeRecordsForCU(operation, true);
				jrecords.forEach(function(record) {delete record.inMutation;});
				me.packAndCallback(jrecords, orgoperation, orgcallback,
						orgscope);
			};
			this.proxyBody.create(orgoperation, callback, orgscope);
		}
	},

	/**
	 *
	 * @param {} operation
	 * @param {} callback
	 * @param {} scope
	 */
	update : function(orgoperation, orgcallback, orgscope) {
		if (orgoperation.records) {
			var me = this, orecords = orgoperation.records;
			var callback = function(operation) {
				var jrecords = me.mergeRecordsForCU(operation, false);
				me.packAndCallback(jrecords, orgoperation, orgcallback,
						orgscope);
			};
			this.proxyBody.update(orgoperation, callback, orgscope);
		}
	},

	destroy : function(orgoperation, orgcallback, orgscope) {
		if (orgoperation.records) {
			var targets = [], records=orgoperation.records;
			records.forEach(function (record) {
				if(!record.inMutation||record.inMutation!='delete') {
					targets.push(record);
					record.inMutation='delete';
				}
			});
			orgoperation.records=targets;
			var me = this, orecords = orgoperation.records;
			var callback = function(operation) {
				var jrecords = me.mergeRecordsForDelete(operation, orgoperation.options && orgoperation.options.ackedDestroy);
				jrecords.forEach(function(record) {delete record.inMutation;});
				me.packAndCallback(jrecords, orgoperation, orgcallback,
						orgscope);
				//me.checkMsgBuffer();
			};
			this.proxyBody.destroy(orgoperation, callback, orgscope);
		}
	}
});
