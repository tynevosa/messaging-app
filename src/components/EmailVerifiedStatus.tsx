import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable, Button } from "react-native";

interface Props {
  emailVerified?: boolean;
  onSendEmail?: () => void;
  displaySuccess?: boolean;
  onCloseSuccess?: () => void;
}

const EmailVerifiedStatus = ({
  emailVerified,
  onSendEmail,
  displaySuccess,
  onCloseSuccess,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    onSendEmail?.();
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (displaySuccess) {
      setModalVisible(false);
    }
  }, [displaySuccess]);

  if (emailVerified && !displaySuccess) {
    return null;
  }

  return (
    <View testID="verify-email-component">
      <Pressable testID="send-email-button" onPress={toggleModal}>
        <Text>Verify your email!</Text>
      </Pressable>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modal}>
          <View testID="send-email-success-view" style={styles.card}>
            <Text>We just sent you an email!</Text>
            <Text>Click the link in the email to verify your account.</Text>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={displaySuccess}>
        <View testID="verify-success-view" style={styles.modal}>
          <View style={styles.card}>
            <Text>Your email has been verified!</Text>

            <Button onPress={onCloseSuccess} title="Close" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
  },
});

export default EmailVerifiedStatus;
