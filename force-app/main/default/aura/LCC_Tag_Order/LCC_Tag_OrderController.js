({
	doInit: function (component, event, helper) {
		var action = component.get("c.createTagOrder");
		action.setParams({ "recordId": component.get("v.recordId") });
		action.setCallback(this, function (response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				var eUrl = $A.get("e.force:navigateToURL");
				eUrl.setParams({
					"url":  response.getReturnValue(),
				});
				eUrl.fire();

			} else if (state === "ERROR") {
				var errors = response.getError();
				if (errors) {
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
})