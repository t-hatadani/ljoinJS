Ext.data.JsonP.KobeU_data_ViewEditManager({"tagname":"class","name":"KobeU.data.ViewEditManager","autodetected":{"aliases":true,"alternateClassNames":true,"extends":true,"mixins":true,"requires":true,"uses":true,"members":true,"code_type":true,"singleton":true},"files":[{"filename":"ViewEditManager.js","href":"ViewEditManager.html#KobeU-data-ViewEditManager"}],"private":true,"aliases":{},"alternateClassNames":[],"extends":"Ext.Base","mixins":[],"requires":["KobeU.data.EditErrorReport","KobeU.data.EditWarning"],"uses":[],"members":[{"name":"logEventFlag","tagname":"property","owner":"KobeU.data.ViewEditManager","id":"property-logEventFlag","meta":{"private":true}},{"name":"logFlag","tagname":"property","owner":"KobeU.data.ViewEditManager","id":"property-logFlag","meta":{"private":true}},{"name":"profileResult","tagname":"property","owner":"KobeU.data.ViewEditManager","id":"property-profileResult","meta":{"private":true}},{"name":"checkEditable","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-checkEditable","meta":{"private":true}},{"name":"checkEditableJoined","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-checkEditableJoined","meta":{"private":true}},{"name":"checkEditableSrc","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-checkEditableSrc","meta":{"private":true}},{"name":"checkFieldsLoop","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-checkFieldsLoop","meta":{"private":true}},{"name":"deleteSrc","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-deleteSrc","meta":{"private":true}},{"name":"editSrc","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-editSrc","meta":{"private":true}},{"name":"logEvent","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-logEvent","meta":{"private":true}},{"name":"logTime","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-logTime","meta":{"private":true}},{"name":"printProfile","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-printProfile","meta":{"private":true}},{"name":"setupJoinInfo","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-setupJoinInfo","meta":{"private":true}},{"name":"srcAttendJRecord","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-srcAttendJRecord","meta":{"private":true}},{"name":"srcLeaveJRecord","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-srcLeaveJRecord","meta":{"private":true}},{"name":"triggerProfile","tagname":"method","owner":"KobeU.data.ViewEditManager","id":"method-triggerProfile","meta":{"private":true}}],"code_type":"ext_define","singleton":true,"id":"class-KobeU.data.ViewEditManager","component":false,"superclasses":["Ext.Base"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Base<div class='subclass '><strong>KobeU.data.ViewEditManager</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/KobeU.data.EditErrorReport' rel='KobeU.data.EditErrorReport' class='docClass'>KobeU.data.EditErrorReport</a></div><div class='dependency'><a href='#!/api/KobeU.data.EditWarning' rel='KobeU.data.EditWarning' class='docClass'>KobeU.data.EditWarning</a></div><h4>Files</h4><div class='dependency'><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager' target='_blank'>ViewEditManager.js</a></div></pre><div class='doc-contents'><div class='rounded-box private-box'><p><strong>NOTE:</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p></div><p>This class manages the influences of data update on source elements, and\nreflects to the join elements.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-logEventFlag' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-property-logEventFlag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-property-logEventFlag' class='name expandable'>logEventFlag</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-logFlag' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-property-logFlag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-property-logFlag' class='name expandable'>logFlag</a> : Boolean<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<p>Defaults to: <code>false</code></p></div></div></div><div id='property-profileResult' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-property-profileResult' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-property-profileResult' class='name expandable'>profileResult</a> : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-checkEditable' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-checkEditable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-checkEditable' class='name expandable'>checkEditable</a>( <span class='pre'>record, fieldName, flag</span> ) : Object<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>TODO\ncheck the field is editable or not. ...</div><div class='long'><p>TODO\ncheck the field is editable or not.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : <div class='sub-desc'>\n</div></li><li><span class='pre'>fieldName</span> : <div class='sub-desc'>\n</div></li><li><span class='pre'>flag</span> : <div class='sub-desc'><p>set true if you want to gatehr warning messages.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>..説明..</p>\n</div></li></ul></div></div></div><div id='method-checkEditableJoined' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-checkEditableJoined' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-checkEditableJoined' class='name expandable'>checkEditableJoined</a>( <span class='pre'>record, fieldName, flag</span> ) : <span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>check whether the set operation on the given field may occur {KobeU.data.EditError} ...</div><div class='long'><p>check whether the set operation on the given field may occur {<a href=\"#!/api/KobeU.data.EditError\" rel=\"KobeU.data.EditError\" class=\"docClass\">KobeU.data.EditError</a>}</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : <div class='sub-desc'><p>the target joined element</p>\n</div></li><li><span class='pre'>fieldName</span> : <div class='sub-desc'><p>the name of the target field OR the JSON of which attribute names are the written field names.</p>\n</div></li><li><span class='pre'>flag</span> : <div class='sub-desc'><p>set true if you want to gatehr warning messages.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-checkEditableSrc' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-checkEditableSrc' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-checkEditableSrc' class='name expandable'>checkEditableSrc</a>( <span class='pre'>record, fieldName, flag</span> ) : <span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>check whether the set operation on the given field may occur {KobeU.data.EditWarnings} or not. ...</div><div class='long'><p>check whether the set operation on the given field may occur {KobeU.data.EditWarnings} or not.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : <div class='sub-desc'><p>the target source</p>\n</div></li><li><span class='pre'>fieldName</span> : <div class='sub-desc'><p>the name of the target field.</p>\n</div></li><li><span class='pre'>flag</span> : <div class='sub-desc'><p>set true if you want to gatehr warning messages.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-checkFieldsLoop' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-checkFieldsLoop' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-checkFieldsLoop' class='name expandable'>checkFieldsLoop</a>( <span class='pre'>member, record, fields, flag</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>member</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>record</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>fields</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>flag</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-deleteSrc' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-deleteSrc' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-deleteSrc' class='name expandable'>deleteSrc</a>( <span class='pre'>srecord</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>This method checks the influence of the deletion of the source element srecord. ...</div><div class='long'><p>This method checks the influence of the deletion of the source element srecord.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>srecord</span> : <div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-editSrc' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-editSrc' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-editSrc' class='name expandable'>editSrc</a>( <span class='pre'>record, f2v</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>This method checks the influence of the modifications (f2v) on record. ...</div><div class='long'><p>This method checks the influence of the modifications (f2v) on record.\nIt checks the joined elements that the record joins, and also checks the\njoined elemenets that previously cannot find the matched source elements\nfor the class that the record belongs.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>record</span> : <div class='sub-desc'>\n</div></li><li><span class='pre'>f2v</span> : <div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-logEvent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-logEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-logEvent' class='name expandable'>logEvent</a>( <span class='pre'>label, item</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>label</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>item</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-logTime' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-logTime' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-logTime' class='name expandable'>logTime</a>( <span class='pre'>label</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>label</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-printProfile' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-printProfile' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-printProfile' class='name expandable'>printProfile</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-setupJoinInfo' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-setupJoinInfo' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-setupJoinInfo' class='name expandable'>setupJoinInfo</a>( <span class='pre'>srecord</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>The following methods are used to manage the join relation\nbetween the source elements and the joined element. ...</div><div class='long'><p>The following methods are used to manage the join relation\nbetween the source elements and the joined element.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>srecord</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-srcAttendJRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-srcAttendJRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-srcAttendJRecord' class='name expandable'>srcAttendJRecord</a>( <span class='pre'>srecord, joined, label</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>srecord</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>joined</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>label</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-srcLeaveJRecord' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-srcLeaveJRecord' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-srcLeaveJRecord' class='name expandable'>srcLeaveJRecord</a>( <span class='pre'>srecord, joined, label</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>srecord</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>joined</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>label</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-triggerProfile' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='KobeU.data.ViewEditManager'>KobeU.data.ViewEditManager</span><br/><a href='source/ViewEditManager.html#KobeU-data-ViewEditManager-method-triggerProfile' target='_blank' class='view-source'>view source</a></div><a href='#!/api/KobeU.data.ViewEditManager-method-triggerProfile' class='name expandable'>triggerProfile</a>( <span class='pre'>time</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>time</span> : Object<div class='sub-desc'></div></li></ul></div></div></div></div></div></div></div>","meta":{"private":true}});