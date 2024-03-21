export function validateSignInForm(values: {
  email?: string;
  password?: string;
}) {
  const errors = {} as { email: string; password: string };
  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);
  return errors;
}

export function validateSignOutForm(values: {
  email?: string;
  password?: string;
}) {
  const errors = {} as { email: string; password: string };

  if (!values.password) {
    errors.password = "Required";
  } else if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(
      values.password
    )
  ) {
    errors.password = "Invalid password address";
  }
  return errors;
}

function validateEmail(email: string | undefined): string {
  let error = "";
  if (!email) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePassword(password: string | undefined) {
  let error = "";
  if (!password) {
    error = "Required";
  } else if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i.test(
      password
    )
  ) {
    error = "Invalid password address";
  }
  return error;
}
