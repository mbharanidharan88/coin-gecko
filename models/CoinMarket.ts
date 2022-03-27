export class CoinMarket {
    constructor(
        public id: string,
        public name: string,
        public symbol: string,
        public image: string,

        public current_price: number,
        public high_24h: number,
        public low_24h: number,
    ) {}
}