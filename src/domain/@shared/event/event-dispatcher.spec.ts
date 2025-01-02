import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";
import SendLogCustomerCreatedToDataLake from "../../customer/event/handler/send-log-customer-created-to-datalake.handler";
import LogCustomerCreated from "../../customer/event/handler/log-customer-created.handler";
import LogWhenAddressIsChanged from "../../customer/event/handler/log-when-address-is-changed.handler";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    // Product Events
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    // Customer events
    const eventHandler1 = new SendLogCustomerCreatedToDataLake();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

    const eventHandler2 = new LogCustomerCreated();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const eventHandler3 = new LogWhenAddressIsChanged();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler3);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler3);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();

    // Product Events
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    // Customer Events
    const eventHandler1 = new SendLogCustomerCreatedToDataLake();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

    const eventHandler2 = new LogCustomerCreated();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);

    const eventHandler3 = new LogWhenAddressIsChanged();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler3);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler3);

    eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler3);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    // Product Events
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    // Customer Events
    const eventHandler1 = new SendLogCustomerCreatedToDataLake();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

    const eventHandler2 = new LogCustomerCreated();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const eventHandler3 = new LogWhenAddressIsChanged();
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler3);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler3);

    // UnregisterAll
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    
    // Product Events
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);
    expect(spyEventHandler).toHaveBeenCalled();

    // Customer Events
    const eventHandler1 = new SendLogCustomerCreatedToDataLake();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

    const eventHandler2 = new LogCustomerCreated();
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

    const eventHandler3 = new LogWhenAddressIsChanged();
    const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler3);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler3);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1"
    });

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "1",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 123,
        zip: "13330-250",
        city: "São Paulo"
      }
    });

    eventDispatcher.notify(customerCreatedEvent);
    eventDispatcher.notify(customerAddressChangedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyEventHandler3).toHaveBeenCalled();
  });
});
