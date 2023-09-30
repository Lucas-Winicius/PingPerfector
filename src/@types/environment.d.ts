declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number;
      DATABASE_URL?: string;
      REDIS_URL?: string;
      BCRYPT_SALT?: number;
    }
  }
}

export {};
