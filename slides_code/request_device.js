// It must be an action initiated by the user.
// This does not work.
navigator.bluetooth.requestDevice({ acceptAllDevices: true })

// This works :)
// We can accept all types of devices. Battery will die.
button.addEventListener('click', function(event) {
  navigator.bluetooth.requestDevice({ acceptAllDevices: true })
});

// Or we can filter by different criterias, but not both.
// Some services have standard names, others don't.
// You have to see the specification sheet of the manufacturer.
button.addEventListener('click', function(event) {
  const SERVICE_1_ID = 0x12345678;
  const SERVICE_2_UUID = '99999999-0000-1000-8000-00805f9b34fb';

  navigator.bluetooth.requestDevice({
    filters: [{
      services: ['heart_rate', SERVICE_1_ID, SERVICE_2_UUID]
    }]
  })
});
