import EyeNoSlash from '@/assets/icons/eye-no-slash.svg';
import EyeSlash from '@/assets/icons/eye-slash.svg';
import { Colors } from '@/constants/theme';
import { useFieldContext, useFormContext } from '@/hooks/form-contexts';
import { cn } from '@/lib/utils';
import { useStore } from '@tanstack/react-form';
import { useRef, useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import Button from './ui/button';
import TextCustom from './ui/text';

export function SubscribeButton({
  label,
  className,
  isPending,
  onPress,
  disabled,
}: {
  label: string;
  className?: string;
  isPending?: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button
          onPress={onPress}
          isPending={isPending || isSubmitting}
          disabled={isPending || isSubmitting || disabled}
          label={label}
          className={cn('w-full', className)}
        />
      )}
    </form.Subscribe>
  );
}

const ErrorMessages = ({
  errors,
  className,
}: {
  errors: Array<string | { message: string }>;
  className?: string;
}) => {
  return (
    <>
      {errors.map(error => (
        <TextCustom
          key={typeof error === 'string' ? error : error.message}
          className={cn('text-sm text-red-500', className)}
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
  shouldHideError?: boolean;
};

export const TextField = (props: TextFieldProps) => {
  const {
    inputProps,
    inputLabel,
    onPress,
    buttonLabel,
    onPasswordViewToggle,
    shouldHideError,
  } = props;
  const field = useFieldContext<string>();
  const errors = useStore(field.store, state => state.meta.errors);

  return (
    <View className="gap-3">
      {(inputLabel || (onPress && buttonLabel)) && (
        <View className="flex-row items-center justify-between">
          {inputLabel && (
            <TextCustom className="text-sm/[100%] text-custom-text-2">
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
            onChangeText={inputProps?.onChangeText ?? field.handleChange}
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
        {field.state.meta.isTouched && !shouldHideError && (
          <ErrorMessages errors={errors} />
        )}
      </View>
    </View>
  );
};

export const OTPField = (props: { OTP_LENGTH?: number }) => {
  const { OTP_LENGTH = 6 } = props;
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const field = useFieldContext<string>();
  const errors = useStore(field.store, state => state.meta.errors);
  const code = field.state.value;

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= OTP_LENGTH) {
      field.handleChange(cleaned);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    field.handleBlur();
  };

  return (
    <View className="relative items-center gap-1">
      <Pressable onPress={() => inputRef.current?.focus()}>
        <TextInput
          ref={inputRef}
          value={field.state.value}
          onChangeText={handleChange}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          className="absolute opacity-0"
          textContentType="oneTimeCode"
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        <View className="flex-row gap-2">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => {
            const isActive = isFocused && index === code.length;

            return (
              <View
                key={index}
                className={cn(
                  'h-[3.375rem] w-[3.75rem] items-center justify-center rounded-[12px] border bg-background-2',
                  isActive ? 'border-secondary' : 'border-transparent',
                )}
              >
                <TextCustom className="font-nm-bold text-[2rem]/[46px] text-white">
                  {code[index] || ''}
                </TextCustom>
              </View>
            );
          })}
        </View>
      </Pressable>
      {field.state.meta.isTouched && <ErrorMessages errors={errors} />}
    </View>
  );
};
