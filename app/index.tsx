import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Home</Text>
      <Link href="/details">View details</Link>
      <Link href="/profile">View Profiles</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
