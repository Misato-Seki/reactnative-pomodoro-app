import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  currentPhase: string;
  isTimerRunning: boolean;
  stopTimer: () => void;
  startTimer: () => void;
  timerDate: Date;
};

export const TimerDisplay: React.FC<Props> = ({
  currentPhase,
  isTimerRunning,
  stopTimer,
  startTimer,
  timerDate,
}) => {
  return (
    <View style={styles.timerDisplay}>
      <Text style={styles.currentPhase}>{currentPhase}</Text>
      <Pressable onPress={isTimerRunning ? stopTimer : startTimer}>
        <AntDesign
          name={isTimerRunning ? "pausecircle" : "play"}
          size={80}
          color="white"
        />
      </Pressable>
      <Text style={styles.timer}>
        {timerDate.getMinutes().toString().padStart(2, "0")}:
        {timerDate.getSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerDisplay: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  currentPhase: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
  },
  timer: {
    fontSize: 40,
    fontWeight: "800",
    color: "#fff",
    marginTop: 10,
  },
});
