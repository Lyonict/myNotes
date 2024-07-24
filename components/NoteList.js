import { FlatList } from "react-native";
import Note from "./Note";

export default function NoteList({ notesData }) {
  return (
    notesData.length > 0 &&
      <FlatList
        data={notesData}
        numColumns={3}
        columnWrapperStyle={{gap: 16}}
        renderItem={({ item, index }) => <Note style={styles.note} data={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
  )
}