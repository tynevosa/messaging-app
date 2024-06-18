import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";

const UnauthenticatedStack = createNativeStackNavigator();

const UnauthenticatedScreenStack = () => {
  return (
    <UnauthenticatedStack.Navigator>
      <UnauthenticatedStack.Screen name="SignIn" component={SignInScreen} />

      <UnauthenticatedStack.Screen name="SignUp" component={SignUpScreen} />
    </UnauthenticatedStack.Navigator>
  );
};

export default UnauthenticatedScreenStack;
