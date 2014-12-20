/**
 * private
 * LJoin Proxy is a proxy for LJoinModels
 *
 *
 */

Ext.define('KobeU.data.proxy.LJoin', {
	extend : 'Ext.data.proxy.Client',
	requires : ['Ext.util.MixedCollection', 'Ext.data.Store'],
	alias : 'proxy.ljoin',

	/**
	 * @property {KobeU.data.LJoinManager} manager
	 * This property is set by LJoinmanager
	 *
	 */

	/**
	 * read operation
	 * @param {Ext.data.Operation} orgoperation
	 * @param {} orgcallback
	 * @param {} orgscope
	 */

	read : function(orgoperation, orgcallback, orgscope) {
		// TODO only try direct call to ljoin proxy

		var manager = this.manager;
/*
		var callback = function(records, operation, success) {
			var jrecords = [];
			if (records) {
				records.forEach(function(record) {
					jrecords.push(manager.joinedCreate(record));
				});
				var resultSet = operation.getResultSet();
				resultSet.records = jrecords;
				Ext.apply(orgoperation, {
					resultSet : resultSet
				});
				orgoperation.setCompleted();
				orgoperation.setSuccessful();
				Ext.callback(orgcallback,
					orgoperation.scope || orgscope,
					[orgoperation]);
			}
		}
		manager.left.model.proxy.create(orgoperation, callback, orgscope);*/
		var store = new Ext.data.Store({
			model : this.manager.left.model
		});
		var options = Ext.applyIf({
			callback : function(records, operation, success) {
				var jrecords = [];
				if (records) {
					records.forEach(function(record) {
						jrecords.push(manager.createJoined(record));
					});
					var resultSet = operation.getResultSet();
					resultSet.records = jrecords;
					Ext.apply(orgoperation, {
						resultSet : resultSet
					});
					orgoperation.setCompleted();
					orgoperation.setSuccessful();
					Ext.callback(orgcallback,
						orgoperation.scope || orgscope,
						[orgoperation]);
				}
				store.removeAll();
			}
		}, orgoperation);
		if (manager.left.selections) {
			if (options.filters) {
				options.filters =
					options.filters.concat(manager.left.selections);
			} else {
				options.filters = manager.left.selections;
			}
		}
		orgoperation.setStarted();
		store.load(options);
	},

	create : function(orgoperation, orgcallback, orgscope) {
		/*
		var manager = this.manager,
			llabel = manager.left.alias,
			clefts=[];
			orgoperation.records.forEach(function(cjoined) {
				var left = manager.getLeftWithSavingRights(cjoined);
				clefts.push(left);
			});
		var operation = Ext.applyIf({
			records: lrecords
		}, orgoperation);
		var callback = function(records, operation, success) {
			var jrecords = [];
			if (records) {
				records.forEach(function(record) {
					jrecords.push(manager.createJoined(record));
				});
				var resultSet = operation.getResultSet();
				resultSet.records = jrecords;
				Ext.apply(orgoperation, {
					resultSet : resultSet
				});
				orgoperation.setCompleted();
				orgoperation.setSuccessful();
				Ext.callback(orgcallback,
					orgoperation.scope || orgscope,
					[orgoperation]);
			}
		}
		manager.left.model.proxy.create(operation, callback, orgscope);
*/
		// delegate all the create requests.
		if (orgoperation.records) {
			var me = this;
			var clefts = [];
			var store = new Ext.data.Store({
				model : this.manager.left.model
			});
			orgoperation.records.forEach(function(cjoined) {
				var left = cjoined.manager.getLeftWithSavingRights(cjoined);
				clefts.push(left);
			});
			store.add(clefts);
			store.addListener('write',
				this.genWriteListener(orgoperation, orgcallback,
							orgscope, store), this);
				// TODO write の際は、nowLoading 的なことしなくてよいの？
			orgoperation.setStarted();
			store.sync();
		}
	},

	update : function(orgoperation, orgcallback, orgscope) {
		if (orgoperation.records) {
			var me = this;
			var manager = this.manager;
			var clefts = [];
			var store = new Ext.data.Store({
				model : this.manager.left.model
			});
			orgoperation.records.forEach(function(cjoined) {
				var left = cjoined.manager.getLeftWithSavingRights(cjoined);
				if (left.dirty)
					clefts.push(left);
			});
			store.addListener('write',
				this.genWriteListener(orgoperation, orgcallback,
				orgscope, store), this);
					// TODO write の際は、nowLoading 的なことしなくてよいの？
			orgoperation.setStarted();
			store.sync();
		}
	},
	genWriteListener : function(orgoperation, orgcallback, orgscope,
		store) {// TODO: left の結果の到着を受けたハンドラ。多分、明示callback でいいはず。
		var me = this;
		return function(store, ope, eOpts) {
			var i, len;
			var jrecords = [];
			var olrecord = ope.records;
			var resultSet = ope.getResultSet();
			var nlrecord = resultSet.records;
					// FIXME
					// if some write fails,
					// it will be nlrecords.lenght != olrecord.length.
					// We should
					// 1) check ID to judge succeeded/failed ones, and
					// 2) raise fail alert.
					/*
					 * for(i=0,len=nlrecord.length;i<len;i++) { var joined =
					 * olrecord[i].joined;
					 * me.manager.joinedMergeLeft(joined,nlrecord[i]);
					 * nlrecord[i].joined=joined; jrecords.push(joined); }
					 * resultSet.records=jrecords;
					 */
			Ext.apply(orgoperation, {
				resultSet : resultSet
			});
					// TODO write の際は、nowLoading 的なことと、その解除をしなくてよいの？

			orgoperation.setCompleted();
			orgoperation.setSuccessful();
			Ext.callback(orgcallback, orgoperation.scope || orgscope,
							[orgoperation]);
			store.removeAll();
		}
	},
	destroy : function(orgoperation, orgcallback, orgscope) {
		orgoperation.setCompleted();
		orgoperation.setSuccessful();
		orgcallback(orgoperation);
	}
});
