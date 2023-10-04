function generateCode(length: number): string {
  const allowedCharacters: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-";
  const code: string[] = [];

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(
      Math.random() * allowedCharacters.length,
    );
    code.push(allowedCharacters[randomIndex]);
  }

  return code.join("");
}

export default generateCode;
