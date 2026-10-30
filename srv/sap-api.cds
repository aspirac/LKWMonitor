namespace com.jrs.sapApi;

using {OP_API_SALES_ORDER_SRV_0001 as order} from '../srv/external/OP_API_SALES_ORDER_SRV_0001';
using {sap_s4_OP_API_FREIGHTORDER_0001_v1 as freightOrder} from '../srv/external/sap-s4-OP_API_FREIGHTORDER_0001-v1';
using {API_BUSINESS_PARTNER as businessPartner} from '../srv/external/API_BUSINESS_PARTNER';



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




service BusinessPartnerService @(path : '/BusinessPartner') {
 
 entity BusinessPartner as projection on businessPartner.A_Customer;

};