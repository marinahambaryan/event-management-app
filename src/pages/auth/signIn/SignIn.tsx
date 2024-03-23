import { useState } from "react";
import { useSetAtom } from "jotai";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { signIn, getCurrentUser } from "aws-amplify/auth";

import Input from "../../../components/Input";
import { validateSignInForm } from "../../../utils/validation";
import { userAtom } from "../../../atoms/userAtom";

const SignIn = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);
  const [globalError, setGlobalError] = useState("");

  async function handleSignIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    try {
      await signIn({ username: email, password });
      const { username, userId } = await getCurrentUser();
      setUser({ id: userId, email: username });

      navigate("/events");
    } catch (error: any) {
      setGlobalError((error && error?.message) || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {globalError && (
          <p className="text-red-500 text-sm mt-1">{globalError}</p>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = validateSignInForm(values);
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            handleSignIn({
              email: values.email,
              password: values.password,
            });
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                label={"Email"}
                name={"email"}
                value={values.email}
                error={errors.email}
                handleChange={handleChange}
              />
              <Input
                type="password"
                label={"Password"}
                name={"password"}
                value={values.password}
                error={errors.password}
                handleChange={handleChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign In
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
