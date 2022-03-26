import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from "react-native";
import { useState, useEffect } from "react";

export default function CoinDetailsViewComponent({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState([]);

  useEffect(() => fetchCoinData(), []);

  const url = "https://api.coingecko.com/api/v3/coins/" + route.params.id;

  const fetchCoinData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setIsLoading(false);
        console.log(responseJson.description?.en);
        setCoinData(responseJson);
      });
  };

  const CoinsDetailsView = () => {
    return isLoading ? null : (
      <View>
        <View style={styles.coinDetailsContainer}>
          <Image
            style={styles.imageView}
            source={{ uri: coinData?.image?.large }}
          ></Image>

          <View
            style={{ borderWidth: 1, borderColor: "red", borderStyle: "solid" }}
          >
            <Text>Name: {coinData.name}</Text>
            <Text>Symbol: {coinData.symbol}</Text>
            <Text>Hashing Algorithm: {coinData.hashing_algorithm}</Text>
          </View>
        </View>

        <View style={styles.coinDescriptionContainer}>
          <Text>Description:</Text>
          <ScrollView style={styles.coinDescription}>
            <Text>{coinData.description?.en}</Text>
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.coinDetailsWrapper}>
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          style={styles.activityIndicator}
        ></ActivityIndicator>
      ) : null}

      <CoinsDetailsView />
    </View>
  );
}

const styles = StyleSheet.create({
  coinDetailsWrapper: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "blue"
  },
  coinDetailsContainer: {
    flex: 0.1,
    height: 200,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    backgroundColor: "white",
    color: 'white'
  },
  coinDescriptionContainer: {
    flex: 0.8,
    flexGrow: 1,
    backgroundColor: "green"
  },
});
