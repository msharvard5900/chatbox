import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "../contexts/AppContext";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { sendMessage, subscribeToMessages } from "../services/firebase";
import { generateAIResponse } from "../services/openAI";

interface Message {
  id: string;
  text: string;
  userId: string;
  timestamp: any;
  isAI?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
  const { user } = useApp();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToMessages(user.uid, (newMessages) => {
      setMessages(newMessages);
      setError(null);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSend = async (text: string) => {
    if (!user || !text.trim()) return;
    setError(null);

    try {
      setIsLoading(true);
      
      // 發送用戶訊息，明確設置 isAI 為 false
      await sendMessage(user.uid, text, false);

      // 獲取 AI 回應
      const aiResponse = await generateAIResponse(text);
      
      // 發送 AI 回應，明確設置 isAI 為 true
      await sendMessage(user.uid, aiResponse, true);
    } catch (error: any) {
      console.error("發送訊息失敗:", error);
      setError(error.message || "發送訊息失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <ChatMessage
      message={{
        text: item.text,
        timestamp: item.timestamp,
        isUser: !item.isAI,
      }}
    />
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.content, { marginBottom: insets.bottom }]}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          style={styles.messageList}
          inverted
          keyExtractor={(item) => item.id}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007AFF" />
          </View>
        )}
        <ChatInput onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    padding: 10,
    alignItems: "center",
  },
}); 