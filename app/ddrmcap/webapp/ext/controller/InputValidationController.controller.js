

sap.ui.define(['sap/ui/core/mvc/ControllerExtension',
	'sap/m/MessageToast',
	"sap/ui/core/Messaging",
	'sap/ui/core/message/Message',
	'sap/ui/core/message/MessageType',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/ui/core/Element',
	'sap/ui/model/resource/ResourceModel',
	'sap/base/i18n/ResourceBundle'
	
],
   
	function (ControllerExtension) {
		'use strict';

		return ControllerExtension.extend('ddrm.ext.controller.InputValidation', {
			// this section allows to extend lifecycle hooks or hooks provided by Fiori elements

			override: {
				/**
				 * Called when a controller is instantiated and its View controls (if available) are already created.
				 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
				 * @memberOf ddrm.ext.controller.InputValidation
				 */
				onAfterBinding: async function (oBindingContext) {
					const oExtensionAPI = this.base.getExtensionAPI();
					
					oModel = oExtensionAPI.getModel();
				//	sFunctionName = "getBookingDataOfPassenger", 
				//	oFunction = oModel.bindContext(`/${sFunctionName}(...)`),
				//	 oBookingTableAPI = oExtensionAPI.byId("fe::CustomSubSection::Bookings--OwnBookingsTable"), 
				//	 oWarningMessage = new Message({ type: MessageType.Warning, message: await oExtensionAPI.getModel("i18n").getResourceBundle().getText("bookingsNew") }), 
				//	 oInfoMessage = new Message({ type: MessageType.Info, message: await oExtensionAPI.getModel("i18n").getResourceBundle().getText("bookingsAttention") }); 
				}, 

				 onInit: function () {
				
					// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
					var oModel = this.base.getExtensionAPI().getModel();
					
				},

				onAfterRendering: function () {
					// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
					var oModel = this.base.getExtensionAPI().getModel();

					var message = "This is a success message!";
					const oControl = this.byId("caseTypeID"); // Replace with the actual ID
					const oControl2 = this.byId("caseTypeID_ID"); // Replace with the actual ID
					if (oControl) {
						oControl.attachChange(this._handleFieldChange.bind(this));
					}

				},

				onBeforeRendering: function () {
					// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
					var oModel = this.base.getExtensionAPI().getModel();
					var message = "This is a success message!";
					const oControl = this.byId("processTypeID_ID"); // Replace with the actual ID
					if (oControl) {
						oControl.attachChange(this._handleFieldChange.bind(this));
					}

				},

				onSuccess: function () {
					// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
					var oModel = this.base.getExtensionAPI().getModel();
					var message = "This is a success message!";
				},
				onError: function () {
					// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
					var oModel = this.base.getExtensionAPI().getModel();
					var message = "This is a success message!";
				},

				editFlow: {

					 onBeforeEdit: function (mParameters) {
					 	//synchronous access to property value
					 	if (mParameters?.context.getProperty("DialogProperty")) {
					 		return this.openDialog("Do you want to edit this really nice... object ?", true);
					 	}
				 },
					 onAfterEdit: function (mParameters) {
					 	//synchronous access to complete data the context points to

					// 	//	return;
					 	return sap.m.MessageToast.show(
							
					 		this.getView().getModel("i18n").getResourceBundle().getText("editSuccess") + " "
					 		+ Object.entries(mParameters.context.getObject()).length
					 	);
					 },

					 				onBeforeSave: function (mParameters) {
					 					var fnResolve, fnReject;
					 					var oPromise = new Promise(function (resolve, reject) {
					 						fnResolve = resolve;
					 						fnReject = reject;
					 					});
										const oView = this.getView();
									},
					 					
                                    
					 					// Find the control by its generated ID
					 					// Replace 'YourFieldID' with the programmatic ID of your field
					// 					// The full ID is often in the format: <generatedPrefix>::<fragmentId>-<fieldId>
					// 					const oInput = oView.byId("caseOpenDate");

					// 					// Check if the control exists before attempting to focus
					// 					if (oInput) {
					// 						// Use a delayed call to ensure the DOM is ready for focus
					// 						jQuery.sap.delayedCall(0, oInput, oInput.focus);

					// 						var oModel = this.base.getExtensionAPI().getModel();
					// 					}

					// 					//   var oResourceBundle = this.base.getView().getModel('i18n').getResourceBundle()			
					// 					var obj = mParameters.context.getObject();
					// 					var msg;
					// 					switch (obj.caseTypeID_ID) {
					// 						case "Ausnahme":
					// 							obj.caseTypeCode = 'A';
					// 							break;
					// 						case "Insolvenz":
					// 							obj.caseTypeCode = 'I';
					// 							break;
					// 						case "Krisis":
					// 							obj.caseTypeCode = 'K';
					// 							break;
					// 						case "VS-Reporting Relevant":
					// 							obj.caseTypeCode = 'V';
					// 							break;
					// 					}

					// 					switch (obj.caseTypeCode) {
					// 						case "A":

					// 							if (obj.ablaufsDatum < obj.erstellungsDatum) {
					// 								msg = this.getView().getModel("i18n").getResourceBundle().getText("errorDateRange");
					// 							}
					// 							break;
					// 						case "I":
					// 							if (obj.PAGBetroffen == true) {

					// 								// if (obj.typeCaseId_ID == null) {
					// 								// 	msg = this.getView().getModel("i18n").getResourceBundle().getText("typeCase") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								// }
					// 								// else if (obj.insolvencyApplication == null) {
					// 								// 	msg = this.getView().getModel("i18n").getResourceBundle().getText("insolvencyApplication") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								// }
					// 								if (obj.measures == true) {
					// 									//		if (obj.measuresTypeId_ID == null) {
					// 									//			msg = this.getView().getModel("i18n").getResourceBundle().getText("measuresType") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 									//		}
					// 									/*
					// 									else if (obj.liquidityEffect == null) {
					// 										msg = this.getView().getModel("i18n").getResourceBundle().getText("liquidityEffect") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 									}
					// 									else if (obj.measuresDate == null) {
					// 										msg = this.getView().getModel("i18n").getResourceBundle().getText("measuresDate") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 									}
					// 									else if (obj.fundsOutflowCurrentYear == null) {
					// 										msg = this.getView().getModel("i18n").getResourceBundle().getText("fundsOutflowCurrentYear") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 									}

					// 									else if (obj.fundsOutflowNextYear == null) {
					// 										msg = this.getView().getModel("i18n").getResourceBundle().getText("fundsOutflowNextYear") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 									}

					// 									else if (obj.commentMeasures == null) {
					// 										msg = this.getView().getModel("i18n").getResourceBundle().getText("commentMeasures") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 									}
					// */
					// 								}
					// 							}
					// 							break;
					// 						case "K":
					// 							if (obj.PAGBetroffen == true) {
					// 								if (obj.typeCaseId_ID == null) {
					// 									msg = this.getView().getModel("i18n").getResourceBundle().getText("typeCase") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								}
					// 								else if (obj.insolvencyApplication == null) {
					// 									msg = this.getView().getModel("i18n").getResourceBundle().getText("insolvencyApplication") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								}
					// 								/*
					// 								else if (obj.comGERCommunication == null) {
					// 									msg = this.getView().getModel("i18n").getResourceBundle().getText("comGERCommunication") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								}

					// 								else if (obj.measuresTypeId_ID == null) {
					// 									msg = this.getView().getModel("i18n").getResourceBundle().getText("measuresType") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								}

					// 								else if (obj.liquidityEffect == null) {
					// 									msg = this.getView().getModel("i18n").getResourceBundle().getText("liquidityEffect") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								}
					// 								else if (obj.measuresDate == null) {
					// 									msg = this.getView().getModel("i18n").getResourceBundle().getText("measuresDate") + " " + this.getView().getModel("i18n").getResourceBundle().getText("isMandatory");
					// 								}
					// 									*/
					// 							}
					// 							break;

					// 					}
					// 					if (msg !== undefined) {
					// 						msg = msg + " " + this.getView().getModel("i18n").getResourceBundle().getText("savedAsDraft");
					// 						sap.m.MessageToast.show(msg);
					// 						fnReject();
					// 					} else {
					// 						fnResolve();
					// 					}

					// 					return oPromise;
					// 				},
					 onAfterSave: function (mParameters) {
					 	mParameters.context.refresh();
					// 	//		var oResourceBundle = this.getResourceBundle(this);
					 	//asynchronous access to complete data the context points to
					 	mParameters.context.requestObject().then((contextData) => {

					 		sap.m.MessageToast.show(
					 			this.getView().getModel("i18n").getResourceBundle().getText("saveSuccess") + " " + Object.entries(contextData).length
					 		);

					 	});
					 	this.base.getExtensionAPI().routing.navigateToRoute("ExceptionsList");
					 },
					 onBeforeDiscard: function (mParameters) {
					 	if (mParameters?.context.getProperty("DialogProperty")) {
					 		var oResourceBundle = this.getResourceBundle(this);
					 		var sText = oResourceBundle.getText("discardConfirm");
					 		return this.openDialog(sText);
					 	}
					 }
				}
			},
		});
	});

