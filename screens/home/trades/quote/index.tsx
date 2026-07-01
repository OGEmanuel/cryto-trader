import RevampedWrapper from '@/components/revamped-wrapper';
import Expired from './expired';
import Preview from './preview';

const QuoteScreen = () => {
  const isExpired = true;

  return (
    <RevampedWrapper
      header={isExpired ? 'Quote expired' : 'Quote preview'}
      description={
        isExpired
          ? 'Rates moved. Request a fresh quote before trading.'
          : 'Confirm the rate before this quote expires.'
      }
      goBackTo={'/home/trades/buy'}
    >
      {isExpired ? <Expired /> : <Preview />}
    </RevampedWrapper>
  );
};

export default QuoteScreen;
