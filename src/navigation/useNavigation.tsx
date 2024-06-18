import { NavigationProp, useNavigation } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Authenticate: undefined;
};

export const useRootNavigation = () => {
  return useNavigation<NavigationProp<RootStackParamList>>();
};

export type UnauthenticatedStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export const useUnauthenticatedNavigation = () => {
  return useNavigation<NavigationProp<UnauthenticatedStackParamList>>();
};
