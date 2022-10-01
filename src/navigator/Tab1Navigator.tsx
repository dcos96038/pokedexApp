import {createStackNavigator} from "@react-navigation/stack";

import {SimplePokemon} from "../interfaces/pokemonInterface";
import HomeScreen from "../screens/HomeScreen";
import PokemonScreen from "../screens/PokemonScreen";

export type RootStackParams = {
  Home: undefined;
  Pokemon: {simplePokemon: SimplePokemon; color: string};
  Search: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const Tab1Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: "white"}}}>
      <Stack.Screen component={HomeScreen} name="Home" />
      <Stack.Screen component={PokemonScreen} name="Pokemon" />
    </Stack.Navigator>
  );
};

export default Tab1Navigator;
