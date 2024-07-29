import { useState, useEffect } from "react";
import { useNavigation } from "expo-router";

import BaseLayout from "../components/BaseLayout";
import NoteList from "../components/NoteList";

const fakeLocalData = require('../assets/fakedata.json');

export default function Index() {
  const navigation = useNavigation();

  const [fakeNotesData, setFakeNotesData] = useState([]);
  const [importantNotes, setImportantNotes] = useState([]);
  const [normalNotes, setNormalNotes] = useState([]);
  const [reminderNotes, setReminderNotes] = useState([]);
  const [notesAreSorted, setNotesAreSorted] = useState(false);

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

  const sortNotes = (notesToSort, priority, setFunction) => {
    let sortedNotes = notesToSort.filter(note => note.priority === priority);
    sortedNotes = addPhantomItems(sortedNotes);
    setFunction(sortedNotes);
  };

  const sortAllNotes = () => {
    for (let importanceCategory of importanceArray) {
      sortNotes(fakeNotesData, importanceCategory.priority, importanceCategory.setFunction);
    }
    setNotesAreSorted(true);
  };

  useEffect(() => {
    setFakeNotesData(fakeLocalData);
    sortAllNotes();
  }, [notesAreSorted]);

  return (
    <BaseLayout>
      <NoteList notesData={importantNotes} title="Important" />
      <NoteList notesData={normalNotes} title="Normal" />
      <NoteList notesData={reminderNotes} title="Reminder" />
    </BaseLayout>
  );
}