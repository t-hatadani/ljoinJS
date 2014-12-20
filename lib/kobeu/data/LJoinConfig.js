/**
 * LJoinConfig is used to specify join conditions of {KobeU.data.LJoinedManager}.
 *
 */
Ext.define('KobeU.data.LJoinConfig',{
	/**
	 * @cfg {String} alias
	 * The alias for this source element to be treated in the joined element.
	 */
	/**
	 * @cfg {String} modelID
	 * The name of the Ext.data.Model class to be joined. You have to specify modelID or model.
	 */
	/**
	 * @cfg {} model
	 * The model class of the Ext.data.Model to be joined. You have to specify modelID or model.
	 */

	/**
	 * @cfg {Array} selections
	 * The list of filters.
	 *
	 * In each filter, you can use the value of left tables as:
	 *
	 *       { property: 'field1', value: { table: 'model0', property: 'field0'}}
	 *
	 * The above means that field1 is filtered by the value of model0 on field0.
	 * You can specify data type ('type' attribute), operator ('operator' attribtue), and so on.
	 * The parameters are used to create KobeU.data.filter.* instances.
	 * If you specify "type" as the type attribute, this library uses the filter class with the alias "'filter.'+type".
	 *
	 */

	constructor: function(config) {
		var me=this,
			key = config.alias;
		Ext.apply(me, config);
		Ext.apply(me, {
			// for compatibility
			label: key,
			fields : {}
		});
		if (Ext.isFunction(me.model)) {
			Ext.applyIf(me, {
				mdoelID: me.model.getName()
			})
		} else {
			var modelName = me.tableID||me.modelID;
			me.model = Ext.ModelManager.getModel(modelName);
			if (!me.model)
				Ext.Error.raise("Unknown Model@LJoinConfig: " + modelName);
		}
	},

	/*
	 * @private
	 * setup fields
	 * @param {KobeU.data.LJoinManager} manager
	 */

	setupFields: function(manager) {
		var me=this;
		this.model.prototype.fields.each(function(f) {
			var jname = manager.getJFieldName(me.alias, f.name);
			var jf = Ext.apply(new Ext.data.Field(f), {
						name : jname
					});
			manager.fieldlist.push(jf);
			manager.fieldinfo[jname] = {
				label : me.alias,
				orgname : name,
				name : jname,
				finfo : jf
			};
			me.fields[jname] = f;
		});
	}
});
