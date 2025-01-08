import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const FormFields = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200  flex flex-row items-center"
        style={[
          isFocused && { borderColor: "#FF9C01" }, // Apply focus styles to parent
        ]}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base border-0"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFields;
