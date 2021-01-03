// TODO(frederickk)
// import {StorageHelper} from './storageHelper';

// export class Select {
//   private sh_ = StorageHelper;

//   private selector_: string;
//   private element_: HTMLInputElement | null = null;

//   constructor(selector: string) {
//     this.selector_ = selector;

//     if (this.selector_) {
//       this.element_ = document.querySelector(this.selector_);
//       const state = this.sh_.getState(this.element_, 'selectedIndex');
//       if (this.element_ && state) {
//         this.element_.value = state.toString();
//       }
//     }

//     this.attach_();
//   }

//   private attach_() {
//     if (this.element_) {
//       this.element_.addEventListener('change', this.changeListener_.bind(this));
//     }
//   }

//   private changeListener_() {
//     if (this.element_) {
//       this.sh_.setState(this.element_, 'selectedIndex');
//     }
//   }
// }