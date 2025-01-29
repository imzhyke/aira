import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyles = "", // Default empty string if not provided
  textStyles = "", // Default empty string if not provided
  isLoading = false, // Default false if not provided
}: {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center relative ${containerStyles}`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-xl ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="absolute inset-0" // Absolute positioning to overlap the text
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
