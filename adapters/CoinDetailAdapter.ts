import { CoinDetail } from "../models/CoinDetail";
import { Adapter } from "./Adapter";

export default class CoinDetailAdapter implements Adapter<CoinDetail>
{
    adapt(item: any): CoinDetail {

        console.log(item);

        return new CoinDetail(
            item.id,
            item.name,
            item.symbol,
            item.image, 

            item.hashing_algorithm,
            item.genesis_date,
            item.links?.homepage,

            item.market_data?.market_cap?.eur,

            item.description?.en
        );
    }
    
}