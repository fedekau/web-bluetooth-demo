button.addEventListener('click', (event) => {
  navigator.bluetooth.requestDevice(
    {filters: [{services: ['battery_service']}]})
  .then(device => {
    return device.gatt.connect();
  })
  .then(server => {
    return server.getPrimaryService('battery_service');
  })
  .then(service => {
    return service.getCharacteristic('battery_level');
  })
  .then(characteristic => {
    return characteristic.readValue();
  })
  .then(value => {
    let batteryLevel = value.getUint8(0);
  })
  .catch(error => {
  });
});

button.addEventListener('click', async (event) => {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{services: ['battery_service']}]
    });

    const server = await device.gatt.connect();
    const service = await server.getPrimaryService('battery_service');
    const characteristic = await service.getCharacteristic('battery_level');
    const value = await characteristic.readValue();

    console.log('Battery level is: ', value.getUint8(0));
  } catch {
    //Something went wrong. Time for Plan B
  }
});


