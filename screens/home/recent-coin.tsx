import { useGetAssetsQuery } from '@/services/markets';
import CoinList from './components/coin-list';
import ErrorState from './components/error';
import HomeCoinSkeleton from './components/skeletons/home-coin';

const RecentCoin = () => {
  const { data, error, isLoading, refetch } = useGetAssetsQuery({});

  if (isLoading) return <HomeCoinSkeleton header="Recent Coin" />;

  if (error)
    return (
      <ErrorState message="Error fetching Recent coins" refetch={refetch} />
    );

  return <CoinList header="Recent Coin" COINS={data?.data!!} />;
};

export default RecentCoin;
