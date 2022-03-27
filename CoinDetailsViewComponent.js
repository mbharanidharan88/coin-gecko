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
        <View style={styles.coinSummaryContainer}>
          <View style={styles.coinImageSection}>
            
            <Image
              style={styles.imageView}
              source={{ uri: coinData?.image?.large }}
            ></Image>
            <Text style={styles.coin_data_label}>
              <Text style={styles.coin_data_title}>Name:</Text> {coinData.name}
            </Text>
            <Text style={styles.coin_data_label}>
              <Text style={styles.coin_data_title}>Symbol:</Text>{" "}
              {coinData.symbol}
            </Text>
            
          </View>

          <View style={styles.coinDetailSection}>
            <Text style={styles.coin_data_label}>
              <Text style={styles.coin_data_title}>Hashing Algorithm:</Text>{" "}
              {coinData.hashing_algorithm}
            </Text>
            <Text style={styles.coin_data_label}>
              <Text style={styles.coin_data_title}>Genesis Date:</Text>{" "}
              {coinData.genesis_date}
            </Text>
            <Text style={styles.coin_data_label}>
              <Text style={styles.coin_data_title}>Home Page:</Text>{" "}
              {coinData.links?.homepage}
            </Text>
            <Text style={styles.coin_data_label}>
              <Text style={styles.coin_data_title}>Market Cap:</Text>{" "}
              {coinData.market_data?.market_cap?.eur}
            </Text>
          </View>
        </View>

        <View style={styles.coinDescriptionContainer}>
          <Text style={styles.coin_data_label}>
            <Text style={styles.coin_data_title}>Description:</Text>
          </Text>
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
    // backgroundColor: "blue",
  },
  coinSummaryContainer: {
    flex: 0.4,
    height: 200,
    flexDirection: "row",
    // backgroundColor: "yellow",
    color: "white",
  },

  coinImageSection: {
    flex: 0.3,
    // backgroundColor: "blue",
    justifyContent: "center",
    marginLeft: 5,
  },
  imageView: {
    margin: 10,
    width: 50,
    height: 50,
  },

  coinDetailSection: {
    flex: 0.7,
    // backgroundColor: "pink",
    justifyContent: "center",
    paddingLeft: 5,
  },

  coinDescriptionContainer: {
    flex: 0.6,
    flexGrow: 1,
    padding: 5,
    // backgroundColor: "green",
  },

  coin_data_label: {
    marginTop: 5,
    marginBottom: 5,
  },

  coin_data_title: {
    fontWeight: "bold",
  },
});
