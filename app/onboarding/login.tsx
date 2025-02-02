import { useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { Link, router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { InputField } from "../../components/InputField";
import { CustomButton } from "../../components/CustomButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("錯誤", "請填寫所有欄位");
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/home");
    } catch (error: any) {
      let message = "登入失敗";
      switch (error.code) {
        case "auth/invalid-email":
          message = "無效的電子郵件格式";
          break;
        case "auth/user-not-found":
          message = "找不到此用戶";
          break;
        case "auth/wrong-password":
          message = "密碼錯誤";
          break;
      }
      Alert.alert("錯誤", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <InputField
          label="電子郵件"
          value={email}
          onChangeText={setEmail}
          placeholder="請輸入電子郵件"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <InputField
          label="密碼"
          value={password}
          onChangeText={setPassword}
          placeholder="請輸入密碼"
          secureTextEntry
        />

        <Link href="/onboarding/forgotPassword" style={styles.forgotPassword}>
          忘記密碼？
        </Link>

        <CustomButton
          title={isLoading ? "登入中..." : "登入"}
          onPress={handleLogin}
          variant="primary"
          style={styles.button}
          disabled={isLoading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>還沒有帳號？</Text>
        <Link href="/onboarding/register" style={styles.footerLink}>
          立即註冊
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  form: {
    flex: 1,
    gap: 20,
    paddingTop: 20,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#007AFF",
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    marginTop: 32,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
  },
  footerText: {
    color: "#666",
  },
  footerLink: {
    color: "#007AFF",
  },
}); 