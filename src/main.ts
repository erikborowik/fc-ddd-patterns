import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";
import OrderItem from "./domain/order/entity/order_item";
import Order from "./domain/order/entity/order";

// Agregado com relacao e do tipo, ID
let customer = new Customer("ctmr1", "Bruno Leonardo");
const address = new Address("Rua A", 12, "Austin", "TX");
customer.Address = address;
customer.activate();

// Agregado com relacao e do tipo, Objeto - Entidade
const item1 = new OrderItem("ordit1", "Chocolate", 10, "pid123", 2);
const item2 = new OrderItem("ordit2", "Sanduiche", 15, "pid211", 1);
const item3 = new OrderItem("ordit3", "Coke", 7, "pid329", 1);
const order = new Order("ord1", "ctmr1", [item1, item2, item3]);
let order_total = order.total();

// exibindo os dados
console.log(customer);
console.log(address);
console.log(item1, item2, item3);
console.log(order);
console.log(order_total);
