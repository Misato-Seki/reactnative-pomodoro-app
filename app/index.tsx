import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function index() {
  const [flowDuration, setFlowDuration] = useState<number>(0);
  const [shortBreakDuration, setShortBreakDuration] = useState<number>(0);
  const [longBreakDuration, setLongBreakDuration] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState<
    "Flow" | "ShortBreak" | "LongBreak"
  >("Flow");
  const [timerCount, setTimerCount] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);

  // useEffectは、第一引数にcallbackを入れて、第二引数に依存する値の配列を入れる
  // 依存する値が変更される度にcallbackが実行される
  useEffect(() => {
    if (timerCount === 0) {
      if (currentPhase === "Flow" && sessionCount > 0) {
        setCurrentPhase("ShortBreak");
        setTimerCount(shortBreakDuration * 60 * 1000);
        setSessionCount((prev) => prev - 1);
      } else if (currentPhase === "Flow" && sessionCount === 0) {
        setCurrentPhase("LongBreak");
        setTimerCount(longBreakDuration  * 60 * 1000);
      } else if (currentPhase === "ShortBreak") {
        setCurrentPhase("Flow");
        setTimerCount(flowDuration  * 60 * 1000);
      }
    }
  }, [timerCount]);

  // Start Timer
  const startTimer = () => {
    // setInterval
    // Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
    const intervalId = setInterval(() => {
      setTimerCount((prev) => prev - 1000);
    }, 1000);
    setTimerInterval(intervalId);
  };

  // Stop Tomer
  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const timerDate = new Date(timerCount);

  return (
    <View>
      <Text>Flow Duration</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFlowDuration}
        value={flowDuration !== null ? flowDuration.toString() : ""}
        keyboardType="numeric"
      />
      <Text>ShortBreak Duration</Text>
      <TextInput
        style={styles.input}
        onChangeText={setShortBreakDuration}
        value={flowDuration !== null ? shortBreakDuration.toString() : ""}
        keyboardType="numeric"
      />
      <Text>LongBreak Duration</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLongBreakDuration}
        value={flowDuration !== null ? longBreakDuration.toString() : ""}
        keyboardType="numeric"
      />
      <Text>Session Count</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSessionCount}
        value={flowDuration !== null ? sessionCount.toString() : ""}
        keyboardType="numeric"
      />
      <Button title="START" onPress={startTimer} />
      <Button title="STOP" onPress={stopTimer} />
      <Text>{timerDate.getMinutes().toString().padStart(2, "0")}:{timerDate.getSeconds().toString().padStart(2, "0")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { TimerCountDownDisplay } from "./TimerCountDownDisplay";
// import { TimerToggleButton } from "./TimerToggleButton";
// import { TimerModeDisplay, TimerModes } from "./TimerModeDisplay";

// const FOCUS_TIME_MINUTES = 30 * 60 * 1000;
// const BREAK_TIME_MINUTES = 5 * 60 * 1000;

// export default function Index() {
//   const [timerCount, setTimerCount] = useState<number>(FOCUS_TIME_MINUTES);
//   const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
//   const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
//   const [timerMode, setTimerMode] = useState<TimerModes>('Focus');

//   useEffect(() => {
//     if (timerCount === 0) {
//       if(timerMode === 'Focus') {
//         setTimerMode('Break');
//         setTimerCount(BREAK_TIME_MINUTES);
//       } else {
//         setTimerMode('Focus');
//         setTimerCount(FOCUS_TIME_MINUTES);
//       }
//       // stopTimer();
//     }
//   }, [timerCount])

//   const startTimer = () => {
//     setIsTimerRunning(true);
//     const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
//     setTimerInterval(id);
//   };

//   const stopTimer = () => {
//     if (timerInterval !== null) {
//       clearInterval(timerInterval);
//     }
//     setIsTimerRunning(false);
//   };

//   return (
//     <View style={{...styles.container, ...{backgroundColor: timerMode === 'Break' ? "#2a9d8f" : "#d95550"}}}>
//       <TimerModeDisplay timerMode={timerMode}/>
//       <StatusBar style="auto" />
//       <TimerToggleButton isTimerRunning={isTimerRunning} stopTimer={stopTimer} startTimer={startTimer}/>
//       <TimerCountDownDisplay timerDate={new Date(timerCount)}/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#d95550",
//     alignItems: "center",
//     justifyContent: "center"
//   },
// });
