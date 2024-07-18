import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

type Props = {
  label: string;
  setValue: () => void;
  value: () => void;
  unit: string;
};

export const InputField: React.FC<Props> = ({
  label,
  setValue,
  value,
  unit,
}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{label}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setValue(Number(value))}
          value={value !== null ? value.toString() : ""}
          keyboardType="numeric"
        />
        <Text style={styles.inputText}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    color: "#fff",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#fff",
    color: "#fff",
  },
});
