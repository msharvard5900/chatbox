import React from "react";
import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { CustomButton } from "../components/CustomButton";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "找不到頁面" }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>很抱歉，找不到您要的頁面</Text>
        <Link href="/" asChild>
          <CustomButton 
            title="返回首頁" 
            variant="primary" 
            style={styles.button} 
          />
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 72,
    fontWeight: "bold",
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginVertical: 20,
  },
  button: {
    width: 200,
  },
}); 