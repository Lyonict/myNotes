import { View, Text, StyleSheet } from 'react-native'

import { Entypo } from '@expo/vector-icons';

export default function PriorityIndicator({ priority }) {

  const priorityData = [
    {priority: 1, name: 'Important', color: 'red'},
    {priority: 2, name: 'Normal', color: 'orange'},
    {priority: 3, name: 'Reminder', color: 'grey'},
  ]

  const matchingPriority = priorityData.find((item) => item.priority === priority);

  return (
    matchingPriority &&
      <View style={styles.priorityContainer}>
        <Entypo name="dot-single" style={styles.priorityDot} size={24} color={matchingPriority.color} />
        <Text style={styles.priorityText}>{matchingPriority.name}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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