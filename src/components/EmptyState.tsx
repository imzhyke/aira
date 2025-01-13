import { View, Text, Image, Button } from "react-native";
import React from "react";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="text-xl font-psemibold text-white">{subtitle}</Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
