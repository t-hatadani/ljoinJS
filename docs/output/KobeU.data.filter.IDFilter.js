Ext.data.JsonP.KobeU_data_filter_IDFilter({"tagname":"class","name":"KobeU.data.filter.IDFilter","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"IDFilter.js","href":"IDFilter.html#KobeU-data-filter-IDFilter"}],"aliases":{"filter":["id"]},"alternateClassNames":[],"extends":"KobeU.data.filter.ExFilter","mixins":[],"requires":[],"uses":[],"members":[{"name":"comps","tagname":"cfg","owner":"KobeU.data.filter.ExFilter","id":"cfg-comps","meta":{}},{"name":"defaultOpe","tagname":"cfg","owner":"KobeU.data.filter.ExFilter","id":"cfg-defaultOpe","meta":{}},{"name":"loalFilter","tagname":"cfg","owner":"KobeU.data.filter.ExFilter","id":"cfg-loalFilter","meta":{}},{"name":"loalPropertyFilter","tagname":"cfg","owner":"KobeU.data.filter.ExFilter","id":"cfg-loalPropertyFilter","meta":{}},{"name":"merge","tagname":"cfg","owner":"KobeU.data.filter.ExFilter","id":"cfg-merge","meta":{}},{"name":"comp","tagname":"property","owner":"KobeU.data.filter.ExFilter","id":"property-comp","meta":{"private":true}},{"name":"constructor","tagname":"method","owner":"KobeU.data.filter.IDFilter","id":"method-constructor","meta":{}},{"name":"checkLocalFilter","tagname":"method","owner":"KobeU.data.filter.ExFilter","id":"method-checkLocalFilter","meta":{"private":true}},{"name":"compare","tagname":"method","owner":"KobeU.data.filter.ExFilter","id":"method-compare","meta":{}},{"name":"filterFn","tagname":"method","owner":"KobeU.data.filter.ExFilter","id":"method-filterFn","meta":{}},{"name":"getIdForPhantom","tagname":"method","owner":"KobeU.data.filter.IDFilter","id":"method-getIdForPhantom","meta":{"private":true}},{"name":"getVal","tagname":"method","owner":"KobeU.data.filter.IDFilter","id":"method-getVal","meta":{}},{"name":"setValue","tagname":"method","owner":"KobeU.data.filter.ExFilter","id":"method-setValue","meta":{"private":true}}],"code_type":"ext_define","id":"class-KobeU.data.filter.IDFilter","short_doc":"A filter for id properties. ...","component":false,"superclasses":["Ext.util.Filter","KobeU.data.filter.ExFilter"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.util.Filter<div class='subclass '><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='docClass'>KobeU.data.filter.ExFilter</a><div class='subclass '><strong>KobeU.data.filter.IDFilter</strong></div></div></div><h4>Files</h4><div class='dependency'><a href='source/IDFilter.html#KobeU-data-filter-IDFilter' target='_blank'>IDFilter.js</a></div></pre><div class='doc-contents'><p>A filter for id properties.\nFor phantom record, this use internal id for the comparison.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-comps' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-cfg-comps' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-cfg-comps' class='name expandable'>comps</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>This comps Object is used to hold the mapping from operator name to the\ncomparator of the two values.</p>\n</div><div class='long'><p>This comps Object is used to hold the mapping from operator name to the\ncomparator of the two values.</p>\n</div></div></div><div id='cfg-defaultOpe' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-cfg-defaultOpe' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-cfg-defaultOpe' class='name expandable'>defaultOpe</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>the name of default operator ...</div><div class='long'><p>the name of default operator</p>\n<p>Defaults to: <code>&#39;==&#39;</code></p></div></div></div><div id='cfg-loalFilter' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-cfg-loalFilter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-cfg-loalFilter' class='name expandable'>loalFilter</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>The additional local filter that receives the target record as a single argument. ...</div><div class='long'><p>The additional local filter that receives the target record as a single argument.\nThis class first applys the default operator, which is\nspecified by \"this.operator\" and \"this.value\", and then\napply localFilter and localPropertyFIlter when the formaer is true.</p>\n</div></div></div><div id='cfg-loalPropertyFilter' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-cfg-loalPropertyFilter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-cfg-loalPropertyFilter' class='name expandable'>loalPropertyFilter</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>The additional local filter that receives the property value as a single argument. ...</div><div class='long'><p>The additional local filter that receives the property value as a single argument.\nThis class first applys the default operator, which is\nspecified by \"this.operator\" and \"this.value\", and then\napply localFilter and localPropertyFIlter when the formaer is true.</p>\n</div></div></div><div id='cfg-merge' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-cfg-merge' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-cfg-merge' class='name expandable'>merge</a> : Function<span class=\"signature\"></span></div><div class='description'><div class='short'>You can set a murge function. ...</div><div class='long'><p>You can set a murge function.\nThe merge function is used to merge this filter with the target filter to create unioned operation if possible..</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-comp' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-property-comp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-property-comp' class='name expandable'>comp</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.filter.IDFilter'>KobeU.data.filter.IDFilter</span><br/><a href='source/IDFilter.html#KobeU-data-filter-IDFilter-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/KobeU.data.filter.IDFilter-method-constructor' class='name expandable'>KobeU.data.filter.IDFilter</a>( <span class='pre'>config</span> ) : <a href=\"#!/api/KobeU.data.filter.IDFilter\" rel=\"KobeU.data.filter.IDFilter\" class=\"docClass\">KobeU.data.filter.IDFilter</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/KobeU.data.filter.IDFilter\" rel=\"KobeU.data.filter.IDFilter\" class=\"docClass\">KobeU.data.filter.IDFilter</a></span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/KobeU.data.filter.ExFilter-method-constructor\" rel=\"KobeU.data.filter.ExFilter-method-constructor\" class=\"docClass\">KobeU.data.filter.ExFilter.constructor</a></p></div></div></div><div id='method-checkLocalFilter' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-method-checkLocalFilter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-method-checkLocalFilter' class='name expandable'>checkLocalFilter</a>( <span class='pre'>target</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>check localFilters. ...</div><div class='long'><p>check localFilters.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-compare' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-method-compare' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-method-compare' class='name expandable'>compare</a>( <span class='pre'>val0, val1</span> ) : <span class=\"signature\"></span></div><div class='description'><div class='short'>comparator of two values. ...</div><div class='long'><p>comparator of two values.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>val0</span> : <div class='sub-desc'>\n</div></li><li><span class='pre'>val1</span> : <div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-filterFn' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-method-filterFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-method-filterFn' class='name expandable'>filterFn</a>( <span class='pre'>target</span> ) : <span class=\"signature\"></span></div><div class='description'><div class='short'>filterFn ...</div><div class='long'><p>filterFn</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : <div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getIdForPhantom' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.filter.IDFilter'>KobeU.data.filter.IDFilter</span><br/><a href='source/IDFilter.html#KobeU-data-filter-IDFilter-method-getIdForPhantom' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.IDFilter-method-getIdForPhantom' class='name expandable'>getIdForPhantom</a>( <span class='pre'>target, property</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>property</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-getVal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.filter.IDFilter'>KobeU.data.filter.IDFilter</span><br/><a href='source/IDFilter.html#KobeU-data-filter-IDFilter-method-getVal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.IDFilter-method-getVal' class='name expandable'>getVal</a>( <span class='pre'>target</span> ) : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>overwritten to return internal id for the idProperty of the phantom ...</div><div class='long'><p>overwritten to return internal id for the idProperty of the phantom</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>target</span> : Ext.data.Model<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul><p>Overrides: <a href=\"#!/api/KobeU.data.filter.ExFilter-method-getVal\" rel=\"KobeU.data.filter.ExFilter-method-getVal\" class=\"docClass\">KobeU.data.filter.ExFilter.getVal</a></p></div></div></div><div id='method-setValue' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/KobeU.data.filter.ExFilter' rel='KobeU.data.filter.ExFilter' class='defined-in docClass'>KobeU.data.filter.ExFilter</a><br/><a href='source/ExFilter.html#KobeU-data-filter-ExFilter-method-setValue' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.filter.ExFilter-method-setValue' class='name expandable'>setValue</a>( <span class='pre'>val</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>override setValue to prevent the override of filterFn by the superclass. ...</div><div class='long'><p>override setValue to prevent the override of filterFn by the superclass.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>val</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{}});