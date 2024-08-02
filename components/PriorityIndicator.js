import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native'

import { Entypo } from '@expo/vector-icons';
import { useEffect } from 'react';

export default function PriorityIndicator({ priority, isChip=false }) {
  const [matchingPriority, setMatchingPriority] = useState(null);

  const priorityData = [
    {priority: 1, name: 'Important', color: '#F45B69'},
    {priority: 2, name: 'Normal', color: '#FFD4CA'},
    {priority: 3, name: 'Reminder', color: '#114B5F'},
  ]

  useEffect(() => {
    const foundPriority = priorityData.find((item) => item.priority === priority);
    setMatchingPriority(foundPriority);
  }, [priority]);

  return (
    matchingPriority &&
      <View style={styles.priorityContainer(isChip)}>
        <Entypo name="dot-single" style={styles.priorityDot} size={24} color={matchingPriority.color} />
        <Text style={styles.priorityText}>{matchingPriority.name}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  priorityContainer: (isChip) => {
    const bgColor = isChip ? "white" : "transparent";
    const paddingX = isChip ? 10 : 0;
    const borderRadius = isChip ? 10 : 0;

    return {
      backgroundColor: bgColor,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: paddingX,
      borderRadius: borderRadius,
    }
  },
  priorityDot: {
    marginStart: -10,
    marginEnd: -3,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: 'light',
  }
});