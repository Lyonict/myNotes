import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { Entypo } from '@expo/vector-icons';

import BaseLayout from "../components/BaseLayout";
import PriorityIndicator from "../components/PriorityIndicator";

import { getData, storeData } from '../hooks/useAsyncData';

import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Note() {
  const rawNoteData = useLocalSearchParams();

  const [noteData, setNoteData] = useState(null);

  const handleNoteDeletion = async () => {
    getData('myNotesData')
    .then((data) => {
      const updatedData = data.filter(note => note.id !== noteData.id);
      storeData('myNotesData', updatedData);
    })
    .then(() => {
      router.back();
    })
    .catch((e) => {
      alert("Error deleting note");
    });
  };

  useEffect(() => {
    setNoteData(sanitizeNoteData(rawNoteData));
  }, []);

  const sanitizeNoteData = (rawData) => {
    return {
      ...rawData,
      priority: Number(rawData.priority),
    };
  };

  return (
    <BaseLayout>
      {noteData &&
        <View>
          <View style={styles.noteHeader}>
            <View style={styles.noteAllInfoContainer}>
              <Text style={styles.noteTitle}>{noteData.title}</Text>
              <View style={styles.noteInfo}>
                <Text style={styles.noteInfoData}>{noteData.creationDate}</Text>
                {
                  noteData.modificationDate !== "null" &&
                  <View style={styles.rowCenter}>
                    <View style={styles.rowCenter}>
                      <Entypo name="dot-single" style={styles.modifiedDot} size={24} color="grey" />
                      <Text style={styles.noteInfoData}>modified</Text>
                    </View>
                    <Text style={styles.noteInfoData}>{noteData.modificationDate}</Text>
                  </View>
                }
                {
                  noteData.priority &&
                  <PriorityIndicator style={styles.noteInfoData} priority={noteData.priority} />
                }
              </View>
            </View>
            <View style={styles.deleteNoteBtnContainer}>
              <Pressable style={styles.deleteNoteBtn} onPress={() => handleNoteDeletion()}>
                <FontAwesome name="trash-o" size={24} color="black" />
            </Pressable>
            </View>
          </View>
          <View>
            <Text>
              {noteData.content}
            </Text>
          </View>
        </View>
      }
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
    marginBottom: 10,
  },
  noteAllInfoContainer: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  noteInfo: {
    display: 'inline-block',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteInfoData: {
    marginEnd: 5,
  },
  modifiedDot: {
    marginStart: -10,
    marginEnd: -3,
  },
  deleteNoteBtn: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F1F0F0',
    padding: 10,
    borderRadius: 5,
  },
});