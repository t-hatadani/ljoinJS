/**
 * A base filter that uses multiple left values.
 * The default operator of this filter is 'nop'.
 *
 */

Ext.define('KobeU.data.filter.MultiValFilter', {
	extend: 'KobeU.data.filter.ExFilter',
	alias: 'filter.multi',
	comps: {
		'nop': function(val, val2) { return true; }
	},
	defaultOpe: 'nop',
	constructor:function(config){
		Ext.apply(config, { type: 'multi' });
		this.callParent([config]);
	},
	values: [],
	setValue: function(value) {
		Ext.Error.raise("KobeU.data.filter.MultiValFilter does not support setValue(v).");
	}
});
