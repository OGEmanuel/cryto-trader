import { ScrollView, View } from "react-native";
import SuccessSymbol from "../../components/success-symbol";
import TextCustom from "@/components/ui/text";
import ItemCard from "../../components/item-card";
import Button from "@/components/ui/button";

const Success = () => {
    return ( 
        <View className="flex-1 pt-10">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-[3.375rem] pb-40"
        >
          <View className="gap-7">
            <SuccessSymbol />
            <TextCustom className="text-center font-nm-bold text-[22px]/[130%] text-custom-text-secondary">
              0.00384 BTC received
            </TextCustom>
          </View>
          <View className="gap-2">
            <ItemCard name="Reference" value="CRT-BUY-1779" />
            <ItemCard name="Paid" value="250.00 USDT" />
            <ItemCard name="Received" value="0.00384 BTC" />
            <ItemCard name="Fee" value="2.50 USDT" />
            <ItemCard
              name="Status"
              value="Completed"
              className="text-primary-2"
            />
          </View>
          <Button label="View transaction" />
        </ScrollView>
      </View>
     );
}
 
export default Success;