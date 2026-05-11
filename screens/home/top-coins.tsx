import BitcoinLogoIcon from './assets/icons/bitcoin-logo.svg';
import MftLogoIcon from './assets/icons/mft-logo.svg';
import RenLogoIcon from './assets/icons/ren-logo.svg';

import CoinList from './components/coin-list';

const COINS = [
  {
    id: 1,
    price: '40,059.83',
    coin: <MftLogoIcon />,
    pair: 'MFT/BUSD',
    percentage: '+0.81%',
  },
  {
    id: 2,
    price: '2,059.83',
    coin: <RenLogoIcon />,
    pair: 'REN/BUSD',
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

const TopCoins = () => {
  return <CoinList header="Top Coins" COINS={COINS} />;
};

export default TopCoins;
