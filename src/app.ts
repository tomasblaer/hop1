import express from "express";
import dotenv from "dotenv";
import { ExtractJwt } from "passport-jwt";
import { Strategy as JwtStrategy } from "passport-jwt";
import { router } from "./routes/api.js";
import { handle404, handleError } from "./lib/handlers.js";
import passport from "passport";
import { getSecretAssert } from "./lib/authorization.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(passport.initialize());
app.use(router);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: getSecretAssert(),
};

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  console.log("payload received", jwt_payload);
  done(null, jwt_payload);

}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use(handle404);

app.use(handleError);

