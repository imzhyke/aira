import { View, Text, Button } from "react-native";
import React from "react";
import { signOut } from "@/lib/appwrite";

const Profile = () => {
  return (
    <View className="mt-[40px]">
      <Button title="Sign Out" />
    </View>
  );
};

export default Profile;
