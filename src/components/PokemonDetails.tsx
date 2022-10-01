import React from "react";
import {StyleSheet, Text, View, ScrollView} from "react-native";
import * as Progress from "react-native-progress";

import {FullPokemonResponse} from "../interfaces/pokemonInterface";

import {FadeInImage} from "./FadeImage";

interface Props {
  pokemon: FullPokemonResponse;
  color: string;
}

const PokemonDetails = ({pokemon, color}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}
    >
      <View style={{height: 370}} />
      <View style={styles.container}>
        <Text style={styles.title}>Types</Text>

        <View style={{flexDirection: "row"}}>
          {pokemon.types.map(({type}) => (
            <Text key={type.name} style={{...styles.regularText, marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={{...styles.container}}>
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{pokemon.weight}KG</Text>
      </View>

      <View style={{...styles.container}}>
        <Text style={styles.title}>Sprites</Text>

        <View style={{flexDirection: "row", flex: 1}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.front_default} />
            <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.back_default} />
            <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.front_shiny} />
            <FadeInImage style={styles.basicSprite} uri={pokemon.sprites.back_shiny} />
          </ScrollView>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Skills</Text>

        <View style={{flexDirection: "row"}}>
          {pokemon.abilities.map(({ability}) => (
            <Text key={ability.name} style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Moves</Text>

        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
          {pokemon.moves.map(({move}) => (
            <Text key={move.name} style={{...styles.regularText, marginRight: 10}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>

        <View style={{}}>
          {pokemon.stats.map(({stat, base_stat}, i) => (
            <View
              key={stat.name + i}
              style={{
                flexDirection: "row",
                marginVertical: 15,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  width: 150,
                  textTransform: "uppercase",
                }}
              >
                {stat.name}
              </Text>
              <Progress.Bar
                useNativeDriver
                color={color}
                height={20}
                progress={base_stat / 100}
                width={150}
              />
              <Text
                style={{
                  ...styles.regularText,
                  marginLeft: 20,
                }}
              >
                {base_stat} Points
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    color: "black",
    fontSize: 22,
  },
  regularText: {
    fontSize: 20,
    color: "black",
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
