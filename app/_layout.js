import { Stack } from "expo-router";

import Feather from '@expo/vector-icons/Feather';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
      name="index"
      />
      <Stack.Screen
      name="note"
      options={{ title: "",
      headerRight: () => (
        <Feather
          name="edit"
          size={24}
        />),
      }} />
    </Stack>
  );
}