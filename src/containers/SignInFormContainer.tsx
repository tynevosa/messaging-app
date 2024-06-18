import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import SignInFormComponent from "../components/SignInFormComponent";
import { useRootNavigation } from "../navigation/useNavigation";
import { useSignIn } from "../providers/SignInProvider";

const SignInFormContainer = () => {
  const model = useSignIn();
  const nav = useRootNavigation();

  useEffect(() => {
    if (!model.authService.user) {
      return;
    }

    nav.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  }, [model.authService.user]);

  return (
    <>
      <SignInFormComponent
        email={model.email.value}
        password={model.password.value}
        setEmail={model.email.setValue}
        setPassword={model.password.setValue}
        onSubmit={model.signIn}
        loading={model.loading.value}
        errorMessage={model.signInError.value}
      />
    </>
  );
};

export default observer(SignInFormContainer);
