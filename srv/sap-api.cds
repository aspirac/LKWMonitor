using {API_SALES_ORDER_SRV as order} from '../srv/external/API_SALES_ORDER_SRV';
using {CE_FREIGHTORDER_0001 as freightOrder} from '../srv/external/CE_FREIGHTORDER_0001';
using {CE_FREIGHTUNIT_0001 as freightUnit} from '../srv/external/CE_FREIGHTUNIT_0001';


service SalesOrderService @(path : '/Sales') {
 
 entity SalesOrder as projection on order.A_SalesOrder;

};

service FreightOrderService @(path : '/Freight') {
 
 entity FreightOrder as projection on freightOrder.FreightOrder;

};

service FreightUnitService @(path : '/Freight') {
 
 entity FreightUnit as projection on freightUnit.FreightUnit;

};