import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { InputField } from "../../components/InputField";
import { CustomButton } from "../../components/CustomButton";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    // 這裡之後會加入 Firebase 重設密碼邏輯
    console.log("重設密碼:", email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        請輸入您的電子郵件地址，我們將發送重設密碼的連結給您。
      </Text>

      <InputField
        label="電子郵件"
        value={email}
        onChangeText={setEmail}
        placeholder="請輸入電子郵件"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <CustomButton
        title="發送重設密碼連結"
        onPress={handleResetPassword}
        variant="primary"
        style={styles.button}
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
  description: {
    marginBottom: 24,
    color: "#666",
    lineHeight: 20,
  },
  button: {
    marginTop: 24,
  },
}); 