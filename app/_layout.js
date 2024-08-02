import { StyleSheet, Text } from "react-native";
import { Link, Stack } from "expo-router";

import Feather from '@expo/vector-icons/Feather';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerLeft: () => (
            <Text style={styles.headerTitle}>My Notes</Text>
          ),
          headerRight: () => (
            <Link href="createNote">
              <Feather
                name="edit"
                size={24}
              />
            </Link>
          )
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});