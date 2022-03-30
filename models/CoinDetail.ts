export class CoinDetail {
    constructor(
        public id: string,
        public name: string,
        public symbol: string,
        public image: string,

        public hashing_algorithm: string,
        public genesis_date: string,
        public homepage: string,
        public market_cap: number,

        public description: string,
    ) {}
}