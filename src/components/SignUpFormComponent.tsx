import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";

interface Props {
  email?: string;
  password?: string;
  confirmPassword?: string;
  setEmail?: (email: string) => void;
  setPassword?: (password: string) => void;
  setConfirmPassword?: (confirmPassword: string) => void;
  onSubmit?: () => void;
  loading?: boolean;
  errorMessage?: string;
}

const SignUpFormComponent = ({
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  onSubmit,
  loading,
  errorMessage,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (!confirmPassword) {
      setPasswordsMatch(true);
      return;
    }

    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <View>
      <TextInput
        testID="signup-email-input"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail?.(e.nativeEvent.text);
        }}
        focusable={!loading}
      />

      <View style={styles.inputRow}>
        <TextInput
          testID="signup-password-input"
          style={[
            styles.input,
            {
              borderColor: passwordsMatch ? "black" : "red",
              borderWidth: 1,
            },
          ]}
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword?.(e.nativeEvent.text);
          }}
          focusable={!loading}
          secureTextEntry={!showPassword}
        />

        <Feather
          onPress={toggleShowPassword}
          name={showPassword ? "eye-off" : "eye"}
          size={17}
          color="black"
        />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          testID="signup-confirm-password-input"
          style={[
            styles.input,
            {
              borderColor: passwordsMatch ? "black" : "red",
              borderWidth: 1,
            },
          ]}
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword?.(e.nativeEvent.text);
          }}
          focusable={!loading}
          secureTextEntry={!showPassword}
        />

        <Feather
          onPress={toggleShowPassword}
          name={showPassword ? "eye-off" : "eye"}
          size={17}
          color="black"
        />
      </View>

      {errorMessage && <Text>{errorMessage}</Text>}

      <Button
        testID="signup-submit-button"
        title={loading ? "Registering" : "Sign Up"}
        onPress={onSubmit}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
  },
});

export default SignUpFormComponent;
