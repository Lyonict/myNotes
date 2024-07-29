import { Link, Stack } from "expo-router";

import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

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
      <Stack.Screen
      name="note"
      options={{ title: "",
      headerRight: () => (
        <Feather
          name="edit"
          size={24}
        />),
      }} />
      <Stack.Screen
      name="createNote"
      options={{ title: "",
      headerRight: () => (
        <FontAwesome6
          name="check"
          size={24}
          color="black" />),
      }} />
    </Stack>
  );
}