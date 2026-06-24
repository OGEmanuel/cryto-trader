import { useGetCurrentProfileQuery } from '@/services/profile';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPageContolValue } from '../kyc/store/page-control';
import Header from './components/header';
import QuickActions from './quick-actions';
import QuickLinks from './quick-links';
import RecentCoin from './recent-coin';
import TopCoins from './top-coins';

const HomeScreen = () => {
  const { data } = useGetCurrentProfileQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data.kycStatus === 'pending') dispatch(setPageContolValue(6));
    if (data?.data.kycStatus === 'approved') dispatch(setPageContolValue(7));
    if (data?.data.kycStatus === 'rejected') dispatch(setPageContolValue(8));
  }, [data?.data.kycStatus]);

  return (
    <View className="flex-1">
      <Header />
      <QuickActions />
      <ScrollView>
        <View className="bg-white">
          <QuickLinks />
          <View className="gap-[1.875rem] pb-28 pt-7">
            <RecentCoin />
            <TopCoins />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
