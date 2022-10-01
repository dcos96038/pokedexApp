import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useEffect, useRef, useState} from "react";
import {View, Text, StyleSheet, Dimensions, Image, Animated} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import ImageColors from "react-native-image-colors";

import {useAnimation} from "../hooks/useAnimation";
import {SimplePokemon} from "../interfaces/pokemonInterface";
import {RootStackParams} from "../navigator/Tab1Navigator";

import {FadeInImage} from "./FadeImage";

interface Props {
  pokemon: SimplePokemon;
}

const windowWidth = Dimensions.get("window").width;

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParams, "Pokemon">;

const PokeCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState<string>("grey");
  const {opacity, fadeIn} = useAnimation();
  const isMounted = useRef(true);
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {fallback: "grey"}).then((colors) => {
      if (!isMounted) return;

      if (colors.platform === "android") {
        setBgColor(colors.dominant || "grey");
      }
      if (colors.platform === "ios") {
        setBgColor(colors.background);
      }
      fadeIn(300);
    });

    return () => {
      isMounted.current = false;
    };
  }, [fadeIn, pokemon.picture]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Pokemon", {simplePokemon: pokemon, color: bgColor})}
    >
      <Animated.View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
          opacity: opacity,
        }}
      >
        <View>
          <Text style={{...styles.name}}>
            {pokemon.name}
            {"\n#" + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image source={require("../assets/pokebola-blanca.png")} style={{...styles.pokebola}} />
        </View>

        <FadeInImage style={styles.pokemonImage} uri={pokemon.picture} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    // backgroundColor: "grey",
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    bottom: -20,
    right: -20,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: "absolute",
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: "hidden",
  },
});
