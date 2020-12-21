export class MidiHelper {
  NOTE_ON = 0x90;
  NOTE_OFF = 0x80;
  CC = 0xB0;

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

  async connect() {
    await (navigator as Navigator)
    .requestMIDIAccess()
    .then(
        (midiAccess: WebMidi.MIDIAccess) => this.midiReady_(midiAccess),
        (err: Error) => console.log('Something went wrong', err));
  }

  noteOn(pitch: number, velocity: number) {
    const msgOn = [this.NOTE_ON, pitch, velocity];

    if (this.selectOut_) {
      const device: WebMidi.MIDIOutput = this.midiOut_[this.selectOut_.selectedIndex];
      device?.send(msgOn);
    }
  }

  noteOff(pitch: number, duration: number) {
    const msgOff = [this.NOTE_ON, pitch, 0];

    if (this.selectOut_) {
      const device: WebMidi.MIDIOutput = this.midiOut_[this.selectOut_.selectedIndex];
      device?.send(msgOff, Date.now() + duration);
    }
  }

  sendMessage(msg: number, value1: number, value2: number) {
    if (this.selectOut_) {
      const device: WebMidi.MIDIOutput = this.midiOut_[this.selectOut_.selectedIndex];
      device?.send([msg, value1, value2]);
    }
  }
}