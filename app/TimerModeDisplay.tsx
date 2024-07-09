import { StyleSheet, Text, View } from "react-native";
import React from "react";

export type TimerModes = "Focus" | "Break";

type Props = {
  timerMode: TimerModes;
};

export const TimerModeDisplay: React.FC<Props> = ({ timerMode }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timerModeText}>
        {timerMode} Time{timerMode === "Focus" ? "🍅" : "🥦"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  timerModeText: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
  },
});
