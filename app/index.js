import { Text, SafeAreaView, Pressable } from 'react-native';

import Note from '../components/Note';

export default function Index() {
  return (
    <SafeAreaView>
      <Text>This is the index page</Text>
      <Note />
    </SafeAreaView>
  );
}