import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Cta from '../components/cta';
import { setPageContolValue } from '../store/page-control';

const UploadDocs = () => {
  const dispatch = useDispatch();
  return (
    <>
      <View className="gap-8">
        <View className="flex-row gap-3">
          <DocCard docInfo="Front required" />
          <DocCard
            docInfo="Back optional"
            className="bg-background-tertiary"
            indicatorClassName="bg-background-3"
            infoClassName="text-custom-text-tertiary"
          />
          <DocCard
            docInfo="Passport page"
            className="bg-background-tertiary"
            indicatorClassName="bg-background-3"
            infoClassName="text-custom-text-tertiary"
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
      <Cta
        label={'Submit for review'}
        onPress={() => dispatch(setPageContolValue(6))}
      />
    </>
  );
};

export default UploadDocs;

const DocCard = (props: {
  indicatorClassName?: string;
  docInfo: string;
  infoClassName?: string;
  className?: string;
}) => {
  const { indicatorClassName, docInfo, infoClassName, className } = props;

  return (
    <View
      className={cn(
        'flex-1 items-center justify-center gap-4 rounded-[14px] bg-background-secondary py-6',
        className,
      )}
    >
      <View
        className={cn('size-8 rounded-full bg-primary-2', indicatorClassName)}
      ></View>
      <TextCustom
        className={cn('text-sm/[130%] text-custom-extra', infoClassName)}
      >
        {docInfo}
      </TextCustom>
    </View>
  );
};
