import { FlatList, View, Text, StyleSheet } from "react-native";

import Note from "./Note";

export default function NoteList({ notesData, title }) {

  return (
    notesData.length > 0 &&
      <View>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={notesData}
          numColumns={3}
          columnWrapperStyle={{gap: 16}}
          renderItem={({ item, index }) => <Note style={styles.note} data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  note: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    padding: 10,
    flex: 1,
    maxWidth: '33.3333%',
    marginBottom: 16,
  },
});