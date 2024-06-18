import { observer } from "mobx-react-lite";
import { View, Text, Button } from "react-native";

import EmailVerified from "../containers/EmailVerifiedStatusContainer";
import AuthenticationService from "../services/AuthenticationService";

const Dashboard = () => {
  const handleLogout = () => {
    AuthenticationService.logout();
  };

  return (
    <View testID="home-screen">
      <Text>Dashboard</Text>

      <Text>Welcome {AuthenticationService.user?.email}</Text>

      <EmailVerified />

      <Button
        testID="home-screen-logout-button"
        title="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

export default observer(Dashboard);
