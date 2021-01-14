declare global {
  interface Window {
    Bluetooth: any;
  }
}

export class BluetoothHelper {
  // https://www.midi.org/specifications-old/item/bluetooth-le-midi
  static MIDI_UUID = '03b80e5a-ede8-4b33-a751-6ce34ec4c700';
  static MIDI_CHAR_UUID = '7772e5db-3868-4112-a1a9-f2669d106bf3';

  private id_: BluetoothServiceUUID | undefined;
  private name_: string | undefined;
  private config_: RequestDeviceOptions = {
    acceptAllDevices: true,
  };
  private descriptor_: BluetoothRemoteGATTDescriptor | undefined;

  callback: Function | undefined;

  constructor(config: RequestDeviceOptions) {
    if (config) {
      this.config_ = config;
    }
  }

  private bluetoothReady_(device: BluetoothDevice): BluetoothRemoteGATTServer {
    console.log(`🔌 ${device.name}`);

    // TODO(frederickk): Type this appropriately.
    return (device.gatt?.connect() as any);
  }

  private bluetoothServices_(service: BluetoothRemoteGATTServer) {
    this.id_ = service.device.id;
    this.name_ = service.device.name;
    console.log(`📝 ${this.id_} - ${this.name_}`);

    // return service.getPrimaryServices();
    return service.getPrimaryService(BluetoothHelper.MIDI_UUID);
  }

  // private bluetoothServer_(services: Array<BluetoothRemoteGATTService>) {
  //   console.log(services);

  //   services.forEach(service => {
  //     // TODO(Frederickk): Make this user adjustable.
  //     this.startBleMIDIService_(service, BluetoothHelper.MIDI_CHAR_UUID);
  //   });

  //   return services.getCharacteristic(BluetoothHelper.MIDI_CHAR_UUID);
  // }

  private bluetoothServer_(service: BluetoothRemoteGATTService) {
    this.startBleMIDIService_(service, BluetoothHelper.MIDI_CHAR_UUID);
    console.log(service);

    return service.getCharacteristic(BluetoothHelper.MIDI_CHAR_UUID);
  }

  private async bluetoothCharacteristic_(characteristic: BluetoothRemoteGATTCharacteristic) {
    console.log(characteristic);

    return characteristic.getDescriptors();
  }

  private async bluetoothDescriptor_(descriptors: Array<BluetoothRemoteGATTDescriptor>) {
    for (let d of descriptors) {
      if (d.characteristic.properties.write === false) {
        console.warn('[BluetoothHelper] 🚧', `Device with UUID${d.characteristic.uuid} excludes-write https://github.com/WebBluetoothCG/registries/blob/master/gatt_blocklist.txt`);
      }
      if (d.characteristic.uuid === BluetoothHelper.MIDI_CHAR_UUID) {
        this.descriptor_ = d;
        break;
      }
    }

    return this.descriptor_?.readValue();
  }

  private async startBleMIDIService_(service: BluetoothRemoteGATTService, uuid: BluetoothServiceUUID) {
    console.log(`🎹 ${uuid}`);
    let characteristic = await service.getCharacteristic(uuid);
    await characteristic.startNotifications();
    characteristic.addEventListener('characteristicvaluechanged', this.onMidiEvent_.bind(this));
  }

  private onMidiEvent_(event: Event) {
    const data = (event.target as any)?.value;
    const out = [];

    for (let i = 0; i < data.buffer.byteLength; i++) {
      let val = data.getUint8(i);
      out.push(val);
    }

    // Slice off the first two bits.
    if (this.callback && out.length >= 3) {
      this.callback(out.slice(Math.max(out.length - 3, 0)));
    }
  }

  async connect() {
    await (navigator as Navigator).bluetooth
    .requestDevice(this.config_)
    .then(
      (device: BluetoothDevice) => this.bluetoothReady_(device))
    .then(
      (server: BluetoothRemoteGATTServer) => this.bluetoothServices_(server))
    .then(
      // (services: Array<BluetoothRemoteGATTService>) => this.bluetoothServer_(services))
      (service: BluetoothRemoteGATTService) => this.bluetoothServer_(service))
    .then (
      (characteristic: BluetoothRemoteGATTCharacteristic) => this.bluetoothCharacteristic_(characteristic))
    .then(
      (descriptor: Array<BluetoothRemoteGATTDescriptor>) => this.bluetoothDescriptor_(descriptor));
  }

  send(val: ArrayBuffer | ArrayBufferView, callback: Function | undefined) {
    this.descriptor_?.writeValue(val)
    .then(() => {
      if (callback) {
        callback(val);
      }
    })
    .catch(error => {
      console.warn('[BluetoothHelper] 🚧', error);
    });
  }
}