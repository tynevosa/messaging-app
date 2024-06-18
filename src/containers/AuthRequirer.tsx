import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { View, Text } from "react-native";

import { useRootNavigation } from "../navigation/useNavigation";
import AuthenticationService from "../services/AuthenticationService";

interface Props {
  children: JSX.Element;
}

const AuthRequirer = ({ children }: Props) => {
  const navigation = useRootNavigation();
  const hasInitialized = AuthenticationService.hasInitialized;
  const isAuthenticated = AuthenticationService.isAuthenticated;

  useEffect(() => {
    if (!hasInitialized || isAuthenticated) {
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "Authenticate" }],
    });
  }, [hasInitialized, isAuthenticated]);

  if (!hasInitialized) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default observer(AuthRequirer);
