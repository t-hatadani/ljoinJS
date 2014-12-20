/**
 * A filter for id properties.
 * For phantom record, this use internal id for the comparison.
 *
 */

Ext.define('KobeU.data.filter.IDFilter', {
	extend: 'KobeU.data.filter.ExFilter',
	alias: 'filter.id',

	constructor:function(config){
		Ext.apply(config, { type: 'id' });
		this.callParent([config]);
	},
	/**
	 * overwritten to return internal id for the idProperty of the phantom
	 * @param {Ext.data.Model} target
	 * @return {Object}
	 */
	getVal: function(target) {
		var result = this.callParent([target]);
		if(result) return result;
		return this.getIdForPhantom(target, this.property)
	},
	getIdForPhantom: function(target, property) {
		var idProperty = target.idProperty;
		if(!idProperty) return undefined;
		if(idProperty.name) idProperty=idProperty.name;
		if(property==idProperty&&target.phantom) return target.id;
		return undefined;
	}
});
