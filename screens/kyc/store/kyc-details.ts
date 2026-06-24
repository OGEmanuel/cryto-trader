import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KycSubmissionPayload {
  legalName: string;
  country: string;
  documentType: 'national_id' | 'passport' | 'drivers_license' | '';
  documentNumber: string;
  selfieImageUrl: string;
  documentImageUrl: string;
  documentBackImageUrl?: string;
}

interface KycDetailsControlState {
  value: KycSubmissionPayload;
}

const initialState: KycDetailsControlState = {
  value: {
    legalName: '',
    country: '',
    documentType: '',
    documentNumber: '',
    selfieImageUrl: '',
    documentImageUrl: '',
    documentBackImageUrl: '',
  },
};

const kycDetailsControlSlice = createSlice({
  name: 'kyc-details-control',
  initialState: initialState,
  reducers: {
    setKycDetailsControlValue: (
      state,
      action: PayloadAction<KycSubmissionPayload>,
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setKycDetailsControlValue } = kycDetailsControlSlice.actions;
export default kycDetailsControlSlice.reducer;
