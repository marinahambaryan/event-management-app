import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { signUp } from "aws-amplify/auth";

import { validateSignUpForm } from "../../../utils/validation";
import Input from "../../../components/Input";

type SignUpParameters = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const SignUp = () => {
  const [globalError, setGlobalError] = useState("");
  const navigate = useNavigate();

  async function handleSignUp({
    email,
    password,
    firstName,
    lastName,
  }: SignUpParameters) {
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            given_name: firstName,
            family_name: lastName,
          },
          autoSignIn: true,
        },
      });
      navigate("/validate");
    } catch (error: any) {
      setGlobalError((error && error?.message) || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {globalError && (
          <p className="text-red-500 text-sm mt-1">{globalError}</p>
        )}
        <Formik
          initialValues={{
            email: "",
            password: "",
            firstName: "",
            lastName: "",
          }}
          validate={(values) => {
            const errors = validateSignUpForm(values);
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            handleSignUp(values);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                label={"First Name"}
                name={"firstName"}
                value={values.firstName}
                error={errors.firstName}
                handleChange={handleChange}
              />
              <Input
                type="text"
                label={"Last Name"}
                name={"lastName"}
                value={values.lastName}
                error={errors.lastName}
                handleChange={handleChange}
              />
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
                Sign Up
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
