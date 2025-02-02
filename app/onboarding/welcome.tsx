import { View, Text, StyleSheet, Image, Platform, SafeAreaView } from "react-native";
import { router } from "expo-router";
import { CustomButton } from "../../components/CustomButton";
import { useApp } from "../../contexts/AppContext";

export default function Welcome() {
  const { isDarkMode } = useApp();

  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode && styles.darkContainer
    ]}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/logo.gif")}
          style={styles.logo}
        />
        <Text style={[
          styles.title,
          isDarkMode && styles.darkText
        ]}>
          歡迎使用 ChatBox
        </Text>
        <Text style={[
          styles.subtitle,
          isDarkMode && styles.darkText
        ]}>
          您的智能聊天助手
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton 
          title="登入" 
          variant="primary" 
          onPress={() => router.push("/onboarding/login")}
          style={styles.button}
        />
        <View style={styles.buttonSpacing} />
        <CustomButton 
          title="註冊" 
          variant="secondary" 
          onPress={() => router.push("/onboarding/register")}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  darkContainer: {
    backgroundColor: "#121212",
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  darkText: {
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 50 : 20,
    width: "100%",
  },
  button: {
    width: "100%",
    minHeight: 48,
  },
  buttonSpacing: {
    height: 12,
  },
}); 