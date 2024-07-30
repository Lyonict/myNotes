import { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';
import { Entypo } from '@expo/vector-icons';

import BaseLayout from '../components/BaseLayout'


export default function createNote() {
  const [title, setTitle] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [droptdownItems, setDroptdownItems] = useState([
    {label: 'Important', value: 1, icon: () => <Entypo name="dot-single" size={24} color="red" />},
    {label: 'Normal', value: 2, icon: () => <Entypo name="dot-single" size={24} color="orange" />},
    {label: 'Reminder', value: 3, icon: () => <Entypo name="dot-single" size={24} color="grey" />}
  ]);
  const [content, setContent] = useState('');

  return (
    <BaseLayout>
      <View>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput style={styles.simpleTextInput} onChangeText={title => setTitle(title)} defaultValue={title}/>
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