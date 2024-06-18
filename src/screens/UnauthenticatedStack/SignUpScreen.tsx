import { View, Text, Button } from "react-native";

import SignUpFormContainer from "../../containers/SignUpFormContainer";
import { useUnauthenticatedNavigation } from "../../navigation/useNavigation";
import SignUpProvider from "../../providers/SignUpProvider";

const SignUpScreen = () => {
  const nav = useUnauthenticatedNavigation();

  return (
    <SignUpProvider>
      <View testID="signup-screen">
        <Text>Sign Up Screen</Text>

        <SignUpFormContainer />

        <Text>Already have an account?</Text>

        <Button title="Sign In" onPress={() => nav.navigate("SignIn")} />
      </View>
    </SignUpProvider>
  );
};

export default SignUpScreen;
