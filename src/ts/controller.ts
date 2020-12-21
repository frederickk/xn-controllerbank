import {MidiHelper} from './midiHelper';
import {StorageHelper} from './storageHelper';

export class Controller {
  private mh_: MidiHelper;
  private sh_ = StorageHelper;

  private selector_: string;
  private element_: HTMLInputElement | null = null;
  private valueLabel_: HTMLInputElement | null = null;
  private value_ = 0;

  constructor(selector: string, mh: MidiHelper) {
    this.selector_ = selector;
    this.mh_ = mh;

    this.element_ = document.querySelector(this.selector_);
    this.valueLabel_ = document.querySelector(`${this.selector_}-label`);
    this.sh_.getState(this.element_, 'value');

    this.attach_();
    this.changeListener_();
  }

  get value(): number {
    return new Number(this.value_) as number;
  }

  private attach_() {
    this.element_?.addEventListener('input', this.changeListener_.bind(this));
    this.element_?.addEventListener('click', this.changeListener_.bind(this));
    this.valueLabel_?.addEventListener('input', this.labelInputListener_.bind(this));
  }

  private changeListener_() {
    const elem = document.querySelector(`${this.selector_}-val1`) as HTMLInputElement;
    const val1 = new Number(elem.value || 0) as number;

    this.value_ = new Number(this.element_?.value) as number;
    if (this.valueLabel_ && val1) {
      this.valueLabel_.value = `${this.value_}`;
    }

    // this.mh_.noteOn(this.value, 100, 100);
    this.mh_.sendMessage(this.mh_.CC, val1, this.value);
    this.sh_.setState(this.element_, 'value');
  }

  private labelInputListener_() {
    if (this.element_) {
      this.element_.value = this.valueLabel_?.value || '0';
      this.element_.click();
    }
  }
}