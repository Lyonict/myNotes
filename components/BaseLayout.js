import { SafeAreaView, StyleSheet, ScrollView } from "react-native"

export default function BaseLayout({ children}) {
  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView style={styles.baseContainer}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    backgroundColor: '#D9D9D9',
  },
  baseContainer: {
    padding: 16,
    overflow: 'visible',
    backgroundColor: '#456990',
    height: '100%',
  },
});