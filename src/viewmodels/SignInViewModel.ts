import { makeAutoObservable } from "mobx";

import AuthenticationService from "../services/AuthenticationService";
import ObservableProperty from "../utils/ObservableProperty";

class SignInViewModel {
  public email: ObservableProperty<string> = new ObservableProperty<string>("");

  public password: ObservableProperty<string> = new ObservableProperty<string>(
    "",
  );

  public signInError = new ObservableProperty<string>("");

  public loading = new ObservableProperty<boolean>(false);

  public signIn = async () => {
    const { email, password } = this;

    try {
      this.loading.setValue(true);

      await this.authService.login(email.value, password.value);
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email": {
          this.signInError.setValue("Your email address is incorrect.");
          break;
        }

        case "auth/invalid-credential": {
          this.signInError.setValue("Your password is incorrect.");
          break;
        }

        default: {
          console.log(error);
          this.signInError.setValue("An error occurred. Please try again.");
        }
      }
    } finally {
      this.loading.setValue(false);
    }
  };

  constructor(public authService: typeof AuthenticationService) {
    makeAutoObservable(this);
  }
}

export default SignInViewModel;
