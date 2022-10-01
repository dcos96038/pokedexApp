import React, {useState} from "react";
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  View,
} from "react-native";

import {useAnimation} from "../hooks/useAnimation";

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style = {}}: Props) => {
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (err: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        ...(style as any),
      }}
    >
      {isLoading && <ActivityIndicator color="grey" size={30} style={{position: "absolute"}} />}

      <Animated.Image
        source={{uri}}
        style={{
          ...(style as any),
          opacity,
        }}
        onError={onError}
        onLoad={finishLoading}
      />
    </View>
  );
};
