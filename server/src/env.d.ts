declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
    AWS_ACCESS_ID: string;
    AWS_SECRET_KEY: string;
    AWS_REGION: string;
    S3_BUCKET_NAME: string;
  }
}
