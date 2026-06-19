import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { RootState } from '@/redux/store';
import { revalidateLogic, useField, useForm } from '@tanstack/react-form';
import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import z from 'zod';
import { setPageContolValue } from '../store/page-control';

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { error: 'First name is required with at least 2 characters' }),
  lastName: z
    .string()
    .min(2, { error: 'Last name is required with at least 2 characters' }),
  otherNames: z.string().optional(),
  country: z.string().min(2, { error: 'Please select a valid country' }),
  documentType: z.string().min(2, { error: 'Please select a valid document' }),
  documentNumber: z.string().min(10, { error: 'Invalid number' }),
});

type formSchemaType = z.infer<typeof formSchema>;

const Identity = (props: {
  onHandleOpenBottomSheet: (sheet: 'country' | 'document') => void;
}) => {
  const { onHandleOpenBottomSheet } = props;

  const dispatch = useDispatch();
  const document = useSelector(
    (state: RootState) => state.documentControl.value,
  );
  const countryName = useSelector(
    (state: RootState) => state.countryControl.value,
  );
  const firstNameInputRef = useRef<TextInput>(null);
  const lastNameInputRef = useRef<TextInput>(null);
  const otherNamesInputRef = useRef<TextInput>(null);
  const documentNumberInputRef = useRef<TextInput>(null);

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      otherNames: '',
      country: '',
      documentType: '',
      documentNumber: '',
    } as formSchemaType,
    validationLogic: revalidateLogic(),
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      dispatch(setPageContolValue(3));
    },
  });

  const countryValue = useField({
    name: 'country',
    form,
  });
  const documentValue = useField({
    name: 'documentType',
    form,
  });

  useEffect(() => {
    countryValue.setValue(countryName);
  }, [countryName]);

  useEffect(() => {
    documentValue.setValue(document);
  }, [document]);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-14 pb-8"
      >
        <View className="gap-5">
          <Pressable onPress={() => firstNameInputRef.current?.focus()}>
            <form.Field name="firstName">
              {field => (
                <View className="gap-2">
                  <View className="flex-row items-center justify-between rounded-xl bg-background-tertiary px-5 py-4">
                    <TextCustom className="w-full max-w-40 leading-[130%] text-custom-text-tertiary">
                      First name
                    </TextCustom>
                    <TextInput
                      ref={firstNameInputRef}
                      autoCapitalize={'words'}
                      autoCorrect={false}
                      onBlur={field.handleBlur}
                      textContentType={'givenName'}
                      autoComplete={'given-name'}
                      className="max-w-60 text-end text-custom-text-secondary"
                      value={field.state.value}
                      onChangeText={text => field.handleChange(text)}
                    />
                  </View>
                  {field.state.meta.errors.length > 0 && (
                    <TextCustom className="text-xs/[130%] text-red-600">
                      {field.state.meta.errors.map(e => e?.message).join(', ')}
                    </TextCustom>
                  )}
                </View>
              )}
            </form.Field>
          </Pressable>
          <Pressable onPress={() => lastNameInputRef.current?.focus()}>
            <form.Field name="lastName">
              {field => (
                <View className="gap-2">
                  <View className="flex-row items-center justify-between rounded-xl bg-background-tertiary px-5 py-4">
                    <TextCustom className="w-full max-w-40 leading-[130%] text-custom-text-tertiary">
                      Last name
                    </TextCustom>
                    <TextInput
                      ref={lastNameInputRef}
                      autoCapitalize={'words'}
                      autoCorrect={false}
                      onBlur={field.handleBlur}
                      textContentType={'givenName'}
                      autoComplete={'given-name'}
                      className="max-w-60 text-end text-custom-text-secondary"
                      value={field.state.value}
                      onChangeText={text => field.handleChange(text)}
                    />
                  </View>
                  {field.state.meta.errors.length > 0 && (
                    <TextCustom className="text-xs/[130%] text-red-600">
                      {field.state.meta.errors.map(e => e?.message).join(', ')}
                    </TextCustom>
                  )}
                </View>
              )}
            </form.Field>
          </Pressable>
          <Pressable onPress={() => otherNamesInputRef.current?.focus()}>
            <form.Field name="otherNames">
              {field => (
                <View className="gap-2">
                  <View className="flex-row items-center justify-between rounded-xl bg-background-tertiary px-5 py-4">
                    <TextCustom className="w-full max-w-40 leading-[130%] text-custom-text-tertiary">
                      Other names{' '}
                      <TextCustom className="text-xs text-custom-text-tertiary">
                        (Optional)
                      </TextCustom>
                    </TextCustom>
                    <TextInput
                      ref={otherNamesInputRef}
                      autoCapitalize={'words'}
                      autoCorrect={false}
                      onBlur={field.handleBlur}
                      textContentType={'givenName'}
                      autoComplete={'given-name'}
                      className="max-w-60 text-end text-custom-text-secondary"
                      value={field.state.value}
                      onChangeText={text => field.handleChange(text)}
                    />
                  </View>
                  {field.state.meta.errors.length > 0 && (
                    <TextCustom className="text-xs/[130%] text-red-600">
                      {field.state.meta.errors.map(e => e?.message).join(', ')}
                    </TextCustom>
                  )}
                </View>
              )}
            </form.Field>
          </Pressable>
          <Pressable onPress={() => onHandleOpenBottomSheet('country')}>
            <form.Field name="country">
              {field => (
                <View className="gap-2">
                  <View className="android:py-6 flex-row items-center justify-between rounded-xl bg-background-tertiary px-5 py-4">
                    <TextCustom className="w-full max-w-40 leading-[130%] text-custom-text-tertiary">
                      Country
                    </TextCustom>
                    <TextCustom className="text-custom-text-secondary">
                      {field.state.value}
                    </TextCustom>
                  </View>
                  {field.state.meta.errors.length > 0 && (
                    <TextCustom className="text-xs/[130%] text-red-600">
                      {field.state.meta.errors.map(e => e?.message).join(', ')}
                    </TextCustom>
                  )}
                </View>
              )}
            </form.Field>
          </Pressable>
          <Pressable onPress={() => onHandleOpenBottomSheet('document')}>
            <form.Field name="documentType">
              {field => (
                <View className="gap-2">
                  <View className="android:py-6 flex-row items-center justify-between rounded-xl bg-background-tertiary px-5 py-4">
                    <TextCustom className="w-full max-w-40 leading-[130%] text-custom-text-tertiary">
                      Document type
                    </TextCustom>

                    <TextCustom className="text-custom-text-secondary">
                      {field.state.value === 'drivers_license'
                        ? 'Drivers License'
                        : field.state.value === 'passport'
                          ? 'Passport'
                          : 'National ID'}
                    </TextCustom>
                  </View>
                  {field.state.meta.errors.length > 0 && (
                    <TextCustom className="text-xs/[130%] text-red-600">
                      {field.state.meta.errors.map(e => e?.message).join(', ')}
                    </TextCustom>
                  )}
                </View>
              )}
            </form.Field>
          </Pressable>
          <Pressable onPress={() => documentNumberInputRef.current?.focus()}>
            <form.Field name="documentNumber">
              {field => (
                <View className="gap-2">
                  <View className="flex-row items-center justify-between rounded-xl bg-background-tertiary px-5 py-4">
                    <TextCustom className="w-full max-w-40 leading-[130%] text-custom-text-tertiary">
                      Document Number
                    </TextCustom>
                    <TextInput
                      ref={documentNumberInputRef}
                      autoCapitalize={'words'}
                      autoCorrect={false}
                      textContentType={'givenName'}
                      onBlur={field.handleBlur}
                      autoComplete={'given-name'}
                      className="max-w-60 text-end text-custom-text-secondary"
                      value={field.state.value}
                      onChangeText={text => field.handleChange(text)}
                    />
                  </View>
                  {field.state.meta.errors.length > 0 && (
                    <TextCustom className="text-xs/[130%] text-red-600">
                      {field.state.meta.errors.map(e => e?.message).join(', ')}
                    </TextCustom>
                  )}
                </View>
              )}
            </form.Field>
          </Pressable>
        </View>
        <View className="flex-row gap-[14px] rounded-2xl bg-background-tertiary px-3 py-6">
          <View className="size-7 items-center justify-center rounded-full bg-warning-4/35">
            <TextCustom className="font-nm-bold leading-[130%] text-warning-4">
              !
            </TextCustom>
          </View>
          <TextCustom className="text-sm/[130%] text-custom-text-tertiary">
            Mismatched details can delay approval or require resubmission.
          </TextCustom>
        </View>
      </ScrollView>
      <View className="gap-4">
        <Button label={'Continue'} onPress={form._handleSubmit} />
        <TextCustom className="text-center text-[10px]/[130%] text-custom-text-tertiary" />
      </View>
    </>
  );
};

export default Identity;
