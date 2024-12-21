import React, { useRef, useEffect } from "react";
import { View, TextInput, StyleSheet, Keyboard } from "react-native";

interface CustomOTPInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  clearOtp?: boolean;
}

const CustomOTPInput: React.FC<CustomOTPInputProps> = ({ otp, setOtp, clearOtp }) => {
  const inputs = Array(6).fill("");
  const inputRefs = useRef<TextInput[]>([]);

  /** Focus on First Input on Mount */
  useEffect(() => {
    setTimeout(() => {
      inputRefs.current[0]?.focus();
      Keyboard.dismiss();
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }, 500);
  }, []);

  /** Handle OTP Change */
  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const updatedOtp = otp.split("");
    updatedOtp[index] = text;
    setOtp(updatedOtp.join(""));

    if (text && index < inputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /** Handle Backspace */
  const handleBackspace = (text: string, index: number) => {
    if (text === "" && index > 0) {
      const updatedOtp = otp.split("");
      updatedOtp[index] = "";
      setOtp(updatedOtp.join(""));
      inputRefs.current[index - 1]?.focus();
    }
  };

  /** Clear OTP and Refocus */
  useEffect(() => {
    if (clearOtp) {
      setOtp("");
      inputRefs.current.forEach((input) => input?.clear());
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [clearOtp]);

  /** Ensure Focus on First Input When Keyboard is Hidden */
  useEffect(() => {
    const keyboardListener = Keyboard.addListener("keyboardDidHide", () => {
      inputRefs.current[0]?.focus();
    });

    return () => {
      keyboardListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {inputs.map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref!)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={otp[index] || ""}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspace(otp[index] || "", index);
            }
          }}
          autoFocus={index === 0}
          blurOnSubmit={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: 40,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
});

export default CustomOTPInput;
