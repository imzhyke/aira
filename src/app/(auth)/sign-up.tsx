import { View, Text, ScrollView, TextInput } from "react-native";
import { Image } from "expo-image";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = useState<{
    userName: string;
    email: string;
    password: string;
  }>({
    userName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            contentFit="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white font-psemibold mt-10">
            Sign Up to AiRa
          </Text>
          <FormFields
            title="Username"
            value={form.userName}
            placeholder="Enter Username"
            handleChangeText={(e) => setForm({ ...form, userName: e })}
            otherStyles="mt-7"
            keyboardType="default"
          />

          <FormFields
            title="Email"
            value={form.email}
            placeholder="Enter Email"
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormFields
            title="Password"
            value={form.password}
            placeholder="Enter Password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="default"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles={undefined}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
