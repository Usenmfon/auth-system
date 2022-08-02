const Validator = require('validatorjs');

exports.DataValidator = Validator

exports.loginRules = {
    email: ["required", "email"],
    password: ["required"]
}

exports.signUpRules = {
    email: ["required", "email"],
    firstname: ["required"],
    lastname: ["required"],
    password: ["required"],
}