/*
 * This code is for Internal Salesforce use only, and subject to change without notice.
 * Customers shouldn't reference this file in any web pages.
 */
Ext.ns("Sfdc");Sfdc.MessageHandler=function(){this.messageStack=[];this.redoStack=[];this.observers=[]};Sfdc.MessageHandler.getPerformerName=function(a,b){return b?"action_beforeDo"+a.type:"action_do"+a.type};
Sfdc.MessageHandler.prototype={addObserver:function(a){this.observers.push(a)},removeObserver:function(a){this.observers.remove(a)},pushForUndo:function(a){0===this.messageStack.length&&Ext.getCmp("undoBtn").enable();this.messageStack.push(a);100<=this.messageStack.length&&this.messageStack.shift()},popForUndo:function(a){a=this.messageStack.pop();0===this.messageStack.length&&Ext.getCmp("undoBtn").disable();return a},pushForRedo:function(a){0===this.redoStack.length&&Ext.getCmp("redoBtn").enable();
this.redoStack.push(a)},popForRedo:function(){var a=this.redoStack.pop();0===this.redoStack.length&&Ext.getCmp("redoBtn").disable();return a},_respondsTo:function(a,b){if("function"==typeof b[Sfdc.MessageHandler.getPerformerName(a,!1)])return"function"==typeof b.acceptMessage&&!b.acceptMessage(a)?!1:!0},perform:function(a){var b=Sfdc.MessageHandler.getPerformerName(a,!1),c=Sfdc.MessageHandler.getPerformerName(a,!0),d=this.observers.select(this._respondsTo.curry(a));if(!d.collect(function(b){return"function"==
typeof b[c]?b[c].call(b,a):!1}).any()&&!d.collect(function(d){return d[b].call(d,a,!1)}).any())return 0<this.redoStack.length&&(this.redoStack=[],Ext.getCmp("redoBtn").disable()),this.pushForUndo(a),!0},undoLast:function(a){if(0<this.messageStack.length){var b=this.popForUndo();a||this.pushForRedo(b);a=this.observers.select(this._respondsTo.curry(b));var c=Sfdc.MessageHandler.getPerformerName(b);a.each(function(a){a[c].call(a,b,!0)})}},redo:function(){if(0<this.redoStack.length){var a=this.popForRedo();
this.pushForUndo(a);var b=this.observers.select(this._respondsTo.curry(a)),c=Sfdc.MessageHandler.getPerformerName(a);b.each(function(b){b[c].call(b,a,!1)})}},isDirty:function(){return 0<this.messageStack.length},clear:function(){this.messageStack=[];this.redoStack=[];Ext.getCmp("undoBtn").disable();Ext.getCmp("redoBtn").disable()}};

//# sourceMappingURL=/javascript/1679590411000/sfdc/source/MessageHandler.js.map