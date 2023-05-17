import { StyleSheet, View } from "react-native";
import LoginScreen from "./src/pages/Login";
import ScanQr from "./src/pages/ScanQr";
import StandOrder from "./src/pages/StandOrder";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PublicRoute } from "./src/routes/routes";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={PublicRoute.login}>
        <Stack.Screen name={PublicRoute.login} component={LoginScreen} />
        <Stack.Screen name={PublicRoute.scanQr} component={ScanQr} />
        <Stack.Screen name={PublicRoute.standOrder} component={StandOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
