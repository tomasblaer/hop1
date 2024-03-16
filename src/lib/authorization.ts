import { user } from "@prisma/client";
import jwt from "jsonwebtoken";

export function getSecretAssert(): string {
  let secret = process.env.SECRET;
  if (!secret) {
    console.error("No secret found, please see .env example file");
    process.exit(1);
  }
  return secret;
}

export function loginHandler(req: any, res: any) {
  const { email, password } = req.body;
  if (email && password) {
    let user: user | null = null;
    
    const token = jwt.sign({ sub: email }, getSecretAssert());
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
}