import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { router, Stack, useLocalSearchParams } from 'expo-router';

import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid'
import { Entypo, FontAwesome6 } from '@expo/vector-icons';

import BaseLayout from '../components/BaseLayout'

import { getData, storeData } from '../hooks/useAsyncData';
import { sanitizeNoteData } from '../hooks/useSanitizeNoteData';


export default function createNote() {
  const rawNoteData = useLocalSearchParams();
  const [noteData, setNoteData] = useState(null);

  const [noteId, setNoteId] = useState(null);
  const [title, setTitle] = useState('');
  const [creationDate, setCreationDate] = useState(null);
  const [modificationDate, setModificationDate] = useState(null);
  const [content, setContent] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [droptdownItems, setDroptdownItems] = useState([
    {label: 'Important', value: 1, icon: () => <Entypo name="dot-single" size={24} color="red" />},
    {label: 'Normal', value: 2, icon: () => <Entypo name="dot-single" size={24} color="orange" />},
    {label: 'Reminder', value: 3, icon: () => <Entypo name="dot-single" size={24} color="grey" />}
  ]);

  // We don't check content, because the user is allowed to create a note without content
  const dataToCheck = [title, selectedPriority];

  const isValidData = (itemToCheck) => {
    if (itemToCheck === null || itemToCheck === '') {
      return false;
    } else {
      return true;
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  };

  const handleNoteCreation = async () => {
    for(let item of dataToCheck) {
      if (!isValidData(item) || isNaN(selectedPriority)) {
        return;
      }
    };

    const newNoteData = {
      id: noteId,
      title: title,
      creationDate: creationDate,
      modificationDate: modificationDate,
      content: content,
      priority: selectedPriority,
    };

    getData('myNotesData')
    .then((data) => {
      if(noteData) {
        // Editing existing note
        data.splice(data.findIndex(note => note.id === noteId), 1, newNoteData);
      } else {
        // Adding new note to the data
        data.push(newNoteData);
      }
      storeData('myNotesData', data);
    })
    .then(() => {
      router.navigate({name: 'index'});
    })
    .catch((e) => {
      alert("Error saving note");
    });
  };

  const fillNoteDataIfCreating = async () => {
    try {
      setNoteId(uuid.v4());
      setCreationDate(getCurrentDate());
    } catch(e) {
      alert("Error generating note data");
    };
  }

  const fillNoteDataIfEditing = async () => {
    try {
      const sanitizedData = sanitizeNoteData(rawNoteData);
      setNoteData(sanitizedData);
      setNoteId(sanitizedData.id);
      setTitle(sanitizedData.title);
      setCreationDate(sanitizedData.creationDate);
      setModificationDate(getCurrentDate());
      setSelectedPriority(sanitizedData.priority);
      setContent(sanitizedData.content);
    } catch(e) {
      alert("Error fetching note data");
    };
  };

  useEffect(() => {
    if (rawNoteData && Object.keys(rawNoteData).length > 0) {
      fillNoteDataIfEditing();
    } else {
      fillNoteDataIfCreating();
    }
  }, []);

  return (
    <BaseLayout>
      <Stack.Screen
        options={{ title:"",
        headerRight: () => (
          <Pressable onPress={() => handleNoteCreation()}>
            <FontAwesome6
            name="check"
            size={24}
            color="black" />
          </Pressable>),
      }} />
      <View>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput style={styles.simpleTextInput} onChangeText={title => setTitle(title)} value={title}/>
      </View>
      <Text style={styles.inputLabel}>Priority</Text>
      <DropDownPicker
        style={styles.dropdownSelect}
        dropDownContainerStyle={{borderColor: '#E0E0E0',}}
        open={dropdownOpen}
        value={selectedPriority}
        items={droptdownItems}
        setOpen={setDropdownOpen}
        setValue={setSelectedPriority}
        setItems={setDroptdownItems}
        listMode="SCROLLVIEW"
      />
      <View>
        <Text style={styles.inputLabel}>Content</Text>
        <TextInput style={styles.textAreaInput} multiline = {true} numberOfLines={10} onChangeText={content => setContent(content)} value={content}/>
      </View>
    </BaseLayout>
  )
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 22,
    marginBottom: 10,
  },
  simpleTextInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  dropdownSelect: {
    backgroundColor: "#fff",
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  textAreaInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    height:400,
  },
});