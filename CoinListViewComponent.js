import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";

import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Api from "./helpers/Api";

export default function CoinListViewComponent({ navigation }) {
  const currency = "€";
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const flatlistRef = useRef();

  const api = new Api();

  useEffect(() => fetchData(), []);

  // let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`;

  const fetchData = () => {
    api
      .getMarkets({ vs_currency: "EUR", per_page: 10, page: page })
      .then((responseJson) => {
        console.log(responseJson.data);

        if (responseJson?.data) {
          setIsLoading(false);

          setDataSource((oldData) => [...oldData, ...responseJson.data]);
          // setDataSource(responseJson.data);
          setPage(page + 1);
          console.log(page);
        }
      });

    // fetch(url)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setIsLoading(false);
    //     console.log(url);
    //     // setDataSource(responseJson);
    //     setDataSource((oldData) => [...oldData, ...responseJson]);
    //     setPage(page + 1);

    //     let index = dataSource.length ? dataSource.length - 14 : 0;

    //     console.log("dataSource" + dataSource.length);
    //     console.log("index" + index);

    //     if (index > 0) {

    //       // flatlistRef.current.scrollToIndex({animated: true, index: index})
    //     }

    //     console.log(page);
    //   });
  };

  const test = () => {
    console.log("end reached");
  };

  const showItemDetails = (item) => {
    console.log(item.name);
    navigation.navigate("ManjuMental", { id: item.id });
  };

  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => showItemDetails(item)}>
        <View style={styles.itemWrapper}>
          <View style={styles.imageContainer}>
            <ImageView url={item.image}></ImageView>
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{item.symbol}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.itemName}>
              Current: {currency}
              {item.current_price}
            </Text>
            <View style={styles.lowHighContainer}>
              <Text>
                Low: {currency}
                {item.low_24h}
              </Text>

              <Text>
                High: {currency}
                {item.high_24h}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparator = () => {
    return <View style={styles.itemSeparator}></View>;
  };

  const ImageView = ({ url }) => {
    return <Image style={styles.imageView} source={{ uri: url }}></Image>;
  };

  const CoinsListView = () => {
    return isLoading ? null : (
      <FlatList
        ref={flatlistRef}
        initialScrollIndex="0"
        keyExtractor={(item, index) => index.toString()}
        data={dataSource}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={ItemView}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
      />
    );
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          style={styles.activityIndicator}
        ></ActivityIndicator>
      ) : null}
      {/* <Text>{JSON.stringify(test)}</Text> */}
      <CoinsListView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "green",
    borderWidth: 0,
    borderStyle: "solid",
    margin: 20,
    flex: 1,
    // backgroundColor: "#fff",
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
