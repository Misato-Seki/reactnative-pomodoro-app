import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";

export default function index() {
  const [flowDuration, setFlowDuration] = useState<number>(0);
  const [shortBreakDuration, setShortBreakDuration] = useState<number>(0);
  const [longBreakDuration, setLongBreakDuration] = useState<number>(0);
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState<
    "Flow" | "ShortBreak" | "LongBreak"
  >("ShortBreak");
  const [timerCount, setTimerCount] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);

  // useEffectは、第一引数にcallbackを入れて、第二引数に依存する値の配列を入れる
  // 依存する値が変更される度にcallbackが実行される
  useEffect(() => {
    console.log(timerCount);
    console.log('Session Count: ' + sessionCount);
    console.log('Current Phase: ' + currentPhase);
  }, [timerCount]);

  useEffect(() => {
    switch (currentPhase) {
      case "Flow":
        setTimerCount(flowDuration * 1000);
        break;
      case "ShortBreak":
        setTimerCount(shortBreakDuration * 1000);
        break;
      case "LongBreak":
        setTimerCount(longBreakDuration * 1000);
        break;
    }
  }, [currentPhase, flowDuration, shortBreakDuration, longBreakDuration]);

  useEffect(() => {
    if (currentPhase === "Flow") {
      if (timerCount === 0 && sessionCount !== 1) {
        setSessionCount((prev) => prev - 1);
        setCurrentPhase("ShortBreak");
      } else if (timerCount === 0 && sessionCount === 1) {
        setCurrentPhase("LongBreak");
      }
    }
    if (currentPhase === "ShortBreak" && timerCount === 0) {
      setCurrentPhase("Flow");
    }
    // if (timerCount === 0) {
    //   if (currentPhase === "Flow" && sessionCount > 1) {
    //     setCurrentPhase("ShortBreak");
    //     setSessionCount((prev) => prev - 1);
    //   } else if (currentPhase === "Flow" && sessionCount === 1) {
    //     setCurrentPhase("LongBreak");
    //   } else if (currentPhase === "ShortBreak") {
    //     setCurrentPhase("Flow");
    //   }
    // }
  }, [timerCount]);

  // Start Timer
  const startTimer = () => {
    // setInterval
    // Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
    const intervalId = setInterval(() => {
      setTimerCount((prev) => Math.max(prev - 1000, 0));
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
        onChangeText={(value) => setFlowDuration(Number(value))}
        value={flowDuration !== null ? flowDuration.toString() : ""}
        keyboardType="numeric"
      />
      <Text>ShortBreak Duration</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setShortBreakDuration(Number(value))}
        value={shortBreakDuration !== null ? shortBreakDuration.toString() : ""}
        keyboardType="numeric"
      />
      <Text>LongBreak Duration</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setLongBreakDuration(Number(value))}
        value={longBreakDuration !== null ? longBreakDuration.toString() : ""}
        keyboardType="numeric"
      />
      <Text>Session Count</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setSessionCount(Number(value))}
        value={sessionCount !== null ? sessionCount.toString() : ""}
        keyboardType="numeric"
      />
      <Button title="START" onPress={startTimer} />
      <Button title="STOP" onPress={stopTimer} />
      <Text>
        {timerDate.getMinutes().toString().padStart(2, "0")}:
        {timerDate.getSeconds().toString().padStart(2, "0")}
      </Text>
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
