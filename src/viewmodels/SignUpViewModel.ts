import { makeAutoObservable, reaction } from "mobx";

import AuthenticationService from "../services/AuthenticationService";
import ObservableProperty from "../utils/ObservableProperty";

class SignUpViewModel {
  public email = new ObservableProperty<string>("");

  public password = new ObservableProperty<string>("");

  public confirmPassword = new ObservableProperty<string>("");

  public signUpError = new ObservableProperty<string>("");

  public loading = new ObservableProperty<boolean>(false);

  public signUp = async () => {
    const { email, password } = this;

    try {
      this.loading.setValue(true);

      await this.authService.signup(email.value, password.value);
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use": {
          this.signUpError.setValue("That email address is already in use!");
          break;
        }

        case "auth/invalid-email": {
          this.signUpError.setValue("That email address is invalid!");
          break;
        }

        case "auth/weak-password": {
          this.signUpError.setValue("That password is too weak!");
          break;
        }

        default: {
          console.log(error);
          this.signUpError.setValue("An error occurred. Please try again.");
        }
      }
    } finally {
      this.loading.setValue(false);
    }
  };

  private disposers: (() => void)[] = [];

  public breakdown = () => {
    this.disposers.forEach((dispose) => dispose());
  };

  constructor(public authService: typeof AuthenticationService) {
    makeAutoObservable(this);

    // Reset the error message when the user changes the email or password
    this.disposers.push(
      reaction(
        () => {
          return {
            email: this.email.value,
            password: this.password.value,
            confirmPassword: this.confirmPassword.value,
          };
        },
        () => {
          this.signUpError.setValue("");
        },
      ),
    );
  }
}

export default SignUpViewModel;
