import { View, Text, StyleSheet, Pressable } from 'react-native'
import { router } from 'expo-router';
import PriorityIndicator from './PriorityIndicator';

export default function Note({data}) {
  return (
    data === "spacing data" ? (
      <View style={styles.fakeNote}/>
     ) : (
    <Pressable style={styles.note} onPress={() => {router.push('note');} }>
      <Text style={styles.noteTitle} numberOfLines={3}>{data.title}</Text>
        <View style={styles.noteBottomInfo}>
          <Text style={styles.noteDate}>{data.creationDate}</Text>
          <PriorityIndicator priority={data.priority} />
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
    justifyContent: 'space-between',
    maxWidth: '33.3333%',
    marginBottom: 16,
  },
  fakeNote: {
    padding: 10,
    flex: 1,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  noteDate: {
    fontSize: 12,
    fontWeight: 'medium',
    marginTop: 8,
  },
});