import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            contentFit="contain"
          />

          <Image
            source={images.cards}
            style={{
              minWidth: 380,
              width: "100%",
              height: 300,
            }}
            contentFit="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white  text-center font-pbold">
              Discover a World Without Limits with{" "}
              <Text className="text-secondary-200"> AiRa </Text>
            </Text>

            <Image
              source={images.path}
              style={{
                width: 136,
                height: 15,
              }}
              className="absolute -bottom-2 -right-7"
              contentFit="contain"
            />
          </View>

          <Text className="font-pregular text-sm text-gray-100 mt-7 text-center">
            Embark on Boundless Adventures: Creativity and Innovation Together
            with AiRa
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
            textStyles={undefined}
            isLoading={undefined}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
