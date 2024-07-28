import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

import BaseLayout from "../components/BaseLayout";
import NoteList from "../components/NoteList";

let fakeNotesData = [
  {
    id: 1,
    title: "Note 1 that keeps on going and going and going and going",
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
  },
  {
    id: 5,
    title: "Note 5",
    creationDate: "2021-01-05",
    modificationDate: null,
    content: "This is the note content",
    priority: 2,
  },
  {
    id: 6,
    title: "Note 6",
    creationDate: "2021-01-06",
    modificationDate: null,
    content: "This is the note content",
    priority: 2,
  },
  {
    id: 7,
    title: "Note 7",
    creationDate: "2021-01-07",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 8,
    title: "Note 8",
    creationDate: "2021-01-08",
    modificationDate: null,
    content: "This is the note content",
    priority: 1,
  },
  {
    id: 9,
    title: "Note 9",
    creationDate: "2021-01-09",
    modificationDate: null,
    content: "This is the note content",
    priority: 2,
  },
  {
    id: 10,
    title: "Note 10",
    creationDate: "2021-01-10",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 11,
    title: "Note 11",
    creationDate: "2021-01-11",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 12,
    title: "Note 12",
    creationDate: "2021-01-12",
    modificationDate: null,
    content: "This is the note content",
    priority: 1,
  },
  {
    id: 13,
    title: "Note 13",
    creationDate: "2021-01-13",
    modificationDate: null,
    content: "This is the note content",
    priority: 1,
  },
  {
    id: 14,
    title: "Note 14",
    creationDate: "2021-01-14",
    modificationDate: null,
    content: "This is the note content",
    priority: 2,
  },
  {
    id: 15,
    title: "Note 15",
    creationDate: "2021-01-15",
    modificationDate: null,
    content: "This is the note content",
    priority: 2,
  },
  {
    id: 16,
    title: "Note 16",
    creationDate: "2021-01-16",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 17,
    title: "Note 17",
    creationDate: "2021-01-17",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 18,
    title: "Note 18",
    creationDate: "2021-01-18",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 19,
    title: "Note 19",
    creationDate: "2021-01-19",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
  },
  {
    id: 20,
    title: "Note 20",
    creationDate: "2021-01-20",
    modificationDate: null,
    content: "This is the note content",
    priority: 3,
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