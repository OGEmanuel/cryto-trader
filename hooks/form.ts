import { SubscribeButton, TextField } from '@/components/form-components';
import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './form-contexts';

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
