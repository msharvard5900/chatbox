import { Stack } from "expo-router";
import { View, Platform } from "react-native";

export default function OnboardingLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#007AFF",
          headerBackTitle: Platform.OS === "ios" ? "返回" : undefined,
          headerBackVisible: true,
          headerBackTitleVisible: Platform.OS === "ios",
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "登入",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            title: "註冊",
          }}
        />
        <Stack.Screen
          name="forgotPassword"
          options={{
            title: "忘記密碼",
          }}
        />
      </Stack>
    </View>
  );
} 