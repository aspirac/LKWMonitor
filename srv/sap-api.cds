namespace com.jrs.sapApi;

using {OP_API_SALES_ORDER_SRV_0001 as order} from '../srv/external/OP_API_SALES_ORDER_SRV_0001';
using {OP_API_INBOUND_DELIVERY_SRV_0002 as inboundDelivery} from '../srv/external/OP_API_INBOUND_DELIVERY_SRV_0002';
using {OP_API_OUTBOUND_DELIVERY_SRV_0002 as outboundDelivery} from '../srv/external/OP_API_OUTBOUND_DELIVERY_SRV_0002';
using {sap_s4_OP_API_FREIGHTORDER_0001_v1 as freightOrder} from '../srv/external/sap-s4-OP_API_FREIGHTORDER_0001-v1';
using {sap_s4_OP_API_FREIGHTBOOKING_0001_v1 as freightBooking} from '../srv/external/sap-s4-OP_API_FREIGHTBOOKING_0001-v1';
using {OP_API_BUSINESS_PARTNER_SRV as partner} from '../srv/external/OP_API_BUSINESS_PARTNER_SRV';

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
 
 entity FreightOrder as projection on freightOrder.FreightOrder;

};

service FreightBooking @(path : '/FreightBooking') {
 
 entity FreightBooking as projection on freightBooking.FreightBooking;

};



service InboundDeliveryService @(path : '/InboundDelivery') {
 
 entity InboundDelivery as projection on inboundDelivery.A_InbDeliveryHeader;

};

service OutboundDeliveryService @(path : '/OutboundDelivery') {
 
 entity OutboundDelivery as projection on outboundDelivery.A_OutbDeliveryHeader;

};




service BusinessPartnerService @(path : '/BusinessPartner') {
 
 entity BusinessPartner as projection on partner.A_BusinessPartner;
};
