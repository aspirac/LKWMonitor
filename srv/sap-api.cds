//using {OP_API_SALES_ORDER_SRV_0001 as orderOnPremise} from '../srv/external/OP_API_SALES_ORDER_SRV_0001';
using {API_SALES_ORDER_SRV as order} from '../srv/external/API_SALES_ORDER_SRV';
using {CE_FREIGHTORDER_0001 as freightOrder} from '../srv/external/CE_FREIGHTORDER_0001';
using {CE_FREIGHTUNIT_0001 as freightUnit} from '../srv/external/CE_FREIGHTUNIT_0001';


service SalesOrderService @(path : '/Sales') {
 
 entity SalesOrder as projection on order.A_SalesOrder;

};

service FreightOrderService @(path : '/FreightOrder') {
 
 entity FreightOrder as projection on freightOrder.FreightOrder;

};

service FreightUnitService @(path : '/FreightUnit') {
 
 entity FreightUnit as projection on freightUnit.FreightUnit;

};