import { useSetAtom } from "jotai";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { userAtom } from "../../atoms/userAtom";
import Input from "../../components/Input";
import { validateSignInForm } from "../../utils/validation";

const SignIn = () => {
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = validateSignInForm(values);
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              setUser((prevState) => ({ ...prevState, email: values.email }));
            }, 400);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form
              onSubmit={() => {
                handleSubmit();
                navigate("/events");
              }}
            >
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
