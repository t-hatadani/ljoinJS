/**
 * This class represents a warning that may occur
 * when the source element of the joined element receives set operations.
 */
Ext.define('KobeU.data.EditWarning', {
	statics:{
		/**
		 * create a warning when the set operation is going to write onto the fields in the left source element,
		 * and the joined element may replace the right source element that holds modified values which is written
		 * via the target joined element.
		 * @param {} config
		 * @return {}
		 */
		loseModifiedViews:function(config){
			return Ext.applyIf({
				type: 'LoseModifiedViews',
				getType:function(){
					return "LoseModifiedView";
				},
				getMessage:function(){
					return "lose right";
				}
			},config);
		}
	}
});
