import { CoinMarket } from "../models/CoinMarket";
import { Adapter } from "./Adapter";

export default class CoinMarketAdapter implements Adapter<CoinMarket>
{
    adapt(item: any): CoinMarket {
        return new CoinMarket(
            item.id,
            item.name,
            item.symbol,
            item.image, 
            item.current_price,
            item.high_24h,
            item.low_24h
        );
    }
    
}