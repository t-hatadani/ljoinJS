# ljoinJS

This library provide a kind of a joined view of several Ext Models.
Using with ForCoherency Proxy, the joined view is automatically updated when the source elements
of the joined view has update.

This library assumes Ext JS version 2.4.1.

* [API document](http://magritte.cs.scitec.kobe-u.ac.jp/ljoinJS/ljoinJS/docs/)

# LJoinManager

The LJoinManager is a manager to define a kind of join relations between Models.
This manager assumes models with remote proxies.
You can join multiple models with specifying join conditions as follows:

    var manager = new KobeU.data.LJoinManager([
         {alias: 'model0', tableID:'Model0' },
         {alias: 'model1', tableID:'Model1',
          selections:[ { property: 'field1a', value: { table: 'model0', property: 'field0a'}},
                       { property: 'field1b', value: { table: 'model0', property: 'field0b'}}]},
         {alias: 'model2', tableID:'Model1',
          selections:[ { property: 'field2a', value: { table: 'model0', property: 'field0c'}},
                       { property: 'field2b', value: { table: 'model1', property: 'field1d'}}]]}]);

In this case, the manager joins model0 with model1 and model2 with the specified join conditions, and create a corresponding joined Model. In this example, the join condition for each right table is as follows:

* model1.field1a == model0.field0a && model1.field1b == model0.field0b  (join condition for model1)
* model2.field2a == model0.field0c && model2.field2b == model1.field1d  (join condition for model2)

The joined model receives a leftmost source element, and searches the corresponding
right source elements that meets the join conditions.

Note: This LJoinManager assumes the source Models that use Proxies wrapped with ForCohenrecy Proxy described below.

## create joined instances/stores.

If you want to create a joined model instance basing on a left most element,
you can create the joined element as follows:

    joinedElement = ljoinManager.createJoined(leftmost);

If you want to use Store to gather a set of leftmost source elements, and create corresponding joined elements,
you can create the store as follows:

    joinedStore = ljoinManager.createJoinedStore();
    joinedStore.load();


## Join Conditions

The join condition is in the form of Ext.utilFilter.
When you want to use the property values of the left source elements,
you can specify the properties as in the value attributes below.

      { alias: 'model2', tableID:'Model1',
        selections:[ { property: 'field2a', value: { table: 'model0', property: 'field0c'}},
                     { property: 'field2b', value: { table: 'model1', property: 'field1d'}}]
      }

In this example, the system uses the "default" operator of the Proxy, "exact match",
as the selection operator.
The variations of the operator depend on the Proxy of the target right Model.
You can specify the operator attribute for the Proxy,
and write the filterFn attribute for local filters.

When the Proxy offers operator that receives a set of left properties,
you can write the properties as follows:

     { alias: 'model2', tableID:'Model1',
       selections: { values: [{ table: 'model0', property: 'field0c'},
                              { table: 'model1', property: 'field1d'}],
                     finterFn: function(values) { /* ... */ }}}


# Proxy of ForCoherency

The ForCoherency proxy is a proxy wrapper to attach the following facilities:

* prepare instance cache and check the cache before invoking Web request,
* prepare request buffers to restrain the number of Web requests at a time and merge multiple requests into a single one,
* watch the incoming instances to keep the singleness of each incoming object,
* and watch data changes on the instances and reflect the changes onto the joined instances.

You can wrap ProxyA with the ForCoherency proxy as follows:

    proxy: {
        type: forCoherency,
        delegatedTo: ProxyA,
        // and other attributes for ProxyA
    }



