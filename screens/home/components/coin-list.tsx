import TextCustom from '@/components/ui/text';
import { FlatList, View } from 'react-native';
import { Asset, CoinListType } from '../constants/types';
import RenderCoin from './render-coin';

const CoinList = (props: { header: string; COINS: Array<Asset> }) => {
  const { header, COINS } = props;

  return (
    <View className="gap-4">
      <TextCustom className="pl-6 font-nm-bold text-lg/[100%] text-background">
        {header}
      </TextCustom>
      <FlatList
        data={COINS}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={item => <RenderCoin coinList={item.item} />}
        contentContainerClassName="px-6 gap-2 pb-6"
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default CoinList;
