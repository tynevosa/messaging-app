import { Button, TextInput, View, Text, StyleSheet } from "react-native";

interface Props {
  email?: string;
  password?: string;
  setEmail?: (email: string) => void;
  setPassword?: (password: string) => void;
  onSubmit?: () => void;
  loading?: boolean;
  errorMessage?: string;
}

const SignInFormComponent = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  loading,
  errorMessage,
}: Props) => {
  return (
    <View>
      <TextInput
        testID="signin-email-input"
        placeholder="email"
        value={email}
        onChange={(e) => {
          setEmail?.(e.nativeEvent.text);
        }}
        focusable={!loading}
      />

      <TextInput
        testID="signin-password-input"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword?.(e.nativeEvent.text);
        }}
        focusable={!loading}
      />

      {errorMessage && (
        <Text testID="signin-error-message">{errorMessage}</Text>
      )}

      <Button
        testID="signin-submit-button"
        title={loading ? "Authenticating" : "Sign In"}
        onPress={onSubmit}
        disabled={loading}
      />
    </View>
  );
};

export default SignInFormComponent;
