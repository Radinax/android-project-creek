import React, { useState, useCallback } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

interface DebouncedInputProps {
  debounceTime?: number;
}

const DebouncedInput = ({ debounceTime = 500 }: DebouncedInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleChangeText = useCallback(
    (text: string) => {
      setInputValue(text);
      const timeoutId = setTimeout(() => {
        setDebouncedValue(text);
      }, debounceTime);
      return () => clearTimeout(timeoutId);
    },
    [debounceTime]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debounced Input</Text>
      <Text style={styles.text}>Delay time: {debounceTime}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleChangeText}
      />
      <Text style={styles.output}>{debouncedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  output: {
    marginTop: 16,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
  },
});

export default DebouncedInput;
