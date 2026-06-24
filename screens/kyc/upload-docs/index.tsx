import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { RootState } from '@/redux/store';
import { useKycUploadsMutation } from '@/services/auth';
import { PickedFile } from '@/services/constants/types';
import * as DocumentPicker from 'expo-document-picker';
import { ActivityIndicator, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import Cta from '../components/cta';
import { setKycDetailsControlValue } from '../store/kyc-details';
import { setPageContolValue } from '../store/page-control';

const UploadDocs = () => {
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

      if (values.documentKind === 'document_back') {
        dispatch(
          setKycDetailsControlValue({
            ...details,
            documentBackImageUrl: response.data.publicUrl,
          }),
        );
      } else {
        dispatch(
          setKycDetailsControlValue({
            ...details,
            documentImageUrl: response.data.publicUrl,
          }),
        );
      }

      Toast.show({
        type: 'success',
        text1: 'File uploaded successfully!',
      });
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

  const onGoToNextPage = () => {
    if (details.documentImageUrl?.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Select a kyc document before you proceed',
      });
    } else {
      dispatch(setPageContolValue(4));
    }
  };

  return (
    <>
      <View className="gap-8">
        <View className="flex-row gap-3">
          <DocCard
            docInfo="Front required"
            onPress={() => handlePick('document_front')}
            className={
              details.documentImageUrl !== ''
                ? 'bg-background-secondary'
                : 'bg-background-tertiary'
            }
            isLoading={isLoading}
          />
          <DocCard
            docInfo="Back optional"
            className={
              details.documentBackImageUrl !== ''
                ? 'bg-background-secondary'
                : 'bg-background-tertiary'
            }
            indicatorClassName="bg-background-3"
            infoClassName="text-custom-text-tertiary"
            onPress={() => handlePick('document_back')}
            isLoading={isLoading}
          />
          <DocCard
            docInfo="Passport page"
            className="bg-background-tertiary"
            indicatorClassName="bg-background-3"
            infoClassName="text-custom-text-tertiary"
            isLoading={isLoading}
            onPress={() => {
              (dispatch(
                setKycDetailsControlValue({...details, documentType: 'passport' }),
              ),
                handlePick('document_front'));
            }}
          />
        </View>
        <DocCard
          docInfo="Upload document front"
          className="flex-auto rounded-2xl bg-background-tertiary py-10"
          infoClassName="text-lg/[130%] font-nm-medium"
          indicatorClassName="bg-background-secondary size-[3.125rem]"
        />
        <View className="flex-row justify-between rounded-xl bg-background-tertiary px-4 pb-6 pt-3">
          <TextCustom className="text-custom-text-tertiary">
            Accepted files
          </TextCustom>
          <TextCustom className="font-nm-medium text-custom-text-secondary">
            JPG · PNG
          </TextCustom>
        </View>
      </View>
      <Cta label={'Upload and continue'} onPress={() => onGoToNextPage()} />
    </>
  );
};

export default UploadDocs;

const DocCard = (props: {
  indicatorClassName?: string;
  docInfo: string;
  infoClassName?: string;
  className?: string;
  onPress?: () => void;
  isLoading?: boolean;
}) => {
  const {
    indicatorClassName,
    docInfo,
    infoClassName,
    className,
    onPress,
    isLoading,
  } = props;

  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      className={cn(
        'flex-1 items-center justify-center gap-4 rounded-[14px] py-6 active:opacity-75',
        className,
      )}
    >
      <View
        className={cn('size-8 rounded-full bg-primary-2', indicatorClassName)}
      >
        {isLoading && <ActivityIndicator />}
      </View>
      <TextCustom
        className={cn('text-sm/[130%] text-custom-extra', infoClassName)}
      >
        {docInfo}
      </TextCustom>
    </Pressable>
  );
};
