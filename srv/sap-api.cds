namespace com.jrs.sapApi;
//using {com.jrs.lkwvor as db} from '../db/schema';
using {OP_API_SALES_ORDER_SRV_0001 as order} from '../srv/external/OP_API_SALES_ORDER_SRV_0001';
using {OP_API_INBOUND_DELIVERY_SRV_0002 as inboundDelivery} from '../srv/external/OP_API_INBOUND_DELIVERY_SRV_0002';
using {OP_API_OUTBOUND_DELIVERY_SRV_0002 as outboundDelivery} from '../srv/external/OP_API_OUTBOUND_DELIVERY_SRV_0002';
using {sap_s4_OP_API_FREIGHTORDER_0001_v1 as freightOrderServ} from '../srv/external/sap-s4-OP_API_FREIGHTORDER_0001-v1';
using {CE_FREIGHTBOOKING_0001 as freightBooking} from '../srv/external/CE_FREIGHTBOOKING_0001';
using {OP_API_BUSINESS_PARTNER_SRV as partner} from '../srv/external/OP_API_BUSINESS_PARTNER_SRV';
using {sap_s4_CE_PLANT_0001_v1 as plant} from '../srv/external/sap-s4-CE_PLANT_0001-v1';


service SalesOrderService @(path : '/SalesOrder') {
 
 entity SalesOrder as projection on order.A_SalesOrder {
        KEY SalesOrder, 
        SalesOrderType, 
        SalesOrganization, 
        DistributionChannel, 
        SoldToParty, 
        TotalNetAmount
    };

entity SalesOrderItem as projection on order.A_SalesOrderItem {
        KEY SalesOrder
        
    };
};

service FreightOrderService @(path : '/FreightOrder') {
 
 entity FreightOrder as projection on freightOrderServ.FreightOrder;

};

/*
service FreightOrderServiceII @(path : '/FreightOrderII') {
 
 entity FreightOrder as projection on FreightOrderServ.FreightOrder;

};
*/
service FreightBooking @(path : '/FreightBooking') {
 
 entity FreightBooking as projection on freightBooking.FreightBooking;

};



service InboundDeliveryService @(path : '/InboundDelivery') {
 
 entity InboundDelivery as projection on inboundDelivery.A_InbDeliveryHeader;

};

service OutboundDeliveryService @(path : '/OutboundDelivery') {
 
 entity OutboundDelivery as projection on outboundDelivery.A_OutbDeliveryHeader;

};
service PlantService @(path : '/Plant') {
 entity Plant as projection on plant.Plant;
};



service BusinessPartnerService @(path : '/BusinessPartner') {
 

  entity BusinessPartner as projection on partner.A_BusinessPartner;
  entity BusinessPartnerAddress as projection on partner.A_BusinessPartnerAddress;
};

/*
entity SAPDocumentOdata  {
        //    key MANDT: String(5);
    key DocNumber                 : String(30);
        DocType                   : String(5);
//        DocTypeDesc               : String(50);
        DocumentKindCode          : String(30);
        DocumentKindDescriptionDE : String(30);
        DocumentKindDescription   : String(30);
    //    description               : String(60);
        CustomerNumber            : String(20);
        CustomerName              : String(100);
        LoadingDateTime:          DateTime;
        Address: String(200);
        ProcessSapDocumentIn      : Association to many ProcessSAPDocumentIn
                                        on ProcessSapDocumentIn.to_SapDocument = $self;


}
*/