import validator from "validator";
import UserTypes from "../@types/userTypes";

export function fullName(name: string): string | null {
  if (!name) {
    return "Please enter a name.";
  }

  if (name.length < 2) {
    return "Your name is too short.";
  }

  return null;
}

export function nick(nick: string): string | null {
  if (!nick) {
    return "Please enter a nick.";
  }

  if (nick.length > 30) {
    return "You can use a maximum of 30 characters in your nick.";
  }

  if (nick.length < 3) {
    return "Your nick must have at least 3 characters.";
  }

  return null;
}

export function email(email: string): string | null {
  if (!email) {
    return "Please enter an email.";
  }

  if (!validator.isEmail(email)) {
    return "Enter a valid email.";
  }

  return null;
}

export function pass(pass: string): string | null {
  if (!pass) {
    return "Please enter a password.";
  }

  if (
    !validator.isStrongPassword(pass, {
      minLength: 8,
      minLowercase: 2,
      minNumbers: 2,
      minUppercase: 2,
      minSymbols: 2,
    })
  ) {
    return "Password too weak, please try another one with at least 8 characters and containing at least 2 lowercase letters, 2 uppercase letters, 2 numbers and 2 symbols.";
  }

  return null;
}

export default function Validate(userParams: UserTypes) {
  const errors: (string | null)[] = [
    fullName(userParams.name),
    nick(userParams.nick),
    email(userParams.email),
    pass(userParams.pass),
  ];

  return errors.filter((error) => error !== null) as string[];
}
