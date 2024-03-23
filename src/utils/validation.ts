export function validateSignInForm(values: {
  email?: string;
  password?: string;
}) {
  const errors = {} as { email: string; password: string };
  const emailError = validateEmail(values.email);
  if (emailError) {
    errors.email = emailError;
  }
  const passwordError = validatePassword(values.password);

  if (passwordError) {
    errors.password = passwordError;
  }
  return errors;
}

export function validateSignUpForm({
  email,
  password,
  firstName,
  lastName,
}: {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}) {
  const errors = {} as {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  };
  const firstNameError = validateName(firstName, "First Name");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateName(lastName, "First Name");
  if (lastNameError) errors.lastName = lastNameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
}

function validateEmail(email: string | undefined): string | undefined {
  let error;
  if (!email) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    error = "Invalid email address";
  }
  return error;
}

function validatePassword(password: string | undefined) {
  let error;
  if (!password) {
    error = "Required";
  } else if (!/^(?=.*\d).{8,}$/i.test(password)) {
    error = "Invalid password address";
  }
  return error;
}

function validateName(param: string | undefined, label: string) {
  let error;
  if (!param) {
    error = "Required";
  } else if (param.length < 2) {
    error = `Invalid ${label}`;
  }
  return error;
}

export function validateCode(code?: string | undefined) {
  let errors = {} as { code: string };
  if (!code) {
    errors.code = "Required";
  }
  return errors;
}
