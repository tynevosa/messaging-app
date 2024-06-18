import { createContext, useContext, useMemo } from "react";

import AuthenticationService from "../services/AuthenticationService";
import SignUpViewModel from "../viewmodels/SignUpViewModel";

const SignUpContext = createContext<SignUpViewModel | undefined>(undefined);

export const useSignUp = () => {
  const context = useContext(SignUpContext);

  if (context === undefined) {
    throw new Error("useSignIn must be used within a SignInProvider");
  }

  return context;
};

interface Props {
  children: React.ReactNode;
}

const SignUpProvider = ({ children }: Props) => {
  const viewModel = useMemo(() => {
    return new SignUpViewModel(AuthenticationService);
  }, []);

  return (
    <SignUpContext.Provider value={viewModel}>
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
