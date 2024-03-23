import { Formik } from "formik";
import { confirmSignUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input";
import { validateCode } from "../../../utils/validation";
import ResendCodeButton from "./ResendCodeButton";

const Validate = () => {
  const navigate = useNavigate();

  async function handleRegisterConfirmation({
    email,
    code,
  }: {
    email: string;
    code: string;
  }) {
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      navigate("/signIn");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Email Validation</h1>
        <Formik
          initialValues={{ email: "", code: "" }}
          validate={(values) => {
            const errors = validateCode(values.code);
            console.log({ errors });
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            handleRegisterConfirmation(values);
            navigate("/events");
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                value={values.email}
                error={errors.email}
                handleChange={handleChange}
              />
              <Input
                label="Email Token"
                type="text"
                name="token"
                value={values.code}
                error={errors.code}
                handleChange={handleChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Validate
              </button>
              <ResendCodeButton email={values.email} error={errors.email} />
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Validate;
