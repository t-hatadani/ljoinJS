/**
 * This class represents an error that may occur
 * when the joined element receives set operations.
 */
Ext.define('KobeU.data.EditError', {
	statics:{
		/**
		 * create an error when the set operation is going to write onto the fields that
		 * does not have owner source elements.
		 * Set "config.src" as the alias name of the source element.
		 * @param {} config
		 * @return {}
		 */
		emptySrcElement:function(config){
			return Ext.applyIf({
				getType:function(){
					return "EmptySrcElement";
				},
				getMessage:function(){
					return "Source \""+this.src+"\" is Empty.";
				}
			},config);
		},
		/**
		 * create an error when the set operation is going to write onto the matched fields,
		 * which is the field of the right table and used for join conditions to be connected with left tables.
		 * Set "config.field" as the name of the matched field.
		 * @param {} config
		 * @return {}
		 */
		matchedField:function(config){
			return Ext.applyIf({
				type:"Matchedfield",
				getType:function(){
					return "MatchedField";
				},
				getMessage:function(){
					return "Field \""+this.field+"\" is used for matched attribute.";
				}
			},config);
		},

		/**
		 * raise an error when the set operator changes the value of selector fields
		 * and also want to change the fields of the right source elements, which may be
		 * replaced by the write in selector field.
		 * @param {} config
		 * @return {}
		 */
		LRconflict:function(config){
			return Ext.applyIf({
				type:"LRconflict",
				getType:function(){
					return "LRconflict";
				},
				getMessage:function(){
					return "You want to edit \""+this.src+"\", but right src \""+this.right+"\" is editing too";
				}
			},config);
		},

		/**
		 * create an error when the set operation is going to write onto a field in the right source element that
		 * also appears as the left source element of the same joined element, and this write operation may
		 * erace the appearance of the source element on the right alias.
		 * Set "config.src" as the name of the target field.
		 * @param {} config
		 * @return {}
		 */
		LRcoOccurence:function(config){
			return Ext.applyIf({
				type:"LRcoOccurence",
				getType:function(){
					return "LRcoOccurence";
				},
				getMessage:function(){
					return "\""+this.src+"\" is used as left source \""+this.left+"\" and right source \""+
						this.right+"\".Tthis edit may disappear. \""+this.right+"\".";
				}
			},config);
		}
	}
});
