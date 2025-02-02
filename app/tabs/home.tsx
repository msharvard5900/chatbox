import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatMessage } from "../../components/ChatMessage";
import { ChatInput } from "../../components/ChatInput";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const insets = useSafeAreaInsets();

  const handleSend = async (message: string) => {
    // 這裡之後會加入發送訊息的邏輯
    console.log("發送訊息:", message);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={[styles.content, { marginBottom: insets.bottom }]}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          style={styles.messageList}
          inverted
        />
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
}); 