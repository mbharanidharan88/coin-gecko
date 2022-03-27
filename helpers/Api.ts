import * as axios from "axios";
import CoinMarketAdapter from "../adapters/CoinMarketAdapter";


export default class Api {

    constructor() {
        this.base_url = "https://api.coingecko.com/api/v3";
        let headers = {
            Accept: "application/json",
          };
        this.client = axios.create({
            baseURL: this.base_url,
            headers: this.headers
        });
    }

    getMarkets = async (params) => {

        console.log(params);

        return await this.client.get('/coins/markets', {params:  params })
            .then(response => response.data.map(item => CoinMarketAdapter.adapt(item)))
            .catch(function (error) {
                console.error(error);
            });
    }
}