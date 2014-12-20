/**
 * LJoinRegistry is a registry to register LJoinManagers.
 *
 */

Ext.define('KobeU.data.LJoinRegistry',{
	extend: 'Ext.util.MixedCollection',
	singleton:true,

	/**
	 * register LJoinManager using its name.
	 * The default constructor of the LJoinManager call this method.
	 *
	 * @param {KobeU.data.LJoinManager} manager
	 */
	register:function(manager){
		this.add(manager.name, manager);
	},

	/**
	 * register LJoinManager
	 * @param {KobeU.data.LJoinManager} manager
	 */
	unregister:function(manager){
		this.remove(manager.name);
	},

	/**
	 * lookup LJoinManager by its name
	 * @param {String} name
	 * @return {KoobeU.data.LJoinManager} return the LJoinManager with the specified. return null if not found.
	 */
	lookup: function(name) {
		return this.get(name);
	}
});