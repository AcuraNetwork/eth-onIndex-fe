
import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'ONI-USDT LP',
    masterChefSymbol: '',
    visible: true,
    lpAddresses: {
      1: '0xC1A900Ae76dB21dC5aa8E418Ac0F4E888A4C7431',
      4: '0xC1A900Ae76dB21dC5aa8E418Ac0F4E888A4C7431',
      97: '',
      56: '',
    },
    tokenSymbol: 'ONI',
    tokenAddresses: {
      1: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      4: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      97: '',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAddresses: contracts.usdt,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'ETH-USDT LP',
    masterChefSymbol: '',
    visible: true,
    lpAddresses: {
      1: '0xC1A900Ae76dB21dC5aa8E418Ac0F4E888A4C7431',
      4: '',
      97: '',
      56: '',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      4: '',
      97: '',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAddresses: contracts.usdt,
  },
  {
    pid: 4,
    risk: 3,
    lpSymbol: 'ONI-ETH LP',
    masterChefSymbol: '',
    visible: true,
    lpAddresses: {
      1: '0xC1A900Ae76dB21dC5aa8E418Ac0F4E888A4C7431',
      4: '',
      97: '',
      56: '',
    },
    tokenSymbol: 'ONI',
    tokenAddresses: {
      1: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      4: '',
      97: '',
      56: '',
    },
    quoteTokenSymbol: QuoteToken.ETH,
    quoteTokenAddresses: contracts.weth,
  },
  // {
  //   pid: 2,
  //   risk: 5,
  //   isTokenOnly: true,
  //   lpSymbol: 'ONI',
  //   masterChefSymbol: '',
  //   visible: true,
  //   lpAddresses: {
  //     1: '0x862F11650D2C19C2D4768F6acD8212478FeE5472',
  //     4: '0x862F11650D2C19C2D4768F6acD8212478FeE5472',
  //     97: '0x862F11650D2C19C2D4768F6acD8212478FeE5472',
  //     56: '0x91F2DBfB001E1CF49243CE162BFDff644B0C1647', // TBAKE-BUSD LP
  //   },
  //   tokenSymbol: 'ONI',
  //   tokenAddresses: {
  //     1: '0xE5104E44ddAb73075Fe22F71CAad2584cF7a6D56',
  //     4: '0xE5104E44ddAb73075Fe22F71CAad2584cF7a6D56',
  //     97: '0xE5104E44ddAb73075Fe22F71CAad2584cF7a6D56',
  //     56: '0x26d6e280f9687c463420908740ae59f712419147',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAddresses: contracts.busd,
  // },
  // {
  //   pid: 4,
  //   risk: 1,
  //   isTokenOnly: true,
  //   lpSymbol: 'WBNB',
  //   lpAddresses: {
  //     97: '0x575Cb459b6E6B8187d3Ef9a25105D64011874820',
  //     56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', // BNB-BUSD LP (BUSD-BUSD will ignore)
  //   },
  //   tokenSymbol: 'WBNB',
  //   tokenAddresses: {
  //     97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
  //     56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAddresses: contracts.busd,
  // },
  // {
  //   pid: 0,
  //   risk: 5,
  //   isTokenOnly: true,
  //   masterChefSymbol: 'PLOCK',
  //   lpSymbol: 'PLOCK',
  //   visible: true,
  //   lpAddresses: {
  //     97: '0x95D1304B0E3e3F40E684214fE47b1d013A8c8Ab5',
  //     56: '0x6C45C9D632c5f0867F2Baf830c6d34EA4C67158D', // PLOCK-BNB LP
  //   },
  //   tokenSymbol: 'PLOCK',
  //   tokenAddresses: {
  //     97: '0xE6B4D6B7adfa9F6916985842989f5654Fcc41Bd1',
  //     56: '0xce0f314013dc814f2da9d58160c54231fb2ddae2',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAddresses: contracts.wbnb,
  // },
  // {
  //   pid: 1,
  //   risk: 5,
  //   isTokenOnly: true,
  //   masterChefSymbol: 'PLOCK',
  //   lpSymbol: 'TBAKE',
  //   visible: true,
  //   lpAddresses: {
  //     97: '0x862F11650D2C19C2D4768F6acD8212478FeE5472',
  //     56: '0x91F2DBfB001E1CF49243CE162BFDff644B0C1647', // TBAKE-BUSD LP
  //   },
  //   tokenSymbol: 'TBAKE',
  //   tokenAddresses: {
  //     97: '0xE5104E44ddAb73075Fe22F71CAad2584cF7a6D56',
  //     56: '0x26d6e280f9687c463420908740ae59f712419147',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAddresses: contracts.busd,
  // },
  // {
  //   pid: 2,
  //   risk: 5,
  //   masterChefSymbol: 'PLOCK',
  //   lpSymbol: 'PLOCK-BNB LP',
  //   visible: false,
  //   lpAddresses: {
  //     97: '0x95D1304B0E3e3F40E684214fE47b1d013A8c8Ab5',
  //     56: '0x6C45C9D632c5f0867F2Baf830c6d34EA4C67158D', // PLOCK-BNB LP
  //   },
  //   tokenSymbol: 'PLOCK',
  //   tokenAddresses: {
  //     97: '0xE6B4D6B7adfa9F6916985842989f5654Fcc41Bd1',
  //     56: '0xce0f314013dc814f2da9d58160c54231fb2ddae2',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAddresses: contracts.wbnb,
  // },
]

export default farms
