import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "./DashboardScreen";
import AuthRequirer from "../containers/AuthRequirer";

const MainStack = createNativeStackNavigator();

const MainScreenStack = () => {
  return (
    <AuthRequirer>
      <MainStack.Navigator>
        <MainStack.Screen name="Dashboard" component={Dashboard} />
      </MainStack.Navigator>
    </AuthRequirer>
  );
};

export default MainScreenStack;
