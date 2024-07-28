import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Entypo } from '@expo/vector-icons';

import BaseLayout from "../components/BaseLayout";
import PriorityIndicator from "../components/PriorityIndicator";


export default function Note() {
  const rawNoteData = useLocalSearchParams();

  const [noteData, setNoteData] = useState(null);

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
  noteTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  noteInfo: {
    display: 'inline-block',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 5,
    marginBottom: 10,
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
});