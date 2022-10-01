import {StackScreenProps} from "@react-navigation/stack";
import React from "react";
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import {FadeInImage} from "../components/FadeImage";
import PokemonDetails from "../components/PokemonDetails";
import usePokemon from "../hooks/usePokemon";
import {RootStackParams} from "../navigator/Tab1Navigator";

interface Props extends StackScreenProps<RootStackParams, "Pokemon"> {}

const PokemonScreen = ({route, navigation}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;

  const {isLoading, pokemon} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{...styles.backButton}}
          onPress={() => navigation.pop()}
        >
          <Icon color="white" name="arrow-back-outline" size={40} />
        </TouchableOpacity>

        <Text style={{...styles.pokemonName}}>
          {name + "\n"}#{id}
        </Text>

        <Image source={require("../assets/pokebola-blanca.png")} style={styles.pokebola} />
        <FadeInImage style={styles.pokemonImage} uri={picture} />
      </View>
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails color={color} pokemon={pokemon} />
      )}
    </View>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 999,
    height: 370,
    alignItems: "center",
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: "absolute",
    left: 20,
    marginTop: 10,
  },
  pokemonName: {
    color: "white",
    fontSize: 40,
    alignSelf: "flex-start",
    left: 20,
    top: 45,
  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -30,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: "absolute",
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
