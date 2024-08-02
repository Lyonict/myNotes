import { Link, Stack } from "expo-router";

import Feather from '@expo/vector-icons/Feather';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
      name="index"
      options={{ title: "",
      headerRight: () => (
        <Link href="createNote">
        <Feather
          name="edit"
          size={24}
        />
        </Link>
       )}}/>
    </Stack>
  );
}