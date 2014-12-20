Ext.data.JsonP.KobeU_data_EditError({"tagname":"class","name":"KobeU.data.EditError","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true},"files":[{"filename":"EditError.js","href":"EditError.html#KobeU-data-EditError"}],"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":[],"uses":[],"members":[{"name":"LRcoOccurence","tagname":"method","owner":"KobeU.data.EditError","id":"static-method-LRcoOccurence","meta":{"static":true}},{"name":"LRconflict","tagname":"method","owner":"KobeU.data.EditError","id":"static-method-LRconflict","meta":{"static":true}},{"name":"emptySrcElement","tagname":"method","owner":"KobeU.data.EditError","id":"static-method-emptySrcElement","meta":{"static":true}},{"name":"matchedField","tagname":"method","owner":"KobeU.data.EditError","id":"static-method-matchedField","meta":{"static":true}}],"code_type":"ext_define","id":"class-KobeU.data.EditError","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>KobeU.data.EditError</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/EditError.html#KobeU-data-EditError' target='_blank'>EditError.js</a></div></pre><div class='doc-contents'><p>This class represents an error that may occur\nwhen the joined element receives set operations.</p>\n</div><div class='members'><div class='members-section'><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div class='definedBy'>Defined By</div><h4 class='members-subtitle'>Static methods</h3><div id='static-method-LRcoOccurence' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.EditError'>KobeU.data.EditError</span><br/><a href='source/EditError.html#KobeU-data-EditError-static-method-LRcoOccurence' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.EditError-static-method-LRcoOccurence' class='name expandable'>LRcoOccurence</a>( <span class='pre'>config</span> ) : <span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>create an error when the set operation is going to write onto a field in the right source element that\nalso appears a...</div><div class='long'><p>create an error when the set operation is going to write onto a field in the right source element that\nalso appears as the left source element of the same joined element, and this write operation may\nerace the appearance of the source element on the right alias.\nSet \"config.src\" as the name of the target field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='static-method-LRconflict' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.EditError'>KobeU.data.EditError</span><br/><a href='source/EditError.html#KobeU-data-EditError-static-method-LRconflict' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.EditError-static-method-LRconflict' class='name expandable'>LRconflict</a>( <span class='pre'>config</span> ) : <span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>raise an error when the set operator changes the value of selector fields\nand also want to change the fields of the r...</div><div class='long'><p>raise an error when the set operator changes the value of selector fields\nand also want to change the fields of the right source elements, which may be\nreplaced by the write in selector field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='static-method-emptySrcElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.EditError'>KobeU.data.EditError</span><br/><a href='source/EditError.html#KobeU-data-EditError-static-method-emptySrcElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.EditError-static-method-emptySrcElement' class='name expandable'>emptySrcElement</a>( <span class='pre'>config</span> ) : <span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>create an error when the set operation is going to write onto the fields that\ndoes not have owner source elements. ...</div><div class='long'><p>create an error when the set operation is going to write onto the fields that\ndoes not have owner source elements.\nSet \"config.src\" as the alias name of the source element.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='static-method-matchedField' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.EditError'>KobeU.data.EditError</span><br/><a href='source/EditError.html#KobeU-data-EditError-static-method-matchedField' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.EditError-static-method-matchedField' class='name expandable'>matchedField</a>( <span class='pre'>config</span> ) : <span class=\"signature\"><span class='static' >static</span></span></div><div class='description'><div class='short'>create an error when the set operation is going to write onto the matched fields,\nwhich is the field of the right tab...</div><div class='long'><p>create an error when the set operation is going to write onto the matched fields,\nwhich is the field of the right table and used for join conditions to be connected with left tables.\nSet \"config.field\" as the name of the matched field.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});