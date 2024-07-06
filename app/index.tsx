import { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Button, Alert } from "react-native";

export default function Index() {
  const [flowDuration, setFlowDuration] = useState("");
  const [shortBreakDuration, setShortBreakDuration] = useState("");
  const [longBreakDuration, setLongBreakDuration] = useState("");
  const [sessionCount, setSessionCount] = useState("");
  const [currentPhase, setCurrentPhase] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if(isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(interval);
      handlePhaseCompletion();
    }
  })

  const handlePhaseCompletion = () => {
    if (currentPhase === "flow") {
      if (sessionCount > 0) {
        setCurrentPhase("shortBreak");
        setTimeLeft(parseInt(shortBreakDuration) * 60);
        setSessionCount((prevCount) => prevCount - 1);
      } else {
        setCurrentPhase("longBreak");
        setTimeLeft(parseInt(longBreakDuration) * 60);
      }
    } else if (currentPhase === "shortBreak") {
      setCurrentPhase("flow");
      setTimeLeft(parseInt(flowDuration) * 60);
    } else if (currentPhase === 'longBreak') {
      setIsRunning(false);
      Alert.alert('All sessions completed!');
    }
  };
  const startTimer = () => {
    if (
      flowDuration &&
      shortBreakDuration &&
      longBreakDuration &&
      sessionCount
    ) {
      setCurrentPhase("flow");
      setTimeLeft(parseInt(flowDuration) * 60);
      setIsRunning(true);
    } else {
      Alert.alert("Please fill in all fields with valid numbers.");
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Flow Duration</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFlowDuration}
          value={flowDuration}
          keyboardType="numeric"
        />
        <Text style={styles.text}>min</Text>
      </View>
      <Text style={styles.text}>Break Duration</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Short Break</Text>
        <TextInput
          style={styles.input}
          onChangeText={setShortBreakDuration}
          value={shortBreakDuration}
          keyboardType="numeric"
        />
        <Text style={styles.text}>min</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Long Break</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLongBreakDuration}
          value={longBreakDuration}
          keyboardType="numeric"
        />
        <Text style={styles.text}>min</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Session Count</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSessionCount}
          value={sessionCount}
          keyboardType="numeric"
        />
        <Text style={styles.text}>times</Text>
      </View>
      <Button onPress={startTimer} title="START"></Button>
      {isRunning && (
        <Text>
          {currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)}: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
