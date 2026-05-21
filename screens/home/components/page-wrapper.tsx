import { View } from 'react-native';

const PageWrapper = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return <View className="flex-1 bg-background">{children}</View>;
};

export default PageWrapper;
