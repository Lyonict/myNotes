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

export default function Index() {
  const navigation = useNavigation();

  const [importantNotes, setImportantNotes] = useState([]);
  const [normalNotes, setNormalNotes] = useState([]);
  const [reminderNotes, setReminderNotes] = useState([]);

  const importanceArray = [
    { title: "Important", priority: 1, setFunction:setImportantNotes },
    { title: "Normal", priority: 2, setFunction:setNormalNotes },
    { title: "Reminder", priority: 3, setFunction:setReminderNotes },
  ]

  const addPhantomItems = (list) => {
    if (list.length % 3 === 0) {
      return list;
    } else {
      const phantomItems = Array.from({ length: 3 - (list.length % 3) }).map(() => ("spacing data"));
      return list.concat(phantomItems);
    }
  }

  // We'll want to sort the notes by date later, so we do the legwork now
  const sortNotes = (notesToSort, priority, setFunction) => {
    let sortedNotes = notesToSort.filter(note => note.priority === priority);
    sortedNotes = addPhantomItems(sortedNotes);
    setFunction(sortedNotes);
  };

  useEffect(() => {
    navigation.setOptions({headerShown: false});
    for (let importanceCategory of importanceArray) {
      sortNotes(fakeNotesData, importanceCategory.priority, importanceCategory.setFunction);
    }
  }, []);

  return (
    <BaseLayout>
      <NoteList notesData={importantNotes} title="Important" />
      <NoteList notesData={normalNotes} title="Normal" />
      <NoteList notesData={reminderNotes} title="Reminder" />
    </BaseLayout>
  );
}