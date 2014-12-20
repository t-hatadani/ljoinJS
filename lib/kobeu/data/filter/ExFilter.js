/**
 * This filter is a base filter class for Ext.util.Filter.
 *
 */

Ext.define('KobeU.data.filter.ExFilter', {
	extend: 'Ext.util.Filter',

	/**
	 * @cfg {Object} comps
	 * This comps Object is used to hold the mapping from operator name to the
	 * comparator of the two values.
	 */
	comps: {
		'==': function(val, val2) { return val==val2; },
		'!=':function(val, val2) { return val!=val2; },
		'nop': function(val, val2) { return true; }
	},
	/**
	 * @cfg {String} defaultOpe
	 * the name of default operator
	 */
	defaultOpe: '==',

	constructor:function(config){
		this.callParent([config]);
		this.comp=this.comps[config.operator||this.defaultOpe];
	},
	/**
	 * get the property value.
	 * @param {KobeU.data.Model} item
	 * @return {Object}
	 */
	getVal: function(item) {
		return this.getRoot(item)[this.property];
	},
	/**
	 * @cfg {Function} loalFilter
	 * The additional local filter that receives the target record as a single argument.
	 * This class first applys the default operator, which is
	 * specified by "this.operator" and "this.value", and then
	 * apply localFilter and localPropertyFIlter when the formaer is true.
	 *
	 */
	localFilter: undefined,
	/**
	 * @cfg {Function} loalPropertyFilter
	 * The additional local filter that receives the property value as a single argument.
	 * This class first applys the default operator, which is
	 * specified by "this.operator" and "this.value", and then
	 * apply localFilter and localPropertyFIlter when the formaer is true.
	 */
	localPropertyFilter: undefined,


	/**
	 * @cfg {Function} merge
	 * You can set a murge function.
	 * The merge function is used to merge this filter with the target filter to create unioned operation if possible..
	 */
	merge: undefined,

	/*
	 * check localFilters.
	 */
	checkLocalFilter:function(target){
		if(this.localFilter&&!this.localFilter(target)) {
			return false;
		}
		if(this.localPropertyFilter&&
			(!this.property||!this.localPropertyFilter(this.getVal(target)))) {
			return false;
		}
		return true;
	},
	/*
	 * override setValue to prevent the override of filterFn by the superclass.
	 */
	setValue: function(val) {
		Ext.apply(this, {value: val});
	},
	comp: null,
	/**
	 * comparator of two values.
	 * @param {} val0
	 * @param {} val1
	 * @return {}
	 */
	compare: function(val0, val1) {
		return this.comp(val0, val1);
	},
	/**
	 * filterFn
	 * @param {} target
	 * @return {}
	 */
	filterFn:function(target){
		//return this.getVal(target)==this.value;
		return this.compare(this.getVal(target), this.value)
		&& this.checkLocalFilter(target);
	}
});
