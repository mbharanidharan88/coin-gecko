import * as axios from "axios";
import CoinDetailAdapter from "../adapters/CoinDetailAdapter";
import CoinMarketAdapter from "../adapters/CoinMarketAdapter";


export default class Api {

    constructor() {
        this.coinMarketAdapter = new CoinMarketAdapter();
        this.coinDetailAdapter = new CoinDetailAdapter();
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
            .then(response => response.data.map(item => this.coinMarketAdapter.adapt(item)))
            .catch(function (error) {
                console.error(error);
            });
    }

    getCoinDetail = async (coin_id) => {

        console.log(coin_id);

        return await this.client.get('/coins/' + coin_id)
            .then(response => 
                {
                    console.log('tsdfdfsdf');
                    console.log(response);
                    
                    return this.coinDetailAdapter.adapt(response.data)
                })
        .catch(function (error) {
            console.error(error);
        });

    }
}