import RevampedWrapper from '@/components/revamped-wrapper';
import { useGetQuoteDetailsQuery } from '@/services/trade';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import ErrorState from '../../components/error';
import Expired from './expired';
import Preview from './preview';

const QuoteScreen = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [isExpired, setIsExpired] = useState(false);

  const { data, isError, refetch } = useGetQuoteDetailsQuery({
    quoteId: params.id,
  });

  if (isError) {
    return <ErrorState message="Error fetching quote" refetch={refetch} />;
  }

  return (
    <RevampedWrapper
      header={data?.data.isExpired ? 'Quote expired' : 'Quote preview'}
      description={
        isExpired
          ? 'Rates moved. Request a fresh quote before trading.'
          : 'Confirm the rate before this quote expires.'
      }
      goBackTo={'/home/trades/buy'}
    >
      {isExpired ? (
        <Expired id={params.id} onSetIsExpired={setIsExpired} />
      ) : (
        <Preview id={params.id} onSetIsExpired={setIsExpired} />
      )}
    </RevampedWrapper>
  );
};

export default QuoteScreen;
