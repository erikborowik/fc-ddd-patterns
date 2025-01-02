import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Customer from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class LogWhenAddressIsChanged
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const customer = new Customer(event.eventData.id, event.eventData.name);
    const address = new Address(
        event.eventData.address.street, 
        event.eventData.address.number, 
        event.eventData.address.zip,
        event.eventData.address.city
    );
    customer.changeAddress(address);
    console.log(`Endereço do cliente: ${customer.id}, ${customer.name}, alterado para: ${customer.Address}`);
  }
}
