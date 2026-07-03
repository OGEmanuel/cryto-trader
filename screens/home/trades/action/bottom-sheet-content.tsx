import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { Asset } from '../../constants/types';
import { getSvgUri } from '../../lib/utils';

const BottomSheetContent = (props: {
  assets: Asset[];
  onSelectCoin: (value: string) => void;
  value: string;
  altValue: string;
}) => {
  const { assets, onSelectCoin, value, altValue } = props;
  const [query, setQuery] = useState('');
  const [assetList, setAssetList] = useState<Asset[]>(assets);

  const filteredAssets = assetList?.filter(asset =>
    [asset.name, asset.symbol].some(value =>
      value.trim().toLowerCase().includes(query),
    ),
  );

  useEffect(() => {
    if (query.trim() === '') {
      setAssetList(assets);
    } else {
      setAssetList(filteredAssets);
    }
  }, [assets, query]);

  const RenderAssets = (props: { asset: Asset }) => {
    const { asset } = props;

    if (asset.symbol === altValue) return null;

    return (
      <Pressable
        onPress={() => (onSelectCoin(asset.symbol), setQuery(''))}
        className="flex-row items-center justify-between rounded-2xl bg-secondary p-4 active:opacity-75"
      >
        <View className="size-6 rounded-full bg-transparent">
          <SvgUri width={24} height={24} uri={getSvgUri(asset.iconUrl)} />
        </View>
        <View className="flex-row items-center gap-2">
          <TextCustom className="font-nm-medium text-lg/[130%] text-custom-text-3">
            {asset.symbol}
          </TextCustom>
          {value === asset.symbol && (
            <TextCustom className="font-nm-bold text-lg/[130%] text-white">
              ✓
            </TextCustom>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View className="_pb-40 gap-6">
      <TextInput
        placeholder="Search"
        className="ios:py-4 w-full rounded-lg bg-background px-4 text-custom-text"
        placeholderTextColor="#9CA3AF"
        keyboardType="default"
        returnKeyType="search"
        enterKeyHint="search"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="off"
        clearButtonMode="while-editing" // iOS only
        textContentType="none"
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        data={assetList}
        renderItem={item => <RenderAssets asset={item.item} />}
        contentContainerClassName={cn('gap-3 pb-40')}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default BottomSheetContent;
