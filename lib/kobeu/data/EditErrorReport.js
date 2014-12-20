/**
 * This class holds an error  and warnings that may occur
 * when the joined element or its source element receives set operations.
 */
Ext.define('KobeU.data.EditErrorReport', {
	/**
	 * @property {KobeU.data.EditError} error
	 * undefined if there is no error.
	 */
	// error:{},

	/**
	 * @property {} warnings. The list of {KobeU.data.EditWarning} items.
	 * undefined if there is no error.
	 */
	// warning:[],

	constructor:function(config){
		var me=this;
		Ext.applyIf(me,config);
	},

	statics:{
		/**
		 * create a new report with the given error and the warnings in the given report.
		 * @param {} report
		 * @param {} error
		 * @return {}
		 */
		setError:function(report,error){
			return new KobeU.data.EditErrorReport({error:error, warning:report.warning})
		},

		/**
		 * add the given warning to the given report.
		 * @param {} report
		 * @param {} warning
		 * @return {}
		 */
		addWarning:function(report,warning){
			if(report.warning){
				report.warning.push(warning);
			} else {
				return new KobeU.data.EditErrorReport({error:report.error, warning:[warning]})
			}

		}
	},

	/**
	 * get the error
	 * @return {}
	 */
	getError:function(){
		return this.error;
	},

	/**
	 * get the warnings
	 * @return {}
	 */
	getWarning:function(){
		return this.warning;
	}
});
