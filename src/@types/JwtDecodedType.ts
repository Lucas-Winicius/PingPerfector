interface JwtDecodedType {
  id: number;
  name: string;
  nick: string;
  email: string;
  pass: string;
  created_at: string;
  updated_at: string;
  iat: number;
  exp: number;
}

export default JwtDecodedType;
