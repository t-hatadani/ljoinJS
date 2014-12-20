/**
 * A filter for time value.
 *
 */
Ext.define('KobeU.data.filter.TimeFilter', {
	extend: 'KobeU.data.filter.NumFilter',
	alias: 'filter.time',

	constructor:function(config){
		Ext.apply(config, { type: 'time' });
		this.callParent([config]);
	},
	comp: null,
	compare: function(val0, val1) {
		return this.comp(new Date(val0).valueOf(), new Date(val1).valueOf());
	}
});

