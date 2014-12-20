/**
 *
 *
 * The LJoinManager is a manager to define a kind of join relations between Models.
 * This manager assumes models with remote proxies.
 * You can join multiple models with specifying join conditions as follows:
 *
 *     var manager = new KobeU.data.LJoinManager([
 *         {alias: 'model0', tableID:'Model0' },
 *         {alias: 'model1', tableID:'Model1',
 *          selections:[ { property: 'field1a', value: { table: 'model0', property: 'field0a'}},
 *                       { property: 'field1b', value: { table: 'model0', property: 'field0b'}}]},
 *         {alias: 'model2', tableID:'Model1',
 *          selections:[ { property: 'field2a', value: { table: 'model0', property: 'field0c'}},
 *                       { property: 'field2b', value: { table: 'model1', property: 'field1d'}}]}]);
 *
 * In this case, the manager joins model0 with model1 and model2 with the specified join conditions, and create a corresponding joined Model. In this example, the join condition for each right table is as follows:
 *
 * * model1.field1a == model0.field0a && model1.field1b == model0.field0b  (join condition for model1)
 * * model2.field2a == model0.field0c && model2.field2b == model1.field1d  (join condition for model2)
 *
 * The joined model receives a leftmost source element, and searches the corresponding
 * right source elements that meets the join conditions.
 *
 * Note: This LJoinManager assumes the source Models that use Proxies wrapped with ForCohenrecy Proxy described below.
 * This library assumes Ext JS version 2.4.1.
 *
 * ## create joined instances/stores.
 *
 * If you want to create a joined model instance basing on a left most element,
 * you can create the joined element as follows:
 *
 *    joinedElement = ljoinManager.createJoined(leftmost);
 *
 * If you want to use Store to gather a set of leftmost source elements, and create corresponding joined elements,
 * you can create the store as follows:
 *
 *    joinedStore = ljoinManager.createJoinedStore();
 *    joinedStore.load();
 *
 *
 * ## Join Conditions
 *
 * The join condition is in the form of Ext.utilFilter.
 * When you want to use the property values of the left source elements,
 * you can specify the properties as in the value attributes below.
 *
 *      { alias: 'model2', tableID:'Model1',
 *        selections:[ { property: 'field2a', value: { table: 'model0', property: 'field0c'}},
 *                     { property: 'field2b', value: { table: 'model1', property: 'field1d'}}]
 *      }
 *
 * In this example, the system uses the "default" operator of the Proxy, "exact match",
 * as the selection operator.
 * The variations of the operator depend on the Proxy of the target right Model.
 * You can specify the operator attribute for the Proxy,
 * and write the filterFn attribute for local filters.
 *
 * For more details, see {KobeU.data.LJoinConfig}.
 *
 * @author Tomio Kamada, Takuya Hatadani.
 */
