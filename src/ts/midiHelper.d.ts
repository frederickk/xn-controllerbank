export declare class MidiHelper {
    NOTE_ON: number;
    NOTE_OFF: number;
    CC: number;
    private midiIn_;
    private midiOut_;
    private selectIn_;
    private selectOut_;
    constructor();
    private midiReady_;
    private initDevices_;
    private displayDevices_;
    connect(): Promise<void>;
    noteOn(pitch: number, velocity: number): void;
    noteOff(pitch: number, duration: number): void;
    sendMessage(msg: number, value1: number, value2: number): void;
}
