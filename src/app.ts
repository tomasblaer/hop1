import express from "express";
import dotenv from "dotenv";
import { ExtractJwt } from "passport-jwt";
import { Strategy as JwtStrategy } from "passport-jwt";
import { router } from "./routes/api.js";
import { handle404, handleError } from "./lib/handlers.js";
import passport, { DoneCallback } from "passport";
import { getSecretAssert } from "./lib/authorization.js";
import { getUserByUsername } from "./routes/users.js";
import { user } from "@prisma/client";
import { JWTUser } from "./routes/types.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(passport.initialize());
app.use(router);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getSecretAssert(),
};

passport.use(new JwtStrategy (jwtOptions, async (jwt_payload: JWTUser, done: DoneCallback) => {
  console.log('jwt_payload', jwt_payload);
  let user: user | null = null
  try {
    user = await getUserByUsername(jwt_payload.username);
  } catch (e) {
    return done(e, false);
  }
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use(handle404);

app.use(handleError);
