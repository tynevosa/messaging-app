import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import SignUpFormComponent from "../components/SignUpFormComponent";
import { useSignUp } from "../providers/SignUpProvider";

const SignUpFormContainer = () => {
  const model = useSignUp();

  const handleSubmit = () => {
    if (model.password.value !== model.confirmPassword.value) {
      model.signUpError.setValue("Passwords do not match");
      return;
    }

    model.signUp();
  };

  useEffect(() => {
    return model.breakdown;
  }, [model]);

  return (
    <SignUpFormComponent
      email={model.email.value}
      password={model.password.value}
      setEmail={model.email.setValue}
      setPassword={model.password.setValue}
      confirmPassword={model.confirmPassword.value}
      setConfirmPassword={model.confirmPassword.setValue}
      onSubmit={handleSubmit}
      loading={model.loading.value}
      errorMessage={model.signUpError.value}
    />
  );
};

export default observer(SignUpFormContainer);
