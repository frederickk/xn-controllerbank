export class StorageHelper {
  static getState(item: any, valueSrc: string = '') {
    const state = localStorage.getItem(item.id);
    if (state && valueSrc) {
      item[valueSrc] = state;
    }

    return state;
  }

  static setState(item: any, valueSrc: string = '') {
    console.log('setting state', item.id, item[valueSrc].toString());
    localStorage.setItem(item.id, item[valueSrc].toString());
  }

  static attach(item: any, valueSrc: string = '') {
    const eventType = (valueSrc == 'innerText')
      ? 'input'
      : 'change';
    item.addEventListener(eventType, () => {
      StorageHelper.setState(item);
    });
  }
}