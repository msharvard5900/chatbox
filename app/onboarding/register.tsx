import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { InputField } from "../../components/InputField";
import { CustomButton } from "../../components/CustomButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("錯誤", "請填寫所有欄位");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("錯誤", "兩次輸入的密碼不一致");
      return;
    }

    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/home"); // 註冊成功後導航到首頁
    } catch (error: any) {
      let message = "註冊失敗";
      switch (error.code) {
        case "auth/email-already-in-use":
          message = "此電子郵件已被使用";
          break;
        case "auth/invalid-email":
          message = "無效的電子郵件格式";
          break;
        case "auth/weak-password":
          message = "密碼強度不足";
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
          value={email}
          onChangeText={setEmail}
          placeholder="請輸入電子郵件"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder="請輸入密碼"
          secureTextEntry
        />

        <InputField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="請再次輸入密碼"
          secureTextEntry
        />

        <CustomButton
          title={isLoading ? "註冊中..." : "註冊"}
          onPress={handleRegister}
          variant="primary"
          style={styles.button}
          disabled={isLoading}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>已經有帳號？</Text>
        <Link href="/onboarding/login" style={styles.footerLink}>
          立即登入
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
    gap: 16,
  },
  button: {
    marginTop: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  footerText: {
    color: "#666",
  },
  footerLink: {
    color: "#007AFF",
  },
}); 