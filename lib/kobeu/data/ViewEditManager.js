/**
 * @private
 * This class manages the influences of data update on source elements, and
 * reflects to the join elements.
 *
 */

Ext.define('KobeU.data.ViewEditManager', {
	singleton : true,
	requires:['KobeU.data.EditErrorReport',"KobeU.data.EditWarning"],

	logFlag: false, logEventFlag: false,
	profileResult: { start: undefined, time0: {}, timeL: {}, events: []},
	logTime: function(label) {
		if(!this.logFlag) return;
		var time = Ext.Date.now();
		this.triggerProfile(time);

		if(!this.profileResult.time0[label])
			this.profileResult.time0[label]=time;
		this.profileResult.timeL[label]=time;
	},
	logEvent: function(label,item) {
		if(!this.logEventFlag) return;
		var time = Ext.Date.now();
		this.triggerProfile(time);
		this.profileResult.events.push({label:label, time: time, item: item});
	},
	triggerProfile: function(time) {
		var me=this;
		if(!this.profileResult.start) {
			this.profileResult.start=time;
			setTimeout(function() {
				me.printProfile();
			}, 5000);
		}
	},
	printProfile: function() {
		console.log("Output Profile@"+this.profileResult.start);
		for(var l in this.profileResult.timeL) {
			console.log(l+": "+(this.profileResult.time0[l]-this.profileResult.start) + ":"+ (this.profileResult.timeL[l]-this.profileResult.start));
		}
		for(var i=0; i< this.profileResult.events.length; i++) {
			var log = this.profileResult.events[i];
			console.log("Event: "+log.label+"@"+log.time);
			console.log(log.item);
		}
		this.profileResult = { start: undefined, time0: {}, timeL: {}, events: []};
		console.log("Output Profile Finish------");
	},



	/*
	 *
	 * TODO
	 * check the field is editable or not.
	 * @param {} record
	 * @param {} fieldName
	 * @param {} flag set true if you want to gatehr warning messages.
	 * @return {Object} ..説明..
	 */
	checkEditable : function(record, fieldName, flag) {
		if (!(record instanceof Ext.data.Model)) {
			Ext.log("KobeU.data.ViewEditManager: CheckEditable is called for NON-model instances.");
			return undefined;
		} else if (!record) {
			return undefined;
		} else if (record.isJoined) {
			return checkEditableJoined(record, fieldName, flag);
		} else if (record.isEditable) {
			return checkEditableSrc({},record, fieldName, flag);
		} else {
			return true;
		}
	},
	checkFieldsLoop : function(member, record, fields, flag) {
		if (Ext.isArray(fields)) {
			var result = {};
			for (f1 in fields) {
				result[fields[f1]] = this[member].call(this, record,
						fields[f1], flag);
			}
			return result;
		} else if (Ext.isObject(fields)) {
			var f1, result = {};
			for (f1 in fields) {
				result[f1] = this[member].call(this, record, f1, flag);
			}
			return result;
		} else {
			return undefined;
		}
	},
	/*
	 * check whether the set operation on the given field may occur {KobeU.data.EditWarnings} or not.
	 * @param {} record the target source
	 * @param {} fieldName the name of the target field.
	 * @param {} flag set true if you want to gatehr warning messages.
	 * @return {}
	 */
	checkEditableSrc : function(report, record, fieldName, flag) {
		if (!(Ext.isString(fieldName)))
			return this.checkFieldsLoop('checkEditableSrc', record, fieldName,
					flag);
		var i = 0, result = [];
		for (i = 0; i < record.attendingJRecord.length; i++) {
			var j = record.attendingJRecord[i],
				joined = j.joined,
				label = j.label,
				r = joined.manager.checkWrittenRight(joined, label, fieldName);
			if (r) {
				if (flag){
					return KobeU.data.EditErrorReport.addWarning(report,
						new KobeU.data.EditWarning.loseModifiedViews(r));
				}
				else{
					report=KobeU.data.EditErrorReport.addWarning(report,
						new KobeU.data.EditWarning.loseModifiedViews(r));
					//result.push(r);
				}
			}
		}
		if (report.warning && report.warning.length > 0){
			return report;
		}
		else
			return false;
			//return {};
	},
	/*
	 * check whether the set operation on the given field may occur {KobeU.data.EditError}
	 * @param {} record  the target joined element
	 * @param {} fieldName  the name of the target field OR the JSON of which attribute names are the written field names.
	 * @param {} flag set true if you want to gatehr warning messages.
	 * @return {}
	 */
	checkEditableJoined : function(record, fieldName, flag) {
		if (!(Ext.isString(fieldName))) {
			return this.checkFieldsLoop('checkEditableJoined', record,
					fieldName, flag);
		}

		var f2v = {};
		f2v[fieldName] = true;
		var result = record.manager.checkEditProtection(record, f2v, flag);
		if (flag || result.error) {
			return result;
		} else {
			var label = record.manager.jfield2alias(fieldName),
				src = record.getSrc(label),
				ofield = record.manager.orgFieldName(fieldName);
			result=this.checkEditableSrc(result, src, ofield, flag);
			return result;
		}
	},

	/*
	 * This method checks the influence of the modifications (f2v) on record.
	 * It checks the joined elements that the record joins, and also checks the
	 * joined elemenets that previously cannot find the matched source elements
	 * for the class that the record belongs.
	 * @param {} record
	 * @param {} f2v
	 */
	editSrc : function(record, f2v) {
		record.orgSet(f2v);
		// check the join elements having "record" as source element.
		var i = 0, result = [];
		var tmpJRecord = record.attendingJRecord.concat();
		for (i = 0; i < tmpJRecord.length; i++) {
			var j = tmpJRecord[i], joined = j.joined, label = j.label;
			joined.manager.processSrcReflection(joined, label, record);
			if (Ext.Object.isEmpty(f2v))
				joined.commitOrRevertL(label)
		}

		// scan all the joined elements that can not find any source elements
		// for the model that "record" belongs.
		KobeU.data.LJoinRegistry.each(function(manager) {
			for (var join in manager.joins) {
				var joininfo = manager.joins[join];
				if (record instanceof joininfo.model) {
					var label = manager.joins[join].label;
					if(joininfo.index !=0 && record instanceof joininfo.model) {
						manager.joinPool.forEach(function(joined) {
							if (joined.src[label].elem == null) {
								joined.manager.checkSelectionForModifiedSrc(
										joined, record, label);
							}
						});
					}
				}
			}
		});
	},

	/*
	 * This method checks the influence of the deletion of the source element srecord.
	 *
	 * @param {} srecord
	 */
	deleteSrc : function(srecord) {
		srecord.attendingJRecord.forEach(function(r) {
			if (r.joined.manager.isDestroyed(r.joined)) return;
			if (r.joined.getLeftMost() == srecord) {
				r.joined.destroy();
			} else {
				r.joined.manager.processSrcReflection(r.joined,
						r.label, null);
			}
		});
	},

	/*
	 * The following methods are used to manage the join relation
	 * between the source elements and the joined element.
	 */

	setupJoinInfo : function(srecord) {
		Ext.apply(srecord, {
					attendingJRecord : []
				});
	},
	srcAttendJRecord : function(srecord, joined, label) {
		if (srecord)
			srecord.attendingJRecord.push({
						joined : joined,
						label : label
					});
	},
	srcLeaveJRecord : function(srecord, joined, label) {
		if (!srecord)
			return;
		var i = 0, next = [], len = srecord.attendingJRecord.length;
		for (; i < len; i++) {
			var r = srecord.attendingJRecord[i];
			if (r.joined != joined || r.label != label)
				next.push(r);
		}
		srecord.attendingJRecord = next;
	}
});
