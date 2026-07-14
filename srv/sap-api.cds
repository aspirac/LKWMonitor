using {API_SALES_ORDER_SRV as order} from '../srv/external/API_SALES_ORDER_SRV';

service SalesOrderService @(path : '/Sales') {
 
 entity SalesOrder as projection on order.A_SalesOrder;

};