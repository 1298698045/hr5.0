/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
Sfdc.provide("SfdcApp.Visualforce.VSManager",{String:{VIEWSTATE_CONTAINER_ID:"ajax-view-state-page-container",VIEWSTATE_ID:"com.salesforce.visualforce.ViewState",VIEWSTATE_MAC_ID:"com.salesforce.visualforce.ViewStateMAC",VIEWSTATE_CSRF_ID:"com.salesforce.visualforce.ViewStateCSRF",VIEWSTATE_WRAPPER_ID:"ajax-view-state",ORIG_ONSUBMIT_FN_KEY:"origOnSubmit",ORIG_SUBMIT_FN_KEY:"origSubmit",FORM_KEY:"form"},vfOnSubmit:function(a){return function(){return SfdcApp.Visualforce.VSManager.vfOnSubmitImpl(a)}},
vfOnSubmitImpl:function(a){var b=SfdcApp.Visualforce.VSManager;if(b.isAjaxPrepareQueryContext())return b.executeOrigOnSubmit(a);var c=Sfdc.get(b.String.VIEWSTATE_WRAPPER_ID);Sfdc.assert(c,"Element viewStateWrapper with id \x3d "+b.String.VIEWSTATE_WRAPPER_ID+" must exist");a.appendChild(c);a=b.executeOrigOnSubmit(a);if(!1===a){var e=Sfdc.get(b.String.VIEWSTATE_CONTAINER_ID);Sfdc.assert(c,"Element viewStateContainer with id \x3d "+b.String.VIEWSTATE_CONTAINER_ID+" must exist");e.appendChild(c)}return a},
executeOrigOnSubmit:function(a){var b=a.getAttribute("id");Sfdc.assert(b,"Attribute id must exist for form "+a);var c=SfdcApp.Visualforce.VSManager,c=c.getFormData(b,c.String.ORIG_ONSUBMIT_FN_KEY),e;if(c){try{e=Sfdc.isFunction(c)?c:new Function(c)}catch(f){throw Sfdc.error('Error evaluating onsubmit() method "'+c+'" for form '+b+" : "+f.message),f;}try{return e.call?e.call(a):e()}catch(d){throw Sfdc.error('Error executing onsubmit() method "'+c+'" for form '+b+" : "+d.message),d;}}return!0},vfSubmit:function(a){return function(){return SfdcApp.Visualforce.VSManager.vfSubmitImpl(a)}},
vfSubmitImpl:function(a){var b=SfdcApp.Visualforce.VSManager,c=a.getAttribute("id");Sfdc.assert(c,"Attribute id must exist for form "+a);var e=Sfdc.get(b.String.VIEWSTATE_WRAPPER_ID);Sfdc.assert(e,"Element viewStateWrapper with id \x3d "+b.String.VIEWSTATE_WRAPPER_ID+" must exist");a.appendChild(e);b=b.getFormData(c,b.String.ORIG_SUBMIT_FN_KEY);Sfdc.assert(b,"Function originalSubmit for form with id \x3d "+c+" must exist");b.call?b.call(a):b()},formIds:[],isAjaxListenerAdded:!1,vfPrepareForms:function(a){for(var b=
SfdcApp.Visualforce.VSManager,c=b.formIds.length,e=0,f=a.length;e<f;e++)b.getFormData(a[e],b.String.FORM_KEY)||b.formIds.push(a[e]);b.vfSetFormFunctions();if(b.formIds.length!==c&&(b.fixViewstateLocation(),!b.isAjaxListenerAdded&&b.isAjaxContext())){b.isAjaxListenerAdded=!0;var d=b.dlc;d.isDlcEnabled()&&A4J.AJAX.AddListener({onbeforeajax:function(a,b,c){d.doClickBack=!0},onafterajax:function(a,b,c){d.vfPageLoadCompleted()}})}},vfSetFormFunctions:function(){for(var a=SfdcApp.Visualforce.VSManager,
b=a.formIds,c=0,e=b.length;c<e;c++){var f=b[c],d=Sfdc.get(f);if(d){d.getAttribute||(d=document.getElementById(f));var g=a.getFormData(f,a.String.FORM_KEY);d!==g&&(a.setFormData(f,a.String.FORM_KEY,d),(g=d.getAttribute("onsubmit"))||(g=""),a.setFormData(f,a.String.ORIG_ONSUBMIT_FN_KEY,g),a.setFormData(f,a.String.ORIG_SUBMIT_FN_KEY,d.submit),d.onsubmit=new a.vfOnSubmit(d),d.submit=new a.vfSubmit(d))}else f.match(/:_form$/)||Sfdc.warn("VisualForce Form with id \x3d "+f+" not found")}},isAjaxContext:function(){return"undefined"!==
typeof A4J},isAjaxPrepareQueryContext:function(){return"undefined"!==typeof A4J&&A4J.AJAX.PrepareQuery.arguments},formData:{},getFormData:function(a,b){Sfdc.assert(a,"Parameter id must be defined for getFormData(id, key, value)");Sfdc.assert(b,"Parameter key must be defined for getFormData(id, key, value)");return this.formData[a]?this.formData[a][b]:null},setFormData:function(a,b,c){Sfdc.assert(a,"Parameter id must be defined for setFormData(id, key, value)");Sfdc.assert(b,"Parameter key must be defined for setFormData(id, key, value)");
this.formData[a]||(this.formData[a]={});this.formData[a][b]=c},fixViewstateLocation:function(){var a=SfdcApp.Visualforce.VSManager,b=Sfdc.get(a.String.VIEWSTATE_WRAPPER_ID),c=Sfdc.get(a.String.VIEWSTATE_ID);c.parentNode!==b&&(b.appendChild(c),c=Sfdc.get(a.String.VIEWSTATE_MAC_ID),a=Sfdc.get(a.String.VIEWSTATE_CSRF_ID),c.parentNode!==b&&b.appendChild(c),a&&a.parentNode!==b&&b.appendChild(a))},dlc:{elementToClickBack:null,doClickBack:!0,clickBackTestTimeout:void 0,dlcEnabled:!1,onSetClickBack:void 0,
onClickBack:void 0,vfPageLoadCompleted:function(){var a=SfdcApp.Visualforce.VSManager.dlc;a.isDlcEnabled()&&window.setTimeout(function(){a.clickBackTestTimeout&&0<a.clickBackTestTimeout?setTimeout(function(){SfdcApp.Visualforce.VSManager.dlc.vfClickBack()},a.clickBackTestTimeout):a.vfClickBack()},0)},setDlcTestTimeOut:function(a){SfdcApp.Visualforce.VSManager.dlc.clickBackTestTimeout=a},enableDlc:function(){SfdcApp.Visualforce.VSManager.dlc.dlcEnabled=!0},isDlcEnabled:function(){return!0===SfdcApp.Visualforce.VSManager.dlc.dlcEnabled},
vfClickBack:function(){var a=SfdcApp.Visualforce.VSManager.dlc;if(null===a.elementToClickBack)a.doClickBack=!1;else{var b=a.elementToClickBack;a.elementToClickBack=null;b.isClickBack=!0;if(b.click)b.click();else b.onclick();document.body.style.cursor="default";b.style.cursor="default";if(a.onClickBack)try{a.onClickBack(b)}catch(c){Sfdc.error('Error executing user-defined onClickBack() function: "'+c.message)}}},vfSetClickBack:function(a){var b=SfdcApp.Visualforce.VSManager.dlc;if(!1===b.doClickBack)return!1;
if(!0===a.isClickBack)return a.isClickBack=!1;null!==b.elementToClickBack&&(b.elementToClickBack.style.cursor="default");if(b.onSetClickBack)try{b.onSetClickBack(a)}catch(c){Sfdc.error('Error executing user-defined onSetClickBack() function: "'+c.message)}b.elementToClickBack=a;a.style.cursor="progress";document.body.style.cursor="progress";return!0}}});

//# sourceMappingURL=/javascript/1686643107848/sfdc/source/VFState.js.map
