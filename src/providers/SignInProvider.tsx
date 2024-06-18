import { createContext, useContext, useMemo } from "react";

import AuthenticationService from "../services/AuthenticationService";
import SignInViewModel from "../viewmodels/SignInViewModel";

const SignInContext = createContext<SignInViewModel | undefined>(undefined);

export const useSignIn = () => {
  const context = useContext(SignInContext);

  if (context === undefined) {
    throw new Error("useSignIn must be used within a SignInProvider");
  }

  return context;
};

interface Props {
  children: React.ReactNode;
}

const SignInProvider = ({ children }: Props) => {
  const viewModel = useMemo(() => {
    return new SignInViewModel(AuthenticationService);
  }, []);

  return (
    <SignInContext.Provider value={viewModel}>
      {children}
    </SignInContext.Provider>
  );
};

export default SignInProvider;
