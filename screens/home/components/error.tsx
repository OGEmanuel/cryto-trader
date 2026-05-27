import Button from '@/components/ui/button';
import TextCustom from '@/components/ui/text';
import { View } from 'react-native';

const ErrorState = (props: { refetch: () => void; message: string }) => {
  const { refetch, message } = props;
  return (
    <View className="items-center gap-5">
      <TextCustom className="font-nm-medium text-lg text-destructive">
        {message}
      </TextCustom>
      <Button
        onPress={() => refetch()}
        label="Refetch"
        className="bg-warning px-6"
      />
    </View>
  );
};

export default ErrorState;
