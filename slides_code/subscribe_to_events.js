// Automatically reconnect.
// Using exponential backoff is a good idea.
device.addEventListener('gattserverdisconnected', () => this.device.gatt.connect());

// Subscribe to changes in a characteristic value
characteristic.addEventListener('characteristicvaluechanged', (event) => {
  const value = event.target.value.getUint8(0);

  console.log('Battery level is: ', value);
})

// Don't forget to start notifications.
// If you don't no event will be fired
characteristic.startNotifications();

// Then stop them.
characteristic.stopNotifications();

// You can also write values.
// Make sure to read the format before you write.
let value = Uint8Array.of(1);
characteristic.writeValue(value);
