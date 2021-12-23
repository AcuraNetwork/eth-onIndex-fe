import axios from 'axios';
import { DEX_API_BASE_URL } from 'config/constants/endpoints';
import { UNITOKEN } from '../../../../../constants';

const history = {};

export default {
    history,
    getBars: async (
		// mainStrategy,
		selectedCurrency,
        symbolInfo,
        resolution,
        from,
        to,
        bnbPriceUSD,
        jwtToken
    ) => {
        const tempLimit = (to-from)/(15*60)
        
        let window = 0;

        if (resolution === '1D') {
            window = 1440;
        } else {
            window = parseInt(resolution);
        }
        const offset = 1000; 
        let startDate = from * 1000;
        if (resolution === '1D') {
            startDate -= 86400000 * offset;
        } else {
            startDate -= parseInt(resolution) * 60 * 1000 * offset;
        }

        const address = selectedCurrency ? selectedCurrency.address : UNITOKEN;
        try {
            const result = await axios.get(`${DEX_API_BASE_URL}?until=${new Date(to * 1000).toISOString()}&window=${window}&limit=${Math.round(tempLimit)+50}&baseToken=${address}&quoteCurrency=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&network=ethereum&exchange=Uniswap`, {
                headers: {
                    token: jwtToken.jwtToken
                }
            });

            let lastClose = 0;
            let previousHighPrice =  Math.max(lastClose, result.data.dataOHLC.data.ethereum.dexTrades[0].maximum_price * bnbPriceUSD);
            let previousLowPrice =  Math.min(lastClose, result.data.dataOHLC.data.ethereum.dexTrades[0].minimum_price * bnbPriceUSD);

            const bars = result.data.dataOHLC.data.ethereum.dexTrades.map(el => {
                let currentHighPrice = Math.max(lastClose, el.maximum_price * bnbPriceUSD);
                const differencePercentage = (currentHighPrice - previousHighPrice) / previousHighPrice * 100;
                currentHighPrice = differencePercentage >= 25 ? 
                    Math.max(lastClose === 0 ? el.minimum_price * bnbPriceUSD : Math.min(lastClose, el.minimum_price * bnbPriceUSD),
                    lastClose === 0 ? parseFloat(el.open_price) * bnbPriceUSD : lastClose,
                    parseFloat(el.close_price) * bnbPriceUSD)
                    : currentHighPrice;

                let currentLowPrice = lastClose === 0 ? el.minimum_price * bnbPriceUSD : Math.min(lastClose, el.minimum_price * bnbPriceUSD);
                const differentLowPricePercentage = (previousLowPrice - currentLowPrice) / previousLowPrice * 100;
                currentLowPrice =  differentLowPricePercentage >= 25 ?
                    Math.min(currentHighPrice,
                        lastClose === 0 ? parseFloat(el.open_price) * bnbPriceUSD : lastClose,
                        parseFloat(el.close_price) * bnbPriceUSD)
                    : currentLowPrice;
                const bar = {
                    time: new Date(el.timeInterval.minute).getTime(),
                    low: currentLowPrice,
                    high: currentHighPrice,
                    close: lastClose === 0 ? parseFloat(el.open_price) * bnbPriceUSD : lastClose,
                    open: parseFloat(el.close_price) * bnbPriceUSD,
                    volume: el.quoteAmount
                }
                previousHighPrice = currentHighPrice;
                previousLowPrice = currentLowPrice;
                lastClose = parseFloat(el.close_price) * bnbPriceUSD;

                return bar;
            })
            // let lastClose = 0;
            // const bars = result.data.dataOHLC.data.ethereum.dexTrades.map(el => {
            //     const bar = {
            //         time: new Date(el.timeInterval.minute).getTime(),
            //         low: lastClose === 0 ? el.minimum_price * bnbPriceUSD : Math.min(lastClose, el.minimum_price * bnbPriceUSD),
            //         high: Math.max(lastClose, el.maximum_price * bnbPriceUSD),
            //         open: lastClose === 0 ? parseFloat(el.open_price) * bnbPriceUSD : lastClose,
            //         close: parseFloat(el.close_price) * bnbPriceUSD,
            //         volume: el.quoteAmount
            //     }

            //     lastClose = parseFloat(el.close_price) * bnbPriceUSD;

            //     return bar;
            // })

            // return bars;
            return bars.reverse();
        } catch (error) {
            console.log("get bars error ::", error);
            return [];
        }
    }
};
