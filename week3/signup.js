const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const usernameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const submitButton = document.getElementById("submit-button");

usernameInput.addEventListener("blur", validateUsername);
emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
confirmPasswordInput.addEventListener("blur", validateConfirmPassword);
submitButton.addEventListener("blur", validateSubmitForm);

function validateUsername() {
    const usernameText = usernameInput.value.trim();

    if (usernameText === "") {
        usernameInput.classList.add("error")
        usernameError.textContent = "Username cannot be empty!"
    }
    else {
        usernameInput.classList.remove("error");
        usernameError.textContent = "";
    }
}

function validateEmail() {
    const emailText = emailInput.value.trim();
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailText === "") {
        emailInput.classList.add("error");
        emailError.textContent = "Email cannot be empty!"
    }
    else if (!emailFormat.test(emailText)) {
        emailInput.classList.add("error");
        emailError.textContent = "Invalid email format!"
    }
    else {
        emailInput.classList.remove("error");
        emailError.textContent = "";
    }
}

function validatePassword() {
    const passwordText = passwordInput.value;

    if (passwordText === "") {
        passwordInput.classList.add("error");
        passwordError.classList = "Password cannot be empty!"
    }
    else if (passwordText.length < 8) {
        passwordInput.classList.add("error");
        passwordError.textContent = "Password is too short!"
    }
    else {
        passwordInput.classList.remove("error");
        passwordError.textContent = "";
    }
}

function validateConfirmPassword() {
    const passwordText = passwordInput.value;
    const confirmPasswordText = confirmPasswordInput.value;

    if (confirmPasswordText ===""){
        confirmPasswordInput.classList.add("error");
        confirmPasswordError.textContent = "Confirm Password cannot be empty!";
    }
    else if (confirmPasswordText !== passwordText) {
        confirmPasswordInput.classList.add("error");
        confirmPasswordError.textContent = "Passwords do not match";
    }
    else {
        confirmPasswordInput.classList.remove("error");
        confirmPasswordError.textContent = "";
    }
}

function validateSubmitForm() {
    validateUsername();
    validateEmail()
    validatePassword();
    validateConfirmPassword();

    if (!usernameInput.classList.contains("error") &&
        !emailInput.classList.contains("error") &&
        !passwordInput.classList.contains("error") &&
        !confirmPasswordInput.classList.contains("error")
    ){
        alert("Sign Up Successful!");

    }

}




