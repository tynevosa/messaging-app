import { fireEvent, render } from "@testing-library/react-native";

import EmailVerifiedStatus from "./EmailVerifiedStatus";

describe("EmailVerifiedStatus", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("renders", () => {
    it("visible when email is not verified", () => {
      const { getByTestId } = render(
        <EmailVerifiedStatus emailVerified={false} />,
      );

      expect(getByTestId("verify-email-component")).toBeVisible();
    });

    it("null when email is verified", () => {
      const { queryByTestId } = render(<EmailVerifiedStatus emailVerified />);

      expect(queryByTestId("verify-email-component")).toBeNull();
    });
  });

  describe("success message", () => {
    it('displays the success modal when "displaySuccess" is true', () => {
      const { getByTestId } = render(
        <EmailVerifiedStatus emailVerified displaySuccess />,
      );

      expect(getByTestId("verify-success-view")).toBeVisible();
    });

    it('does not display the success modal when "displaySuccess" is false', () => {
      const { queryByTestId } = render(
        <EmailVerifiedStatus emailVerified displaySuccess={false} />,
      );

      expect(queryByTestId("verify-success-view")).toBeNull();
    });
  });

  describe("send email", () => {
    it('calls "onSendEmail" when the "send-email-button" is pressed', () => {
      const onSendEmail = jest.fn();
      const { getByTestId } = render(
        <EmailVerifiedStatus onSendEmail={onSendEmail} />,
      );

      fireEvent(getByTestId("send-email-button"), "press");

      expect(onSendEmail).toHaveBeenCalledTimes(1);
    });

    it("displays email sent message", () => {
      const onSendEmail = jest.fn();
      const { getByTestId } = render(
        <EmailVerifiedStatus onSendEmail={onSendEmail} />,
      );

      fireEvent(getByTestId("send-email-button"), "press");

      expect(getByTestId("send-email-success-view")).toBeVisible();
    });
  });
});
