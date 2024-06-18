import fbAuth from "@react-native-firebase/auth";
import { observer } from "mobx-react-lite";
import React from "react";

import EmailVerifiedStatus from "../components/EmailVerifiedStatus";
import AuthenticationService from "../services/AuthenticationService";

const EmailVerifiedStatusContainer = () => {
  const user = AuthenticationService.user;
  const emailVerified = user?.emailVerified;

  const [displaySuccess, setDisplaySuccess] = React.useState(false);

  React.useEffect(() => {
    if (emailVerified) {
      return;
    }

    const interval = setInterval(() => {
      AuthenticationService.user?.reload().then(() => {
        console.log("running.");

        if (fbAuth().currentUser?.emailVerified && fbAuth().currentUser) {
          AuthenticationService.setUser(fbAuth().currentUser!);
          setDisplaySuccess(true);
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [emailVerified]);

  const handleSendEmailVerification = () => {
    AuthenticationService.user?.sendEmailVerification();
  };

  const handleCloseSuccess = () => {
    setDisplaySuccess(false);
  };

  return (
    <EmailVerifiedStatus
      emailVerified={!!user?.emailVerified}
      onSendEmail={handleSendEmailVerification}
      displaySuccess={displaySuccess}
      onCloseSuccess={handleCloseSuccess}
    />
  );
};

export default observer(EmailVerifiedStatusContainer);
