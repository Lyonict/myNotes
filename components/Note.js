import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router';

export default function Note({data}) {
  return (
    data === "spacing data" ? (
      <View style={styles.fakeNote}/>
     ) : (
    <Pressable style={styles.note} onPress={() => {router.push('note');} }>
      <View>
        <Text>{data.title}</Text>
        <Text>{data.creationDate}</Text>
        <Text>{data.priority}</Text>
      </View>
    </Pressable>
    )
  )
}

styles = StyleSheet.create({
  note: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 10,
    flex: 1,
    maxWidth: '33.3333%',
    marginBottom: 16,
  },
  fakeNote: {
    padding: 10,
    flex: 1,
  },
});