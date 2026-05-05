import TextCustom from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Pressable, View } from 'react-native';

const Tabs = (props: {
  page: number;
  authPages: Array<{ id: number; name: string }>;
  onGoToPage: (page: number) => void;
}) => {
  const { page, authPages, onGoToPage } = props;

  return (
    <View className="bg-background-2 flex-row rounded-2xl p-1">
      {authPages.map((pages, i) => (
        <Pressable
          key={pages.id}
          onPress={() => onGoToPage(i)}
          className={cn(
            'w-full flex-[50%] rounded-xl py-[10px]',
            page === i ? 'bg-background' : '',
          )}
        >
          <TextCustom
            className={cn(
              'text-center text-sm/[100%]',
              page === i ? 'text-custom-text' : 'text-secondary',
            )}
          >
            {pages.name}
          </TextCustom>
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;
