import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import Tab1Navigator from "./Tab1Navigator";
import Tab2Navigator from "./Tab2Navigator";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: "white"}}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#5856D6",
        tabBarLabelStyle: {marginBottom: 10},
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "rgba(255,255,255, 0.9)",
          elevation: 0,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        component={Tab1Navigator}
        name="MainHome"
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({color}) => <Icon color={color} name="list-outline" size={25} />,
        }}
      />
      <Tab.Screen
        component={Tab2Navigator}
        name="MainSearch"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({color}) => <Icon color={color} name="search-outline" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
