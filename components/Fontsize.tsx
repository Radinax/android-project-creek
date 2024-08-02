import React, { createContext, useState, useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

interface SharedStateContextType {
  fontSize: number;
  setFontSize: (size: number) => void;
}

const SharedStateContext = createContext<SharedStateContextType>({
  fontSize: 16,
  setFontSize: () => {},
});

const useSharedState = () => useContext(SharedStateContext);

const A = () => {
  const { fontSize, setFontSize } = useSharedState();

  return (
    <View style={styles.containerE}>
      <Text style={[styles.text, { fontSize }]}>Component A</Text>
      <Button title="Increase font" onPress={() => setFontSize(fontSize + 2)} />
      <Button title="Decrease font" onPress={() => setFontSize(fontSize - 2)} />
    </View>
  );
};

const B = () => {
  const { fontSize, setFontSize } = useSharedState();

  return (
    <View style={styles.containerE}>
      <Text style={[styles.text, { fontSize }]}>Component B</Text>
      <Button title="Increase font" onPress={() => setFontSize(fontSize + 2)} />
      <Button title="Decrease font" onPress={() => setFontSize(fontSize - 2)} />
    </View>
  );
};

const C = () => {
  const { fontSize, setFontSize } = useSharedState();

  return (
    <View style={styles.containerE}>
      <Text style={[styles.text, { fontSize }]}>Component C</Text>
      <Button title="Increase font" onPress={() => setFontSize(fontSize + 2)} />
      <Button title="Decrease font" onPress={() => setFontSize(fontSize - 2)} />
    </View>
  );
};

const D = ({ fontSize }: { fontSize: number }) => {
  const [sharedFontsize, setSharedFontsize] = useState(fontSize);
  return (
    <SharedStateContext.Provider
      value={{
        fontSize: sharedFontsize,
        setFontSize: setSharedFontsize,
      }}
    >
      <View style={styles.containerD}>
        <Text>This is state for font size equal {sharedFontsize}</Text>
        <A />
        <B />
        <C />
      </View>
    </SharedStateContext.Provider>
  );
};

const E = () => {
  return (
    <View style={styles.containerE}>
      <D fontSize={30} />
      <D fontSize={20} />
      <D fontSize={10} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerD: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    gap: 10,
    padding: 20,
  },
  containerE: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "auto",
    gap: 10,
  },
  text: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
});

export default E;
