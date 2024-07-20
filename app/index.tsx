import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import { InputField } from "./InpuField";
import { TimerDisplay } from "./TimerDisplay";

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
        setTimerCount(flowDuration * 60 * 1000);
        break;
      case "ShortBreak":
        setTimerCount(shortBreakDuration * 60 * 1000);
        break;
      case "LongBreak":
        setTimerCount(longBreakDuration * 60 * 1000);
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
    if(timerInterval !== null){
      clearInterval(timerInterval);
    }
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
      <TimerDisplay
        currentPhase={currentPhase}
        isTimerRunning={isTimerRunning}
        stopTimer={stopTimer}
        startTimer={startTimer}
        timerDate={timerDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5F5D",
  }
});
