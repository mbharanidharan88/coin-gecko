import React from "react";

import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoinListViewComponent from "./CoinListViewComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import CoinDetailsViewComponent from "./CoinDetailsViewComponent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CoinList"
            component={CoinListViewComponent}
          ></Stack.Screen>

          <Stack.Screen
            name="CoinDetails"
            component={CoinDetailsViewComponent}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "green",
    borderWidth: 0,
    borderStyle: "solid",
    margin: 20,
    flex: 1,
    backgroundColor: "#ccc",
    // alignItems: "center",
    // justifyContent: "center",
  },
  activityIndicator: {
    color: "red",
    flex: 1,
    alignSelf: "center",
    borderColor: "green",
    borderWidth: 0,
    borderStyle: "solid",
  },
  itemWrapper: {
    borderColor: "red",
    borderWidth: 0,
    borderStyle: "solid",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  itemDetails: {
    flex: 1,
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 0,
    borderStyle: "solid",
    maxWidth: 100,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  lowHighContainer: {
    flex: 1,
    flexDirection: "column",
  },
  imageContainer: {},
  imageView: {
    margin: 15,
    width: 50,
    height: 50,
  },
  priceContainer: {
    borderColor: "pink",
    borderWidth: 0,
    borderStyle: "solid",
    alignSelf: "center",
  },

  itemSeparator: {
    borderColor: "#C8C8C8",
    borderWidth: 1,
    borderStyle: "solid",
    height: 0.5,
    width: "100%",
  },
});
