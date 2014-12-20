/**
 * The LJoinedModel is the subclass of {Ext.data.Model},
 * and each LJoinedModel class is created By {KobeU.data.LJoinManager}
 * and represents a joined model of several source models.
 *
 */

Ext.define('KobeU.data.LJoinedModel', {
	extend : 'Ext.data.Model',



	statics: {
		/**
		 * LJoinedManager that manages this LJoinedModel.
		 * @type KobeU.data.LJoinManager
	 	 */
		manager : null
	},

	/**
	 * @private
	 * @property {Object} src
	 * "src" holds the status of the source elements.
	 * src[aliasName] has the following attributes:
	 *
	 * * elem: source element
	 * * written: the source element is modified through this joined element.
	 * * nowLoading: whether this source element is now in loading.
	 *
	 */

	/**
	 * constructor with no parameter.
	 * TODO: receive leftmost source elements.
	 *
	 */
	constructor : function() {
		this.callParent([]);
		this.src = {};
		var manager = this.manager;
		manager.joinPool.push(this);
		for (label in manager.joins) {
			this.src[label] = {
				nowLoading : false,
				store : null,
				elem : null
			};
		}
		// TODO refinement the following
		this.orgSet = this.set;
		this.set= function(field, val) {
				if (field === "") {
					Ext.Error.raise("set receives empty field name");
				}
				var single = (typeof field == 'string'), f2v, f;
				if (single) {
					f2v = {};
					f2v[field] = val;
				} else {
					f2v = field;
				}
				this.manager.processSet(this, f2v);
		}
	},

	//TODO refine the following
	commitOrRevertL : function(label/* ,silent,modefiedFieldNames */) {
		this.phantom = this.dirty = this.editing = false;
		var newModified = {}, oldModified = {};
		for (f in this.modeifed) {
			if (this.manager.jfield2alias(f) != label) {
				this.dirty = true;
				newModified[f] = this.modified[f];
			} else {
				oldModified[f] = this.modified[f];
			}
		}
		this.modified = newModified;
		this.afterCommit(oldModified);
	},
	/**
	 * TODO
	 * return the fields is writable. On the joined element, some kinds of write operation may bring
	 * invalid situations, and the joined element rejects such write operations.
	 * @param {String} fields is either a field name (String) or a json element. In the case of a json element, the attribute names are treated as the field names.
	 * @param {} flag  give true when the programmer wants to know the reason for the rejection/warnings.
	 * @return {Object} if flag is true, ...説明...
	 */
	isEditable : function(fields, flag) {
		return KobeU.data.ViewEditManager.checkEditableJoined(this,
				fields, flag);
	},
	/**
	 * create a new source instance to joined with the joiend elements.
	 * The created source elements has field values when exact match join conditions are set on the fields.
	 * @param {String} alias
	 * @return {} the created source element.
	 */
	createSrc : function(alias) {
		return this.manager.createSrc(this, alias);
	},

	/**
	 * check whether the source element can be created for the source.
	 * When the corresponding source element is already exists or in loading, this method return false.
	 * @param {String} alias
	 * @return {}
	 */
	canCreateSrc : function(alias) {
		this.manager.checkLabel(alias);
		var state = this.src[alias];
		return !state.nowLoading && state.store && state.store
				&& !state.elem;
	},
	/**
	 * return the source element corresponding to the alias.
	 * @param {String} alias
	 * @return {} the corresponding source element.
	 */
	getSrc : function(alias) {
		var manager = this.manager;
		manager.checkLabel(alias);
		if (this.src[alias].nowLoading)
			return null;
		return this.src[alias].elem;
	},
	/**
	 * This method gathers the list of right source elements
	 * that can be joined with the left source elements with the given join conditions.
	 * Note1: This method only gather the right elements that matched with the
	 * "current" status of this joined element. Even when the joined element change
	 * its status, the re-load of the store is not triggered.
	 * Note2: When some of the source element is under loading or is empty, this method return
	 * undefined.
	 *
	 * @param {} alias
	 * @param {} option: set option.autoLoad=true if you want autoload the store.
	 */
	getRightStore: function(alias, option) {
		return this.manager.getRightStore(this, alias, option);
	},
	/**
	 * destroy the joined element.
	 * Note that this operation does not destroy source elements of the joined element.
	 * @param {} options passed to the parent.
	 */
	destroy : function(options) {
		if (this.manager.isDestroyed(this))
			return;
		this.manager.makeDestroyed(this);
		this.src[this.manager.left.alias].elem = null;
		var rec = this;
		this.manager.joinPool = this.manager.joinPool.filter(
			function(x) {
				return x !== rec;
			});
		this.callParent([options]);
	},

	/**
	 * return the left most source element
	 * @return {}
	 */
	getLeftMost : function() {
		return this.getSrc(this.manager.left.alias);
	},

	// TODO refine the code
	hasResultsF : function(fname) {
		this.manager.checkField(fname);
		var label = this.manager.jfield2alias(fname);
		return this.getSrc(label);
	}
});
