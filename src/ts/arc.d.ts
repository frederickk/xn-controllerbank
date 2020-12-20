import { MidiHelper } from './midiHelper';
export declare class Arc {
    private mh_;
    private sh_;
    private selector_;
    private element_;
    private label_;
    private value_;
    constructor(selector: string, mh: MidiHelper);
    get value(): number;
    private attach_;
    private changeListener_;
}
