import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useEffect, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import countries, { Countries, Country } from 'world-countries';
import { setCountryContolValue } from '../store/country-selector';

const WorldCountries = (props: { onHandleCloseBottomSheet: () => void }) => {
  const { onHandleCloseBottomSheet } = props;
  const [value, setValue] = useState('');
  const [countryList, setCountryList] = useState<Countries>(countries);

  const countryName = useSelector(
    (state: RootState) => state.countryControl.value,
  );
  const dispatch = useDispatch();

  const handleSelect = (country: string) => {
    dispatch(setCountryContolValue(country));
    setValue('');
    onHandleCloseBottomSheet();
  };

  const filteredSearch = countryList
    .map(country => country)
    .filter(list =>
      list.name.common.toLowerCase().includes(value.toLowerCase()),
    );

  useEffect(() => {
    if (value.trim() === '') {
      setCountryList(countries);
    } else {
      setCountryList(filteredSearch);
    }
  }, [value]);

  const RenderCountries = (props: { country: Country }) => {
    const { country } = props;

    return (
      <Pressable
        onPress={() => handleSelect(country.name.common)}
        className="flex-row items-center justify-between rounded-lg bg-secondary/20 p-4"
      >
        <View className="flex-row items-center gap-3">
          <TextCustom>{country.flag}</TextCustom>
          <TextCustom className="text-custom-text-2">
            {country.name.common}
          </TextCustom>
        </View>
        {countryName === country.name.common && (
          <TextCustom className="font-nm-bold text-lg/[130%] text-white">
            ✓
          </TextCustom>
        )}
      </Pressable>
    );
  };

  return (
    <View className="gap-6">
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
        value={value}
        onChangeText={text => setValue(text)}
      />
      <BottomSheetFlatList
        showsVerticalScrollIndicator={false}
        data={countryList}
        renderItem={item => <RenderCountries country={item.item} />}
        contentContainerClassName={cn('gap-3')}
        keyExtractor={item => item.name.common}
      />
    </View>
  );
};

export default WorldCountries;
