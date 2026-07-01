import RevampedWrapper from '@/components/revamped-wrapper';
import Failed from './failed';
import Success from './success';

const StatusScreen = () => {
  const isFailed = true;

  return (
    <RevampedWrapper
      header={isFailed ? 'Trade failed' : 'Trade completed'}
      description={
        isFailed
          ? 'The trade could not be completed.'
          : 'Your sandbox trade has settled successfully.'
      }
    >
      {isFailed ? <Failed /> : <Success />}
    </RevampedWrapper>
  );
};

export default StatusScreen;
