import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

import BaseLayout from "../components/BaseLayout";
import NoteList from "../components/NoteList";

let fakeNotesData = [
  {
    id: 1,
    title: "Note 1",
    creationDate: "2021-01-01",
    modificationDate: null,
    content: "This is the note content",
    priority: 1,
  },
  {
    id: 2,
    title: "Note 2",
    creationDate: "2021-01-02",
    modificationDate: null,
    content: "This is the note content",
    priority: 2,
  },
  {
    id: 3,
    title: "Note 3",
    creationDate: "2021-01-03",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 4,
    title: "Note 4",
    creationDate: "2021-01-04",
    modificationDate: null,
    content: "This is the note content",
    priority: 2,
  }
]

const addPhantomItems = (list) => {
  if (list.length % 3 === 0) {
    return list;
  } else {
    const phantomItems = Array.from({ length: 3 - (list.length % 3) }).map(() => ("spacing data"));
    return list.concat(phantomItems);
  }
}

fakeNotesData = addPhantomItems(fakeNotesData);

export default function Index() {
  const navigation = useNavigation();

  const [importantNotes, setImportantNotes] = useState([]);
  const [normalNotes, setNormalNotes] = useState([]);
  const [reminderNotes, setReminderNotes] = useState([]);

  const sortNotes = (notes) => {
    const importantNotes = notes.filter(note => note.priority === 1);
    const normalNotes = notes.filter(note => note.priority === 2);
    const reminderNotes = notes.filter(note => note.priority === 3);

    setImportantNotes(importantNotes);
    setNormalNotes(normalNotes);
    setReminderNotes(reminderNotes);
  };

  useEffect(() => {
    navigation.setOptions({headerShown: false});
    sortNotes(fakeNotesData);
  }, []);

  return (
    <BaseLayout>
      <NoteList notesData={importantNotes} />
    </BaseLayout>
  );
}