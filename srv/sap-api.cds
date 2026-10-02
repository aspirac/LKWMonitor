namespace com.jrs.sapApi;

using {OP_API_SALES_ORDER_SRV_0001 as order} from '../srv/external/OP_API_SALES_ORDER_SRV_0001';

using {CE_FREIGHTORDER_0001 as freightOrder} from '../srv/external/CE_FREIGHTORDER_0001';
using {CE_FREIGHTUNIT_0001 as freightUnit} from '../srv/external/CE_FREIGHTUNIT_0001';
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

service FreightUnitService @(path : '/FreightUnit') {
 
 entity FreightUnit as projection on freightUnit.FreightUnit;

};
service BusinessPartnerService @(path : '/BusinessPartner') {
 
 entity BusinessPartner as projection on businessPartner.A_Customer;

};