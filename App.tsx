import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import MainScreenStack from "./src/screens/MainScreenStack";
import UnauthenticatedScreenStack from "./src/screens/UnauthenticatedStack/UnauthenticatedScreenStack";

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen name="Home" component={MainScreenStack} />

            <RootStack.Screen
              name="Authenticate"
              component={UnauthenticatedScreenStack}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
