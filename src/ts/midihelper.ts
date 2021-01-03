declare global {
  interface Window {
    Midi: any;
  }
}

export class MidiHelper {
  AFTERTOUCH = 0xA0;
  CC = 0xB0;
  CHANNEL_PRESSURE = 0xD0;
  NOTE_ON = 0x90;
  NOTE_OFF = 0x80;
  PATCH_CHANGE = 0xC0;
  PITCH_BEND = 0xE0;
  PROGRAM_CHANGE = 0xC0;
  SYSTEM = 0xF0

  private midiIn_: WebMidi.MIDIInput[] = [];
  private midiOut_: WebMidi.MIDIOutput[] = [];
  private selectIn_: HTMLSelectElement | null = null;
  private selectOut_: HTMLSelectElement | null = null;

  constructor() {
    this.selectIn_ = document.querySelector('#midi-input');
    this.selectOut_ = document.querySelector('#midi-output');
  }

  private midiReady_(midiAccess: WebMidi.MIDIAccess) {
    midiAccess.addEventListener('statechange', () => {
      this.initDevices_(midiAccess);
    });
    this.initDevices_(midiAccess);
  }

  private initDevices_(midiAccess: WebMidi.MIDIAccess) {
    this.midiIn_ = [];
    this.midiOut_ = [];

    // MIDI devices that send you data.
    const inputs = midiAccess.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      this.midiIn_.push(input.value);
    }

    // MIDI devices that you send data to.
    const outputs = midiAccess.outputs.values();
    for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
      this.midiOut_.push(output.value);
    }

    this.displayDevices_();
  }

  private displayDevices_() {
    if (this.selectIn_) {
      this.selectIn_.innerHTML = this.midiIn_.map((device: any) => {
        return `<option>${device.name}</option>`
      }).join('');
    }

    if (this.selectOut_) {
      this.selectOut_.innerHTML = this.midiOut_.map((device: any) => {
        return `<option>${device.name}</option>`
      }).join('');
    }
  }

  private incrementHex_(hexVal: string|number, inc: string|number) {
    const add = parseInt(hexVal.toString()) + parseInt(inc.toString());

    return parseInt(add.toString(16), 16);
  }

  private send_(msg: Array<number>, duration: number|undefined) {
    if (this.selectOut_) {
      console.log('Midi.send', msg, duration);
      const device: WebMidi.MIDIOutput = this.midiOut_[this.selectOut_.selectedIndex];
      device?.send(msg, duration);
    }
  }

  async connect() {
    await (navigator as Navigator)
    .requestMIDIAccess()
    .then(
        (midiAccess: WebMidi.MIDIAccess) => this.midiReady_(midiAccess),
        (err: Error) => console.log('Something went wrong', err));
  }

  /** Send Midi note on message. */
  noteOn(pitch: number, velocity: number, channel = 0) {
    const msgOn = [this.incrementHex_(this.NOTE_ON, channel), pitch, velocity];
    this.send_(msgOn, undefined);
  }

  /** Send Midi note off message. */
  noteOff(pitch: number, duration: number, channel = 0) {
    const msgOff = [this.incrementHex_(this.NOTE_ON, channel), pitch, 0];
    this.send_(msgOff, Date.now() + duration);
  }

  /** Send Midi generic message. */
  sendMessage(msg: number, value1: number, value2: number, channel = 0) {
    const msg_ = this.incrementHex_(msg, channel);
    this.send_([msg_, value1, value2], undefined);
  }
}