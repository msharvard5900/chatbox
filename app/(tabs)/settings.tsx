import { View, Text, StyleSheet } from "react-native";
import { useApp } from "../../contexts/AppContext";
import { CustomButton } from "../../components/CustomButton";

export default function Settings() {
  const { signOut, theme, toggleTheme } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>一般設定</Text>
        <CustomButton
          title={`切換為${theme === "light" ? "深色" : "淺色"}主題`}
          onPress={toggleTheme}
          variant="secondary"
        />
      </View>

      <CustomButton
        title="登出"
        onPress={signOut}
        variant="primary"
        style={styles.signOutButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  signOutButton: {
    marginTop: "auto",
  },
}); 