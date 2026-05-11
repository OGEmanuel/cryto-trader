import BitcoinLogoIcon from './assets/icons/bitcoin-logo.svg';
import ChainlinkLogoIcon from './assets/icons/chainlink-logo.svg';
import CoinList from './components/coin-list';

const COINS = [
  {
    id: 1,
    price: '40,059.83',
    coin: <BitcoinLogoIcon />,
    pair: 'BTC/BUSD',
    percentage: '+0.81%',
  },
  {
    id: 2,
    price: '2,059.83',
    coin: <ChainlinkLogoIcon />,
    pair: 'SOL/BUSD',
    percentage: '-0.81%',
  },
  {
    id: 3,
    price: '40,059.83',
    coin: <BitcoinLogoIcon />,
    pair: 'BTC/BUSD',
    percentage: '+0.81%',
  },
];

const RecentCoin = () => {
  return <CoinList header="Recent Coin" COINS={COINS} />;
};

export default RecentCoin;
