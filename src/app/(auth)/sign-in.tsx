import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

import FormFields from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { Link, router, useRouter } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const SignIn = () => {
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();
  const router = useRouter();

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Missing Fields",
        textBody: "Please fill in all required fields.",
      });

      return;
    }

    const trimmedEmail = form.email.trim();
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }

    // Assign the trimmed email back to the form state
    setForm((prevForm) => ({ ...prevForm, email: trimmedEmail }));

    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Logged in successfully!",
      });
      router.replace("/home");
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error Occurred",
        textBody: error.message,
      });
      Alert.alert("Error", error.message);
      console.log(form.email, form.password);
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
            Log In to AiRa
          </Text>

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
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
