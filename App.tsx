import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";

import BottomTabs from "./src/navigator/TabsNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
