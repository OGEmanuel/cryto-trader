import TextCustom from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { cn } from '@/lib/utils';
import { Pressable, View } from 'react-native';
import { IconActionType } from '../constants/types';

const splitTwoWords = (str: string) => {
  const words = str.trim().split(/\s+/);

  if (words.length !== 2) return null;

  return {
    first: words[0],
    second: words[1],
  };
};

const PressableIconLabel = (props: {
  className: string;
  action: IconActionType;
  children?: React.ReactNode;
  onPress?: () => void;
  isMoreThanOneWord?: () => boolean;
}) => {
  const { className, action, children, onPress, isMoreThanOneWord } = props;

  return (
    <Pressable
      key={action.id}
      onPress={onPress}
      className={cn(
        'flex-1 items-center gap-[10px] pt-5 active:opacity-75',
        className,
      )}
    >
      {children ??
        action.icon({
          style: {
            shadowColor: Colors.light.primary,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 8,
            elevation: 5,
          },
        })}
      {isMoreThanOneWord?.() ? (
        <View>
          <TextCustom className="text-center text-xs/[100%] text-custom-text">
            {splitTwoWords(action.name)?.first}
          </TextCustom>
          <TextCustom className="text-center text-xs/[100%] text-custom-text">
            {splitTwoWords(action.name)?.second}
          </TextCustom>
        </View>
      ) : (
        <TextCustom className="text-xs/[100%] text-custom-text">
          {action.name}
        </TextCustom>
      )}
    </Pressable>
  );
};

export default PressableIconLabel;
