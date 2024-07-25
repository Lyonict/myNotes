import { SafeAreaView, StyleSheet, ScrollView } from "react-native"

export default function BaseLayout({ children}) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.baseContainer}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    padding: 16,
  },
});