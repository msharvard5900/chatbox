import { Switch } from "react-native";
import { useState } from "react";

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Switch
      value={isDarkMode}
      onValueChange={(value) => setIsDarkMode(value)}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isDarkMode ? "#007AFF" : "#f4f3f4"}
    />
  );
} 