Ext.define('KobeU.data.LJoinManager', {
	requires : ['Ext.data.Field', 'Ext.data.Model', 'Ext.data.Store',
			'KobeU.data.proxy.LJoin', 'KobeU.data.ViewEditManager', 'KobeU.data.LJoinedModel',
			'KobeU.data.LJoinConfig', 'KobeU.data.LJoinRegistry','KobeU.data.EditError',
			'KobeU.data.filter.FilterManager'],

	constructor : function(config) {
		var joinlist=[], joins={}, joinlist0, me=this;
		if(Ext.isArray(config)) {
			joinlist0 = config;
		}
		joinlist0 = joinlist0 || config.joinlist;
		if (!joinlist0) {
				Ext.Error.raise("LJoinManager requires join definitions.");
		}

		for(var i=0; i< joinlist0.length; i++) {
			var joinConf = new KobeU.data.LJoinConfig(joinlist0[i]);
			joinConf.index=i;
			joinlist.push(joinConf);
			joins[joinConf.alias]=joinConf;
		}
		Ext.apply(me, {
			joinlist: joinlist,
			joins: joins,
			joinPool: [],
			fieldlist : [],
			left : joinlist[0], // leftmost table (for compat)
			fieldinfo : {}, // field info for each (joined) field name
			fmatched : {}, // matched fields to selector fields
			selector2affectedJ : {}, // selector fields to join relation
			selector2affectedJrec : {} // selector fields to join relation
		});

		for (var i=0;i<joinlist.length;i++) {
			var join1=joinlist[i];
			join1.setupFields(me);
			me.setupDependency1(join1);
		}
		me.setupDependencyR();
		if(!me.name) {
			me.name=me.defaultName();
		}
		me.modelName=me.name;
		KobeU.data.LJoinRegistry.register(me);
		me.createJoinedModel(me.name);
	},
	/* private */
	createJoinedModel : function(name) {
		var manager = this;

		this.joinedModel = Ext.define(name, {
			extend: 'KobeU.data.LJoinedModel',
			idProperty : this.joinlist[0].model.prototype.idProperty,
			fields : this.fieldlist,
			filters : this.joinlist[0].selections,
			proxy : {
				type : 'ljoin',
				manager : manager
			},
			manager : manager
		});
		this.joinedModel.manager = this;
	},

	/**
	 * @cfg {String} name
	 * The name of this LJoinManager. The name is also used as the name of LJoinedModel.
	 * If omitted, the system assign an automatically generated one.
	 */
	/**
	 * @cfg {Array} joinlist
	 * The joinlist is the {KobeU.data.JoinInfo}, each consists of the model to be joined and its join conditions.
	 * The joinInfo items must be ordered from left to right.
	 */
	/**
	 * @property {Object} joins
	 * @readonly
	 * This is the JSON format version of joinlist.
	 */
	/**
	 * @property {Object} left
	 * This is the JoinInfo for the leftmost model.
	 */
	/**
	 * @property {KobeU.data.LJoinedModel} joinedModel
	 * The created Model class. LJoinedModel is the subclass of Ext.data.Model.
	 */
	/**
	 * @property {} fieldinfo
	 * This holds the information of each field of the joined model,
	 * that consists of the orginal field name, {Ext.data.FieldInfo} of joined,
	 * the alias of the owner source element.
	 *
	 */

	setupDependency1 : function(joininfo) {
		if (!joininfo.selections) return;
		var me = this,
			selections = joininfo.selections;
		if(!Ext.isArray(selections)) {
			selections = [selections];
		}

		for(var i=0; i< selections.length; i++) {
			var r = selections[i];
			if(r.values) {
				if(!Ext.isArray(r.values))
					Ext.Error.raise("Unsupported format: "+ r.values);

				for(var i=0; i<r.values.length; i++) {
					var valinfo = r.values[i],
						lattr = me.getJFieldName2(valinfo);
					if (!me.fieldinfo[lattr]) {
						Ext.Error.raise("Unknown left attribute: " + lattr);
					}
					me.selector2affectedJ[lattr] = me.selector2affectedJ[lattr] || {};
					me.selector2affectedJ[lattr][joininfo.alias] = joininfo;
				}
				for(var rattr2 in joininfo.fields) {
					me.fmatched[rattr2]=r.values;
				}
				selections[i]=KobeU.data.filter.FilterManager.setup(r);
			} else if (r.value && r.value.table) {
				var rattr = me.getJFieldName(joininfo.alias, r.property);
				var lattr = me.getJFieldName2(r.value);

				if (!joininfo.fields[rattr]) {
					Ext.Error.raise("Unknown right attribute: " + rattr);
				}
				if (!me.fieldinfo[lattr]) {
					Ext.Error.raise("Unknown left attribute: " + lattr);
				}
				selections[i]=KobeU.data.filter.FilterManager.setup(r);

				me.selector2affectedJ[lattr] = me.selector2affectedJ[lattr]
						|| {};
				me.selector2affectedJ[lattr][joininfo.alias] = joininfo;
				me.fmatched[rattr] = lattr;
				if(r.additionalFilter) {
					for(var rattr2 in joininfo.fields) {
						if(rattr!=rattr2) me.fmatched[rattr2] = [lattr];
					}
				}
			}
		}
		joininfo.selections=selections;
	},

	setupDependencyR : function() {
		var i, l;
		for (l in this.selector2affectedJ) {
			var rs = Ext.apply({}, this.selector2affectedJ[l]);
			for (label1 in rs) {
				for (fname in rs[label1].fields) {
					var r2s = this.selector2affectedJ[fname];
					if (r2s)
						Ext.applyIf(rs, r2s);
				}
			}
			this.selector2affectedJrec[l] = rs;
		}
	},

	/*
	 * prepare default name using model
	 */
	defaultName : function() {
		var name = 'LJoin';
		var i = 0;
		for (; i < this.joinlist.length; i++) {
			name = name + '_' + this.joinlist[i].model.modelName;
		}
		if (Ext.ClassManager.get(name)) {
			var count = 1;
			while (Ext.ClassManager.get(name + '_' + count)) {
				count++;
			}
			name = name + '_' + count;
		}
		return name;
	},
	/**
	 * return the {Ext.data.Field} info of a joined field.
	 * @param {String} fieldName of the joined field.
	 * @return {Ext.data.Field} field info of the joined field.
	 */
	getField: function(fieldName) {
		return this.fieldinfo[fieldName].finfo;
	},
	/**
	 * return undefined if this model does not have a field with the given fieldName.
	 * @param {String} fieldName of the joined Model
	 * @return {}
	 */
	checkField : function(fieldName) {
		return this.fieldinfo[fieldName];
	},
	/**
	 * return undefined if this model does not using a given alias name.
	 * @param {String} alias
	 * @return {}
	 */
	checkLabel : function(alias) {
		if (!this.joins[alias])
			Ext.Error.raise("Unknown Join Alias:" + alias);
	},
	/**
	 * check the joined is already destroyed or not.
	 * @param {} joined
	 * @return {}
	 */
	isDestroyed : function(joined) {
		return joined.src[this.left.alias].elem==null;

	},
	/**
	 * remove all source elements when the joined is destroyed.
	 * @param {} joined
	 */
	makeDestroyed: function(joined) {
		for(var l in joined.src)
		   this.replaceSrc(joined, l, null);
	},
	/**
	 * return the joined element basing on the leftmost element
	 * @param {Ext.data.Model} left is the left most element
	 * @return {KobeU.data.LJoinedModel} the created joined element.
	 */
	createJoined : function(left) {
		var result = new this.joinedModel();
		this.onLoadLeft(result, left);
		return result;
	},

	/**
	 * return the empty {Ext.data.Store} of the joined model.
	 * @return {} the generated joined store.
	 */
	createJoinedStore : function() {
		return new Ext.data.Store({
					model : this.joinedModel,
					proxy : {
						type : 'ljoin',
						manager : this
					}
				});
	},

	/**
	 * This method gathers the list of right source elements
	 * that can be joined with the left source elements with the given join conditions.
	 * @param {KobeU.data.LJoinedModel} joined element
	 * @param {KobeU.data.LJoinInfo} joinInfo
	 * @param {Object} option. set option.autoLoad=true if you want autoload the store.
	 * @return {Ext.data.Store} the right store.
	 */
	getRightStore : function(joined, joinInfo, option) {
		var manager = this;
		var toModel = joinInfo.model;
		var selections = joinInfo.selections;
		var filters = [];
		var modelDefaults = {};
		var prevstore = option && option.store;
		if(joined.manager != this) Ext.Error.raise("rightStore Builder: Invalid caller");

		for (var i = 0; i < selections.length; i++) {
			var r = selections[i],
				 rsattr = r.property || toModel.prototype.idProperty,
				 val = r.value,
				 filter;
			if (val&&val.table) {
				var ljattr = manager.getJFieldName2(val);
				if (!joined.hasResultsF(ljattr)) {
					return undefined;
				}
				val = joined.get(ljattr);
				filter = Ext.applyIf({ value : val }, r);
				if (val === undefined && r.type=='id') {
					var sitem = joined.getSrc(r.value.table);
					val = r.getIdForPhantom(sitem, r.value.property);
					if(val) {
						Ext.apply(filter, { value: val, phantomValue: true});
					}
				}
			} else if(r.values){
				var values = [];
				for(var j=0;j<r.values.length;j++) {
					var ljattr = manager.getJFieldName2(r.values[j]);
					if (!joined.hasResultsF(ljattr)) {
						values.push(undefined);
					} else {
						values.push(joined.get(ljattr));
					}
				}
				filter = Ext.applyIf({ values : values }, r);
			} else {
				filter = Ext.applyIf({ value : val }, r);
			}
			filters.push(filter);
			modelDefaults[rsattr] = val; // prepare default values in creation
		}
		var config = Ext.apply({}, {
					model : toModel,
					filters : filters,
					modelDefaults : modelDefaults,
					remoteFilter : true
				});
		var store = Ext.create('Ext.data.Store', config);
		if (option && option.autoLoad) store.load();
		return store;
	},

	/***************************************************************************
	 * util methods
	 */

	/*
	 * alias + field => jfieldName
	 */
	getJFieldName : function(alias, field) {
		return alias + '/' + field;
	},
	/*
	 * { table: alias, property: field} => jfieldName
	 */
	getJFieldName2 : function(selectionVal) {
		var key = selectionVal.table;
		var v = selectionVal.property;
		return key + '/' + v;
	},

	orgFieldName : function(fieldName) {
		var index = fieldName.indexOf('/');
		if (index >= 0) {
			return fieldName.substr(index + 1);
		} else {// for compatibility
			return fieldName;
		}
	},
	jfield2alias : function(fieldName) {
		var index = fieldName.indexOf('/');
		if (index > 0) {
			var result = fieldName.substr(0, index);
			if (this.joins[result])
				return result;
			return null;
		}
	},
	replacelabel : function(fieldName, labelB) {
		return this.getJFieldName(labelB, this.orgFieldName(fieldName));
	},

	loadRight1 : function(joined, joinInfo) {
		if(this.isDestroyed(joined)) return;
		// TODO direct load from the source proxy
		var prevstore = joined.src[joinInfo.alias].store, me = this,
		    store = this.getRightStore(joined, joinInfo, {store: prevstore});
		if (!store)
			return;
		joined.src[joinInfo.alias].nowLoading = true;
		joined.src[joinInfo.alias].store = store;

		if (Ext.getClassName(store) == 'Ext.data.Store') {
			store.load({
						limit : 1,
						callback : me.onLoadRight(joined, joinInfo, store)
					});
		}
	},
	/*
	 * save the corresponding source element.
	 */
	saveSrc1 : function(joined, joinInfo) {
		// TODO merged save
		//if(this.isDestroyed(joined)) return;
		if (!joinInfo)
			return;
		var src = joined.getSrc(joinInfo.label);
		if (src && (src.dirty || src.phantom)) {
			// TODO UN-coherent proxy will needs callbacks.
			src.save({});
		}
	},
	/*
	 * return the leftmost element with saving right source elements.
	 */
	getLeftWithSavingRights : function(joined) {
		//if(this.isDestroyed(joined)) return;
		var key, result;
		for (key in this.joins) {
			if (key == this.left.alias) {
				result = joined.src[key].elem;
			} else {
				this.saveSrc1(joined, this.joins[key]);
			}
		}
		return result;
	},
	/**
	 * create a source element for the alias.
	 *
	 * @param {} joined
	 * @param {} jlabel
	 * @return {}
	 */
	createSrc : function(joined, jlabel) {
		if (jlabel == this.left.alias) {
			if (joined.src[jlabel].elem)
				return undefined;
			var left = this.left.model.create();
			this.onLoadLeft(joined, left);
			return left;
		}
		if (!joined.canCreateSrc(jlabel))
			return undefined;
		// TODO clean the following codes.
		var rstore = this.getRightStore(joined, this.joins[jlabel]);
		var result = rstore.add({})[0];
		joined.beginEdit();
		this.replaceSrc(joined, jlabel, result);
		this.setModelValues(result, joined, this.joins[jlabel].fields, null);
		joined.endEdit();
		this.fireDataChanged(joined);
		return result;
	},

	/**
	 * This method is used to fire 'update' event after waiting 10 msec
	 * to merge the following 'update' event.
	 * @param {} joined
	 */
	mergedDataChanged : function(joined) {
		for (var i in joined.stores) {
			var store = joined.stores[i];
			if (!store.mergedDataChangedFlag) {
				store.mergedDataChangedFlag = true;
				setTimeout(function() {
							store.mergedDataChangedFlag = false;
							store.fireEvent('update', store);
						}, 5);
			}
		}
	},



	/*
	 * replace the sourse element for the "alias" to the given "src"
	 */
	replaceSrc : function(joined, alias, src) {
		var vem = KobeU.data.ViewEditManager;
		vem.srcLeaveJRecord(joined.src[alias].elem, joined, alias);
		vem.srcAttendJRecord(src, joined, alias);
		joined.src[alias].elem = src;
		joined.src[alias].written = false;
		joined.src[alias].nowLoading = false;
	},

	/*
	 * (not callback) routine for set up left(most) values.
	 */

	onLoadLeft : function(joined, left) {
		var kicks = {}, l;
		joined.beginEdit();
		this.setModelValues(left, joined, this.left.fields, kicks);
		this.replaceSrc(joined, this.left.alias, left);
		for (l in kicks) {
			this.loadRight1(joined, kicks[l]);
		};
		joined.endEdit();
	},

	/*
	 * prepare a callback routine on load the right source element.
	 */
	onLoadRight : function(joined, joinInfo, tmpStore) {
		var me = this;
		return function(records, operation, success) {
			if(me.isDestroyed(joined)) return;

			if (success) {
				if (!records)
					records = [];
				if (!Ext.isArray(records))
					records = [records];

			    tmpStore.removeAll();
				var kicks = {}, l;
				joined.beginEdit();
				if (records && records.length > 0) { // not empty
					var orgJoin = joined, orgJoinInfo = joinInfo;
					for (i = 0; i < records.length; i++) {
						me.setModelValues(records[i], joined,
									joinInfo.fields, kicks);
						me.replaceSrc(joined, joinInfo.alias, records[i]);
					}
				} else {
					me.nullifySrcRec(joined, joinInfo, {});
					me.replaceSrc(joined, joinInfo.alias, null);
				}
				joined.src[joinInfo.alias].nowLoading = false;

				for (l in kicks) {
					me.loadRight1(joined, kicks[l]);
				};
				joined.endEdit();

				KobeU.data.ViewEditManager.logTime(joinInfo.alias+":"+joined.id+"/"+joined.index);

				if (records.length == 0) {
					var names = [];
					for (name in joinInfo.fields)
						names.push(name);
					joined.afterEdit(names);
				}
				me.fireDataChanged(joined);
			}
			// TODO care for retry
		};
	},

	nullifySrcRec : function(joined, joinInfo, visitedLabels) {
		if (visitedLabels[joinInfo.alias])
			return;
		joined.src[joinInfo.alias].nowLoading = false;
		visitedLabels[joinInfo.alias] = joinInfo;
		for (jfield in joinInfo.fields) {
			var sfieldI = joinInfo.fields[jfield];
			joined.orgSet(jfield, sfieldI.defaultValue);
			delete joined.modified[jfield];
			var affected2 = this.selector2affectedJrec[jfield];
			for (l2 in affected2) {
				this.nullifySrcRec(joined, affected2[l2], visitedLabels);
			}
		}
	},

	/*
	 * @private
	 * This methods reflect the values of a source element onto the joined view,
	 * with gathering affected right labels.
	 * @param(src) source element
	 * @param(joined) joined element
	 * @param(fields) object that maps modified field name to anything
	 * @param(kicks) gather the source labels that needs re-evalation by this changes.
	 */
	setModelValues : function(src, joined, fields, kicks) {
		var flag = false;
		var jfield;
		for (jfield in fields) {
			var sfield = fields[jfield];
			var sval = src ? src.get(sfield.name) : sfield.defaultValue;
			var jval = joined.get(jfield);
			if (sval != jval) {
				flag = true;
				joined.orgSet(jfield, sval);
				if (src)
					this.careDep(joined, jfield, sval, kicks);
			} else {
				this.cancelLoading(joined, jfield);
			}
			if (src && src.modified[sfield.name] !== undefined) {
				joined.modified[jfield] = src.modified[sfield.name];
			} else {
				delete joined.modified[jfield];
			}
		}
		var dirty = false;
		var key;
		for (key in joined.modified) {
			dirty = true;
		}
		if(!dirty&&flag) {
			this.mergedDataChanged(joined);
		}
		joined.dirty = dirty;

	},

	/**
	 * make the right source elements in loading status when a source element is replaced by a joined element.
	 * @param {} joined
	 * @param {} label  the alias of a source element that is replaced by the joined element.
	 */

	processNowLoading2 : function(joined, label) {
		var fields = this.joins[label].fields;
		for (jfield in fields) {
			var affected2 = this.selector2affectedJrec[jfield];
			for (l in affected2) {
				joined.src[l].nowLoading = true;
			}
		}
	},
	cancelLoading: function(joined, jfield) {
		var affected2 = this.selector2affectedJrec[jfield];
		for (l in affected2) {
			joined.src[l].nowLoading = false;
		}
	},

	/*
	 * check the right source element that should be reloaded, and load the source element
	 * that is directly affected by the modification on the jfield.
	 */
	careDep : function(joined, jfield, val, kicks) {
		var affected2 = this.selector2affectedJrec[jfield], affected = this.selector2affectedJ[jfield], l;
		if (affected2) {
			for (l in affected2) {
				//if (!affected[l])
					joined.src[l].nowLoading = true;
			}
		}
		if (affected) {
			if (kicks) {
				Ext.apply(kicks, affected);
			} else {
				for (l in affected)
					this.loadRight1(joined, affected[l]);
			}
		}
	},

	/*
	 * fire data change event
	 */
	fireDataChanged : function(joined) {
		this.mergedDataChanged(joined);
	},

	/*
	 * check whether a filed of a joined element is a selector field,
	 * and the affected right fields has some modifications that is writte via this joined element.
	 */
	checkWrittenRight : function(joined, alias, fieldName) {
		var affectedJinfos = this.selector2affectedJrec[this.getJFieldName(
				alias, fieldName)];
		if (affectedJinfos) {
			var key, results = [];
			for (key in affectedJinfos) {
				if (joined.src[key].written) {
					results.push(key);
				}
			}
			if (results.length > 0)
				KobeU.data.EditWarning.loseModifiedViews({
					target : joined,
					modified : results
				});
		}
		return false;
	},

	/**
	 * check edit errors/warnings that may occur
	 * the joined element receives set an set operation.
	 * @param {} joined  the
	 * @param {} f2v
	 * @param {} l2x
	 * @return {Boolean}
	 */
	checkEditProtection : function(joined, f2v, l2x) {
		for (var jfield in f2v) {
			if (!joined.hasResultsF(jfield)){
				return KobeU.data.EditErrorReport.setError({},
					new KobeU.data.EditError.emptySrcElement(
						{type:"EmptySrcElement",src: this.jfield2alias(jfield)}));
			}
			if (this.fmatched[jfield]){
				return KobeU.data.EditErrorReport.setError({},
					new KobeU.data.EditError.matchedField({field:jfield}));
			}
			// raise a LRconflict error.
			// See {KobeU.data.EditError}
			var as = this.selector2affectedJrec[jfield];
			if (as) {
				//TODO refine the following
				for (l in l2x) {
					if (as[l]){
						return KobeU.data.EditErrorReport.setError({},
							new KobeU.data.EditError.LRconflict({src:jfield,right:l}));
					}
				}
			}
			// raise a LeftCoOccurence error.
			// See {KobeU.data.EditError}
			var alias = this.jfield2alias(jfield);
			for (var key in joined.src) {
				if ((key !== alias) && (joined.src[key] === joined.src[alias])) {
					var fieldL1 = this.replacelabel(jfield, key);
					as = this.selector2affectedJrec[fieldL1];
					if (as) {
						for (var l in l2x) {
							if (as[l]) {
								return KobeU.data.EditErrorReport.setError({},
									new KobeU.data.EditError.LRcoOccurence({src:jfield,left:key,right:l}));
							}
						}
					}
				}
			}
		}
		return false;
	},
	/**
	 * process a set opration for the joined element.
	 * @param {} joined
	 * @param {} f2v
	 */
	processSet : function(joined, f2v) {
		var l2f2v = this.groupByLabel(f2v), l;
		if (this.checkEditProtection(joined, f2v, l2f2v))
			return;
		for (l in l2f2v) {
			joined.src[l].written = true;
			KobeU.data.ViewEditManager.editSrc(joined.getSrc(l), l2f2v[l]);
		}
	},
	/*
	 * group fields by each source element.
	 */
	groupByLabel : function(f2v) {
		var result = {}, f, l, t;
		for (f in f2v) {
			l = this.jfield2alias(f);
			t = result[l];
			if (!t)
				result[l] = {};
			result[l][this.orgFieldName(f)] = f2v[f];
		}
		return result;
	},


	/*
	 * @private
	 * Call this method when source element of joined is changed
	 * @param(joined) JoinedModel
	 * @param(label)  label of the source element
	 * @param(src)  source element that encounters update. When the source element is removed, call this method with src==null.
	 *
	 */
	processSrcReflection : function(joined, label, src) {
		joined.beginEdit();
		var kicks = {};

		if (src==null || !this.joinConditionCheck(joined, label, src)) {
			// In the case of replacing source element,
			// turn right source elements into loading state ,
			joined.src[label].nowLoading = true;
			this.processNowLoading2(joined, label);
			joined.afterEdit();
			// release previous source element,
			this.replaceSrc(joined, label, null);
			this.loadRight1(joined, this.joins[label]);
		} else {
			// When the modification does not affect join conditions
			// for this src element.
			// We have to reflect modifications on src element, and
			// check replacement of right src elements.
			this.setModelValues(src, joined, this.joins[label].fields, kicks);
			joined.afterEdit();
			for (l in kicks) {
				this.loadRight1(joined, kicks[l]);
			}
		}
		joined.endEdit();
		this.mergedDataChanged(joined);
	},
	/*
	 * check whether the given join condition is satisfied or not.
	 */
	joinConditionCheck : function(joined, label, src) {
		if (this.joins[label].index == 0)
			return true;
		if(!src) return false;
		// TODO refine the following code
		var store = this.getRightStore(joined, this.joins[label]);
		var f = store.filters;
		for (i = 0; i < f.items.length; i++) {
			if (!f.items[i].filter.call(f.items[i], src))
				return false;;
		}
		return true;
	},

	/*
	 * @private
	 * Call this method when joined has empty right element at label,
	 * and want to check new source element (src) can matched the join condition for the label.
	 * @param(joined) joined element
	 * @param(src)  candidate for the new source element for the label
	 * @param(label) label
	 *
	 */
	checkSelectionForModifiedSrc : function(joined, src, label) {
		//if(this.isDestroyed(joined)) return;

		var me = this;
		var i = 0;
		//TODO refine the following code.
		var store = this.getRightStore(joined, this.joins[label]);
		if (!store) return;
		var f = store.filters;
		for (i = 0; i < f.items.length; i++) {
			if (!f.items[i].filter.call(f.items[i], src))
				break;
		}
		if (i == f.items.length) {
			// If matched..
			var kicks = [];
			this.setModelValues(src, joined, this.joins[label].fields, kicks);
			this.replaceSrc(joined, label, src);
			joined.afterEdit();
			for (l in kicks) {
				this.loadRight1(joined, kicks[l]);
			}
		}
	}

});
