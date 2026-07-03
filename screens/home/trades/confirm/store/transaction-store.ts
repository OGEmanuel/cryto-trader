import { ExecuteQuoteResponse } from '@/services/constants/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionControlState {
  value: ExecuteQuoteResponse;
}

const initialState: TransactionControlState = {
  value: {
    data: {
      transaction: {
        id: '',
        userId: '',
        type: 'buy',
        status: 'completed',
        fromAsset: '',
        toAsset: '',
        fromAmount: 0,
        toAmount: 0,
        feeAmount: 0,
        rate: 0,
        reference: '',
        note: '',
        createdAt: '',
        completedAt: null,
      },
      wallet: {
        id: '',
        userId: '',
        fiatCurrency: '',
        depositAddresses: [],
        balances: [],
      },
    },
  },
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionValue: (
      state,
      action: PayloadAction<ExecuteQuoteResponse>,
    ) => {
      state.value = action.payload;
    },
  },
});

export const { setTransactionValue } = transactionSlice.actions;
export default transactionSlice.reducer;
