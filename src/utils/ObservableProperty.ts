import { makeAutoObservable } from "mobx";

class ObservableProperty<t> {
  public value?: t;

  public setValue = (value: t) => {
    this.value = value;
  };

  constructor(value?: t) {
    this.value = value;

    makeAutoObservable(this);
  }
}

export default ObservableProperty;
