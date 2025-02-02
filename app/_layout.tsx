import React from "react";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useApp } from "../contexts/AppContext";

// 包裝 Stack 導航器的組件，用於訪問 context
function RootLayoutNav() {
  const { theme } = useApp();
  const isDarkMode = theme === "dark";

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? "#000" : "#fff",
          },
          headerTintColor: isDarkMode ? "#fff" : "#000",
          contentStyle: {
            backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="splashScreen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(onboarding)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}

// 根布局組件
export default function RootLayout() {
  return (
    <AppProvider>
      <RootLayoutNav />
    </AppProvider>
  );
}
