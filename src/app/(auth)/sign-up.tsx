import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";

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

  const submit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
      return;
    }

    const trimmedEmail = form.email.trim();
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.userName, form.email, form.password);
      //set to global state...
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(form.userName, form.email, form.password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
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
            title="Sign Up"
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
