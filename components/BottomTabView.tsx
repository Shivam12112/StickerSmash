import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import History from "./History";
import { Ionicons } from "@expo/vector-icons"; // or any icon library you prefer

const Tab = createBottomTabNavigator();

export default function BottomTabView() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "qr-code" : "qr-code-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#B0C4DE",
        tabBarShowLabel: false,
        tabBarStyle: { position: "absolute", backgroundColor: "#276974" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarHideOnKeyboard: true,
          title: null,
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#276974",
          },
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerShown: true,
          tabBarHideOnKeyboard: true,
          title: null,
          headerStyle: {
            backgroundColor: "#276974",
          },
        }}
      />
    </Tab.Navigator>
  );
}
