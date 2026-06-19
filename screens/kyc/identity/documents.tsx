import TextCustom from '@/components/ui/text';
import { RootState } from '@/redux/store';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentContolValue } from '../store/document-selector';

const Documents = (props: { onHandleCloseBottomSheet: () => void }) => {
  const { onHandleCloseBottomSheet } = props;

  const document = useSelector(
    (state: RootState) => state.documentControl.value,
  );
  const dispatch = useDispatch();

  const handleSelect = (doc: string) => {
    dispatch(setDocumentContolValue(doc));
    onHandleCloseBottomSheet();
  };

  return (
    <View className="gap-3">
      <Pressable
        onPress={() => handleSelect('national_id')}
        className="flex-row items-center justify-between gap-3 rounded-lg bg-secondary/20 p-4 active:opacity-75"
      >
        <TextCustom className="text-custom-text-2">National ID</TextCustom>
        {document === 'national_id' && (
          <TextCustom className="font-nm-bold text-lg/[130%] text-white">
            ✓
          </TextCustom>
        )}
      </Pressable>
      <Pressable
        onPress={() => handleSelect('passport')}
        className="flex-row items-center justify-between gap-3 rounded-lg bg-secondary/20 p-4 active:opacity-75"
      >
        <TextCustom className="text-custom-text-2">Passport</TextCustom>
        {document === 'passport' && (
          <TextCustom className="font-nm-bold text-lg/[130%] text-white">
            ✓
          </TextCustom>
        )}
      </Pressable>
      <Pressable
        onPress={() => handleSelect('drivers_license')}
        className="flex-row items-center justify-between gap-3 rounded-lg bg-secondary/20 p-4 active:opacity-75"
      >
        <TextCustom className="text-custom-text-2">Drivers License</TextCustom>
        {document === 'drivers_license' && (
          <TextCustom className="font-nm-bold text-lg/[130%] text-white">
            ✓
          </TextCustom>
        )}
      </Pressable>
    </View>
  );
};

export default Documents;
