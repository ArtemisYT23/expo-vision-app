import { StyleSheet, View } from "react-native";
import LoginScreen from "./src/pages/Login";
import ScanQr from "./src/pages/ScanQr";
import StandList from "./src/pages/StandList";
import StandOrder from "./src/pages/StandOrder";
import MenuBeta from "./src/pages/MenuBeta";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PublicRoute } from "./src/routes/routes";
import { Provider } from "react-redux";
import store from "./src/redux";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store()}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={PublicRoute.login}>
           
          <Stack.Screen name={PublicRoute.login} component={LoginScreen} />

          <Stack.Screen name={PublicRoute.scanQr} component={ScanQr} />

          <Stack.Screen name={PublicRoute.standOrder} component={StandList} />
          
          <Stack.Screen name={PublicRoute.standItem} component={StandOrder} />

          <Stack.Screen name={PublicRoute.menuOptions} component={MenuBeta} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
