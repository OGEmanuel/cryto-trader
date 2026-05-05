import EyeNoSlash from '@/assets/icons/eye-no-slash.svg';
import EyeSlash from '@/assets/icons/eye-slash.svg';
import { Colors } from '@/constants/theme';
import { useFieldContext, useFormContext } from '@/hooks/form-contexts';
import { cn } from '@/lib/utils';
import { useStore } from '@tanstack/react-form';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import Button from './ui/button';
import TextCustom from './ui/text';

export function SubscribeButton({
  label,
  className,
  isPending,
  onPress,
}: {
  label: string;
  className?: string;
  isPending?: boolean;
  onPress: () => void;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button
          onPress={onPress}
          label={isPending || isSubmitting ? 'Submitting...' : label}
          className={cn('w-full', className)}
        />
      )}
    </form.Subscribe>
  );
}

const ErrorMessages = ({
  errors,
}: {
  errors: Array<string | { message: string }>;
}) => {
  return (
    <>
      {errors.map(error => (
        <TextCustom
          key={typeof error === 'string' ? error : error.message}
          className="text-sm text-red-500"
        >
          {typeof error === 'string' ? error : error.message}
        </TextCustom>
      ))}
    </>
  );
};

type TextFieldProps = {
  inputProps?: TextInputProps;
  inputLabel?: string;
  onPress?: () => void;
  onPasswordViewToggle?: () => void;
  buttonLabel?: string;
};

export const TextField = (props: TextFieldProps) => {
  const { inputProps, inputLabel, onPress, buttonLabel, onPasswordViewToggle } =
    props;
  const field = useFieldContext<string>();
  const errors = useStore(field.store, state => state.meta.errors);

  return (
    <View className="gap-3">
      {(inputLabel || (onPress && buttonLabel)) && (
        <View className="flex-row items-center justify-between">
          {inputLabel && (
            <TextCustom className="text-custom-text-2 text-sm/[100%]">
              {inputLabel}
            </TextCustom>
          )}
          {buttonLabel && (
            <Pressable onPress={onPress} className="active:opacity-75">
              <TextCustom className="text-sm/[100%] leading-[100%] text-primary">
                {buttonLabel}
              </TextCustom>
            </Pressable>
          )}
        </View>
      )}
      <View className="gap-1">
        <View className="relative">
          <TextInput
            className={cn(
              'text-sm/-[100%] h-[3.375rem] rounded-[12px] bg-background-2 px-5 text-white placeholder:font-nm',
              inputProps?.className,
            )}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChangeText={field.handleChange}
            placeholderTextColor={Colors.light.secondary}
            {...inputProps}
          />
          {onPasswordViewToggle && (
            <Pressable
              onPress={onPasswordViewToggle}
              className="absolute right-[6px] top-1 size-11 items-center justify-center active:opacity-75"
            >
              {inputProps?.secureTextEntry ? <EyeSlash /> : <EyeNoSlash />}
            </Pressable>
          )}
        </View>
        {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
      </View>
    </View>
  );
};
