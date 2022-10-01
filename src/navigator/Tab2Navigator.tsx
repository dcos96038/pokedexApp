import {createStackNavigator} from "@react-navigation/stack";

import PokemonScreen from "../screens/PokemonScreen";
import SearchScreen from "../screens/SearchScreen";

import {RootStackParams} from "./Tab1Navigator";

const Stack = createStackNavigator<RootStackParams>();

const Tab2Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: "white"}}}>
      <Stack.Screen component={SearchScreen} name="Search" />
      <Stack.Screen component={PokemonScreen} name="Pokemon" />
    </Stack.Navigator>
  );
};

export default Tab2Navigator;
