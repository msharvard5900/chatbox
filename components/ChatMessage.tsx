import { View, Text, StyleSheet } from "react-native";
import { useApp } from "../contexts/AppContext";

interface ChatMessageProps {
  message: {
    text: string;
    timestamp: any;
    isUser: boolean;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { isDarkMode } = useApp();
  const { text, isUser } = message;

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.botContainer,
    ]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.botBubble,
        isDarkMode && (isUser ? styles.darkUserBubble : styles.darkBotBubble),
      ]}>
        <Text style={[
          styles.text,
          isUser ? styles.userText : styles.botText,
          isDarkMode && styles.darkText,
        ]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  userContainer: {
    alignItems: "flex-end",
  },
  botContainer: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: "#007AFF",
  },
  botBubble: {
    backgroundColor: "#E9E9EB",
  },
  darkUserBubble: {
    backgroundColor: "#0A84FF",
  },
  darkBotBubble: {
    backgroundColor: "#2C2C2E",
  },
  text: {
    fontSize: 16,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: "#000000",
  },
  darkText: {
    color: "#FFFFFF",
  },
}); 