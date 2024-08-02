import { useFocusEffect } from "expo-router";
import { useState, useCallback, useEffect } from "react";

import BaseLayout from "../components/BaseLayout";
import NoteList from "../components/NoteList";

import { getData } from "../hooks/useAsyncData";

export default function Index() {
  const [notesData, setNotesData] = useState([]);
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

  const sortNotes = (notesToSort, priority, setFunction) => {
    let sortedNotes = notesToSort.filter(note => note.priority === priority);
    sortedNotes = addPhantomItems(sortedNotes);
    setFunction(sortedNotes);
  };

  const sortAllNotes = () => {
    for (let importanceCategory of importanceArray) {
      sortNotes(notesData, importanceCategory.priority, importanceCategory.setFunction);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getData("myNotesData")
      .then((data) => {
        setNotesData(data);
      })
      .catch((e) => {
        alert("Error fetching notes data");
      });
    }, [])
  );

  useEffect(() => {
    if (notesData.length > 0) {
      sortAllNotes();
    }
  }, [notesData]);

  return (
    <BaseLayout>
      <NoteList notesData={importantNotes} title="Important" />
      <NoteList notesData={normalNotes} title="Normal" />
      <NoteList notesData={reminderNotes} title="Reminder" />
    </BaseLayout>
  );
}