import jwt from "jsonwebtoken";

class JWT {
  private JWT_SECRET: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET;
  }

  create(content: string | object) {
    const JWT_CODE = jwt.sign(content, this.JWT_SECRET, { expiresIn: "7d" });

    return JWT_CODE;
  }

  decrypt(code: string) {
    try {
      const JWT_STRING = jwt.verify(code, this.JWT_SECRET);

      return { success: true, JWT_STRING };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default new JWT();
