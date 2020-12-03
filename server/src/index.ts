import "reflect-metadata";
import "dotenv-safe/config";
import { __prod__, COOKIE_NAME } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import { PictureResolver } from "./resolvers/picture";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from "path";
import { Updoot } from "./entities/Updoot";
import { createUserLoader } from "./utils/createUserLoader";
import { createUpdootLoader } from "./utils/createUpdootLoader";
import { graphqlUploadExpress } from "graphql-upload";
import { Admin } from "./entities/Admin";
import { AdminResolver } from "./resolvers/admin";
import { Customer } from "./entities/Customer";
import { CustomerProfile } from "./entities/CustomerProfile";
import { CustumerResolver } from "./resolvers/customer";
import { Order } from "./entities/Order";
import { ServiceTypes } from "./entities/ServiceTypes";
import { Locker } from "./entities/Locker";
import { LockerResolver } from "./resolvers/locker";
import { ServiceResolver } from "./resolvers/service";
import { OrderResolver } from "./resolvers/order";
import { createCustLoader } from "./utils/createCustLoader";
import { TopupBalance } from "./entities/TopupBalance";
import { TopupBalanceResolver } from "./resolvers/topup";

const main = async () => {
  //@ts-ignore
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [
      Post,
      User,
      Updoot,
      Admin,
      Customer,
      CustomerProfile,
      Order,
      ServiceTypes,
      Locker,
      TopupBalance,
    ],
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  // await conn.runMigrations();

  // await Admin.delete({});
  // await AdminRole.delete({});

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        httpOnly: true,
        sameSite: "lax", //csrf
        secure: __prod__, //only works in https
        domain: __prod__ ? ".londrebox.site" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        PostResolver,
        UserResolver,
        PictureResolver,
        AdminResolver,
        CustumerResolver,
        LockerResolver,
        ServiceResolver,
        OrderResolver,
        TopupBalanceResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
      custLoader: createCustLoader(),
    }),
    uploads: false,
  });

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
