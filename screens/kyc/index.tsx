import RevampedWrapper from '@/components/revamped-wrapper';
import { Colors } from '@/constants/theme';
import { RootState } from '@/redux/store';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Approved from './approved';
import Attention from './attention';
import ProgressIndicator from './components/progress-indicator';
import Identity from './identity';
import Documents from './identity/documents';
import WorldCountries from './identity/world-countries';
import Limits from './limits';
import Review from './review';
import Selfie from './selfie';
import Start from './start';
import { setPageContolValue } from './store/page-control';
import Submission from './submission';
import UploadDocs from './upload-docs';

const HEADERS = [
  {
    id: 0,
    title: 'Verify to unlock limits',
    description:
      'Complete identity verification from inside the app before high-value trading or withdrawals.',
  },
  {
    id: 1,
    title: 'Account limits',
    description:
      'Your verification level controls trade, withdrawal, and sandbox deposit access.',
  },
  {
    id: 2,
    title: 'Identity details',
    description: 'Enter details exactly as they appear on your document.',
  },
  {
    id: 3,
    title: 'Upload document',
    description:
      'Use a clear photo. All corners should be visible and text readable.',
  },
  {
    id: 4,
    title: 'Selfie check',
    description:
      'Take a clear selfie so compliance can compare your face with your document.',
  },
  {
    id: 5,
    title: 'Review submission',
    description:
      'Check the details and files before sending them for admin review.',
  },
  {
    id: 6,
    title: 'Review in progress',
    description: 'Your identity submission has been sent for manual review.',
  },
  {
    id: 7,
    title: 'Verification approved',
    description: 'Your account limits have been upgraded.',
  },
  {
    id: 8,
    title: 'Review needs attention',
    description: 'Compliance could not approve your submission yet.',
  },
];

const KycScreen = () => {
  const page = useSelector((state: RootState) => state.pageControl.value);
  const [sheetSelector, setSheetSelector] = useState<'country' | 'document'>(
    'country',
  );
  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();

  const handleOpenSheet = (sheet: 'country' | 'document') => {
    bottomSheetRef.current?.expand();
    setSheetSelector(sheet);
  };

  const handleSwitchPages = () => {
    dispatch(setPageContolValue(page - 1));
  };

  return (
    <>
      <RevampedWrapper
        header={HEADERS[page].title}
        description={HEADERS[page].description}
        goBackTo={page < 1 && page < 6 ? '/home' : undefined}
        onGoBackTo={page > 0 && page < 6 ? handleSwitchPages : undefined}
      >
        <KeyboardAvoidingView behavior={'padding'} className="flex-1">
          <View className="android:pb-7 flex-1 pt-7">
            <ProgressIndicator />
            <View className="flex-1 justify-between pt-7">
              {page === 0 && <Start />}
              {page === 1 && <Limits />}
              {page === 2 && (
                <Identity onHandleOpenBottomSheet={handleOpenSheet} />
              )}
              {page === 3 && <UploadDocs />}
              {page === 4 && <Selfie />}
              {page === 5 && <Submission />}
              {page === 6 && <Review />}
              {page === 7 && <Approved />}
              {page === 8 && <Attention />}
            </View>
          </View>
        </KeyboardAvoidingView>
      </RevampedWrapper>
      <BottomSheet
        snapPoints={['70%']}
        ref={bottomSheetRef}
        enablePanDownToClose
        enableDynamicSizing={false}
        index={-1}
        backgroundStyle={{
          backgroundColor: Colors.light['background-tertiary'],
        }}
        handleIndicatorStyle={{
          backgroundColor: Colors.light['custom-text-secondary'],
        }}
        containerStyle={{
          zIndex: 20,
        }}
      >
        <BottomSheetView className="h-full flex-grow bg-background-tertiary p-6">
          {sheetSelector === 'country' && (
            <WorldCountries onHandleCloseBottomSheet={handleClosePress} />
          )}
          {sheetSelector === 'document' && (
            <Documents onHandleCloseBottomSheet={handleClosePress} />
          )}
        </BottomSheetView>
      </BottomSheet>
    </>
  );
};

export default KycScreen;
