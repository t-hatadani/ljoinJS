/**
 * A filter for numbers.
 *
 *
 */
Ext.define('KobeU.data.filter.NumFilter', {
	extend: 'KobeU.data.filter.ExFilter',
	alias: 'filter.num',

	/**
	 * @cfg {Object} comps
	 * This comps Object is used to hold the mapping from operator name to the
	 * comparator of the two values.
	 */
	comps: {
		'==': function(val, val2) { return val==val2; },
		'!=':function(val, val2) { return val!=val2; },
		'<': function(val, val2) { return val<val2; },
		'>': function	(val, val2) { return val>val2; },
		'<=': function(val, val2) { return val<=val2; },
		'>=': function(val, val2) { return val>=val2; },
		'nop': function(val, val2) { return true; }
	},

	/**
	 * merge this filter with the target filter to create union operation if possible..
	 * @param {Object} filter the target filter
	 * @return {}
	 */
	merge: function(filter) {
		if(filter.property!==this.property||filter.operator!==this.operator||filter.type!==this.type)
			return null;
		var d1 = this.value, d2 = filter.value;
		switch(this.operator) {
			case '<':
			case '<=':
			case '>':
			case '>=':
				if(this.comp(d1,d2)) return filter;
				else return this;
			default:
				return null;
		}
	}
});
