import TextCustom from '@/components/ui/text';
import { RootState } from '@/redux/store';
import { useKycSubmitMutation } from '@/services/auth';
import { useGetCurrentProfileQuery } from '@/services/profile';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import ChecklistItemCard from '../components/checklist-item-card';
import Cta from '../components/cta';
import { setPageContolValue } from '../store/page-control';

const Submission = () => {
  const dispatch = useDispatch();
  const details = useSelector(
    (state: RootState) => state.kycDetailsControl.value,
  );
  const { refetch } = useGetCurrentProfileQuery({});

  const [submit, { isLoading }] = useKycSubmitMutation();
  const handleSubmit = async (values: {
    legalName: string;
    country: string;
    documentType: string;
    documentNumber: string;
    selfieImageUrl: string;
    documentImageUrl: string;
    documentBackImageUrl: string;
  }) => {
    try {
      await submit(values).unwrap();
      refetch();
      dispatch(setPageContolValue(6));
    } catch (err: any) {
      const message = err?.data?.error.message || 'Something went wrong';

      Toast.show({
        type: 'error',
        text1: 'Request Failed!',
        text2: message,
      });
    }
  };

  return (
    <>
      <View className="gap-9">
        <View className="gap-[14px]">
          <ChecklistItemCard title="Legal name" status={details.legalName!!} />
          <ChecklistItemCard title="Country" status={details.country!!} />
          <ChecklistItemCard
            title="Document"
            status={
              details.documentType === 'drivers_license'
                ? 'Drivers License'
                : details.documentType === 'passport'
                  ? 'Passport'
                  : 'National ID'
            }
          />
          <ChecklistItemCard
            title="Document image"
            status={
              details.documentImageUrl?.trim() !== ''
                ? 'Uploaded'
                : 'Not Uploaded'
            }
          />
          <ChecklistItemCard
            title="Selfie image"
            status={
              details.selfieImageUrl?.trim() !== ''
                ? 'Uploaded'
                : 'Not Uploaded'
            }
          />
        </View>
        <View className="rounded-2xl bg-background-tertiary p-5">
          <TextCustom className="text-custom-text-tertiary">
            After submission your status changes to pending and trade/withdraw
            remain locked until approved.
          </TextCustom>
        </View>
      </View>
      <Cta
        label={'Submit for review'}
        isLoading={isLoading}
        onPress={() =>
          handleSubmit({
            country: details.country,
            documentBackImageUrl: details.documentBackImageUrl ?? '',
            documentImageUrl: details.documentImageUrl,
            documentNumber: details.documentNumber,
            documentType: details.documentType,
            legalName: details.legalName,
            selfieImageUrl: details.selfieImageUrl,
          })
        }
      />
    </>
  );
};

export default Submission;
