import RevampedWrapper from '@/components/revamped-wrapper';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Failed from './failed';
import Success from './success';

const StatusScreen = () => {
  const details = useSelector(
    (state: RootState) => state.transactionControl.value,
  );

  const isFailed = details.data.transaction.status !== 'completed';

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
