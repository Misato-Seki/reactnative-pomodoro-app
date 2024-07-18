import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { InputField } from "./InpuField";

export default function index() {
  const [flowDuration, setFlowDuration] = useState<number>(30);
  const [shortBreakDuration, setShortBreakDuration] = useState<number>(5);
  const [longBreakDuration, setLongBreakDuration] = useState<number>(20);
  const [sessionCount, setSessionCount] = useState<number>(3);
  const [currentPhase, setCurrentPhase] = useState<
    "Flow" | "ShortBreak" | "LongBreak"
  >("ShortBreak");
  const [timerCount, setTimerCount] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timer | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // useEffectは、第一引数にcallbackを入れて、第二引数に依存する値の配列を入れる
  // 依存する値が変更される度にcallbackが実行される
  useEffect(() => {
    console.log("Session Count: " + sessionCount);
  }, [sessionCount]);

  useEffect(() => {
    console.log("Current Phase: " + currentPhase);
  }, [currentPhase]);

  //Handle TimerCount
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

  //Handle Phase
  useEffect(() => {
    console.log("Timer Count: " + timerCount);

    if (currentPhase === "Flow") {
      if (timerCount === 0 && sessionCount !== 1) {
        playSound();
        setSessionCount((prev) => prev - 1);
        setCurrentPhase("ShortBreak");
      } else if (timerCount === 0 && sessionCount === 1) {
        setCurrentPhase("LongBreak");
      }
    }
    if (currentPhase === "ShortBreak" && timerCount === 0) {
      playSound();
      setCurrentPhase("Flow");
    }
    if (currentPhase === "LongBreak" && timerCount === 0) {
      playSound();
      setCurrentPhase("Flow");
      setSessionCount(3);
      stopTimer();
    }
  }, [timerCount]);

  // Start Timer
  const startTimer = () => {
    // setInterval
    // Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
    const intervalId = setInterval(() => {
      setTimerCount((prev) => Math.max(prev - 1000, 0));
    }, 1000);
    setTimerInterval(intervalId);
    setIsTimerRunning(true);
  };

  // Stop Tomer
  const stopTimer = () => {
    clearInterval(timerInterval);
    setIsTimerRunning(false);
  };

  // Play Alarm Sound
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sound/alarm.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const timerDate = new Date(timerCount);

  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: currentPhase === "Flow" ? "#FF5F5D" : "#00CCBF" },
      }}
    >
      <InputField
        label="Flow Duration"
        setValue={setFlowDuration}
        value={flowDuration}
        unit="min"
      />
      <InputField
        label="ShortBreak Duration"
        setValue={setShortBreakDuration}
        value={shortBreakDuration}
        unit="min"
      />
      <InputField
        label="LongBreak Duration"
        setValue={setLongBreakDuration}
        value={longBreakDuration}
        unit="min"
      />
      <InputField
        label="Session Count"
        setValue={setSessionCount}
        value={sessionCount}
        unit="times"
      />
      <View style={styles.timerDisplay}>
        <Text style={styles.currentPhase}>{currentPhase}</Text>
        <TouchableOpacity onPress={isTimerRunning ? stopTimer : startTimer}>
          <AntDesign
            name={isTimerRunning ? "pausecircle" : "play"}
            size={80}
            color="white"
          />
        </TouchableOpacity>
        <Text style={styles.timer}>
          {timerDate.getMinutes().toString().padStart(2, "0")}:
          {timerDate.getSeconds().toString().padStart(2, "0")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5F5D",
  },
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
