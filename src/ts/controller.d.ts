import { MidiHelper } from './midiHelper';
export declare class Controller {
    private mh_;
    private sh_;
    private selector_;
    private element_;
    private valueLabel_;
    private value_;
    constructor(selector: string, mh: MidiHelper);
    get value(): number;
    private attach_;
    private changeListener_;
    private labelInputListener_;
}
