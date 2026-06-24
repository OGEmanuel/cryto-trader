import TextCustom from '@/components/ui/text';
import { RootState } from '@/redux/store';
import CheckCircle from '@/screens/kyc/selfie/assets/icons/check-circle.svg';
import { useKycUploadsMutation } from '@/services/auth';
import { PickedFile } from '@/services/constants/types';
import * as DocumentPicker from 'expo-document-picker';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import CircleIndicator from '../components/circle-indicator';
import Cta from '../components/cta';
import { setKycDetailsControlValue } from '../store/kyc-details';
import { setPageContolValue } from '../store/page-control';

const Selfie = () => {
  const dispatch = useDispatch();
  const details = useSelector(
    (state: RootState) => state.kycDetailsControl.value,
  );

  const [upload, { isLoading }] = useKycUploadsMutation();

  const handleUpload = async (values: {
    file: PickedFile;
    documentKind: 'selfie' | 'document_front' | 'document_back';
  }) => {
    try {
      const response = await upload(values).unwrap();

      dispatch(
        setKycDetailsControlValue({
          ...details,
          selfieImageUrl: response.data.publicUrl,
        }),
      );
      dispatch(setPageContolValue(5));
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Upload Failed!',
        text2: message,
      });
    }
  };

  const handlePick = async (
    view: 'selfie' | 'document_front' | 'document_back',
  ) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        handleUpload({
          file: result.assets[0],
          documentKind: view,
        });
      }
    } catch (error) {
      console.error('Document picker error:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to select document. Please try again',
      });
    }
  };

  return (
    <>
      <View className="gap-[6.4375rem]">
        <CircleIndicator text="Face match" />
        <View className="gap-4">
          <ChecklistCard label="Good lighting" />
          <ChecklistCard label="No sunglasses or masks" />
          <ChecklistCard label="Use your own document" />
        </View>
      </View>
      <Cta
        label="Upload selfie"
        isLoading={isLoading}
        onPress={() => handlePick('selfie')}
      />
    </>
  );
};

export default Selfie;

const ChecklistCard = (props: { label: string }) => {
  const { label } = props;

  return (
    <View className="flex-row items-center gap-3 rounded-xl bg-background-tertiary p-3">
      <CheckCircle />
      <TextCustom className="text-custom-extra">{label}</TextCustom>
    </View>
  );
};
