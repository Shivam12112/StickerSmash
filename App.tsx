// import LandingScreen from "./components/LandingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import BottomTabView from "./components/BottomTabView";
import History from "./components/History";
import { View } from "react-native";
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();
export default function App() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingScreen">
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,

              headerStyle: {
                backgroundColor: "#3A7072",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="BottomTabView"
            component={BottomTabView}
            options={{
              headerShown: false,
              headerStyle: {
                backgroundColor: "#3A7072",
              },
              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
    </View>
  );
}
