({

handleConfirm : function(component, event, helper) {
        var action = component.get("c.notifyCVSFileUpload");
        action.setParams({"recordId": component.get("v.recordId")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: "Success!",
                    message: " An email has been sent to the CVS!",
                    type: "success"
                    });
                toastEvent.fire();
                $A.get("e.force:closeQuickAction").fire();
                $A.get('e.force:refreshView').fire();
                
            }
            else if (state === "ERROR"){
                var errors = response.getError();
                if(errors) {
                    cmp.set("v.errorMsg", errors[0].message);
                    var errorMsg = cmp.find('errorMsg');
                    $A.util.removeClass(errorMsg, 'slds-hide');
                    var field = cmp.find('field');
                    $A.util.addClass(field, 'slds-hide');
                }
            }
        });
        $A.enqueueAction(action);
    },

//Close the quick action
handleClose : function(component, event, helper) {
    $A.get("e.force:closeQuickAction").fire();
},
});