import { SafeAreaView, View, StyleSheet } from "react-native"

export default function BaseLayout({ children}) {
  return (
    <SafeAreaView>
      <View style={styles.baseContainer}>
        {children}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  baseContainer: {
    padding: 16,
  },
});