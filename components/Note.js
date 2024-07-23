import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router';

export default function Note() {
  return (
    <Pressable onPress={() => {router.push('note');} }>
      <View style={styles.note}>
        <Text>Note</Text>
      </View>
    </Pressable>
  )
}

styles = StyleSheet.create({
  note: {
    backgroundColor: '#E0E0E0',
    padding: 10,
  }
});