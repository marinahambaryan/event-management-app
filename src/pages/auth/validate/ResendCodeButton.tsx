import { resendSignUpCode } from "aws-amplify/auth";

type ResendCodeButtonProps = {
  email: string;
  error?: string;
};

const ResendCodeButton = ({ email, error }: ResendCodeButtonProps) => {
  const isDisabled = !email || !!error;

  async function handleResendVerificationCode(username: string) {
    try {
      await resendSignUpCode({ username });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button
        disabled={isDisabled}
        className={`${
          isDisabled && "cursor-not-allowed opacity-50"
        } mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
        onClick={(e) => {
          e.preventDefault();
          handleResendVerificationCode(email);
        }}
      >
        Resend Code
      </button>
    </div>
  );
};

export default ResendCodeButton;
