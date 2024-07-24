import { useEffect } from "react";
import { Text } from 'react-native';
import { useNavigation } from "expo-router";

import BaseLayout from "../components/BaseLayout";
import NoteList from "../components/NoteList";

export default function Index() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({headerShown: false});
  }, []);

  return (
    <BaseLayout>
      <Text>This is the index page</Text>
      <NoteList />
    </BaseLayout>
  );
}