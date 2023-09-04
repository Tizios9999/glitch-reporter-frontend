export default function validateForm(formData) {
  const currentErrors = [];

  if (!validatePassword(formData.password)) {
    currentErrors.push(
      "The specified password is not valid. Should be minimum 8 characters long and meet at least two of these conditions: must have an uppercase character, a lowercase character, have a number, have a special character"
    );
  }

  if (!validateUsername(formData.username)) {
    currentErrors.push(
      `Invalid username. Should be minimum 3 characters, with no special characters`
    );
  }

  if (!validateEmail(formData.email)) {
    currentErrors.push(
      "The email provided is incorrect, check your spelling and try again"
    );
  }

  if (formData.password !== formData.passwordConfirmation) {
    currentErrors.push(
      "The password provided and the password confirmation do not match. Please check for any errors and try again."
    );
  }

  return currentErrors;
}

// Functions to validate single form fields

function validatePassword(password) {
  let conditionsMet = 0;

  if (/[a-z]/.test(password)) {
    conditionsMet++;
  }

  if (/[A-Z]/.test(password)) {
    conditionsMet++;
  }

  if (/\d/.test(password)) {
    conditionsMet++;
  }

  if (/[@$!%*?&]/.test(password)) {
    conditionsMet++;
  }

  return password.length >= 8 && conditionsMet >= 2;
}

function validateUsername(username) {
  const usernameRegex = /^[A-Za-z\d]{3,}$/;

  const isValid = usernameRegex.test(username);

  return isValid;
}

function validateEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const isValid = emailRegex.test(email);

  return isValid;
}
