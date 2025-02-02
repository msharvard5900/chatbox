import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 這裡之後會加入檢查用戶認證狀態的邏輯
    const checkAuth = async () => {
      try {
        // 模擬檢查過程
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsAuthenticated(false);
      } catch (error) {
        console.error("認證檢查失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return isAuthenticated ? <Redirect href="/tabs/home" /> : <Redirect href="/onboarding/welcome" />;
}
