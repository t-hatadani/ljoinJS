/**
 * KobeU.data.filter.FilterManager is used to create KobeU.data.filter.* instances.
 *
 */

Ext.define('KobeU.data.filter.FilterManager',{
	extend: 'Ext.util.MixedCollection',
	singleton:true,

	/**
	 * This method receives a filter configs, checks config.type, and
	 * create the corresponding KobeU.data.filter.* with the alias "filter."+config.type.
	 *
	 * @param {} config
	 * @return {}
	 */
	setup: function(config) {
		if(config instanceof Ext.util.Filter) return config;
		var result;
		if(config.type) {
			result = Ext.createByAlias('filter.'+config.type, config);
			if(result==undefined) Ext.Error.raise("Unknown filter type: " + config.type);
			return result;
		} else {
			return Ext.createByAlias('filter.num',config);
		}
	}
});