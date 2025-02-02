import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>顯示設定</Text>
        <View style={styles.option}>
          <Text>深色模式</Text>
          <ThemeToggle />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>帳號設定</Text>
        <TouchableOpacity style={styles.button}>
          <Text>登出</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  button: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignItems: "center",
  },
}); 