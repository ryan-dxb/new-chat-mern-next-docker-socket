import * as jose from "jose";
import { setCookie } from "cookies-next";

export const secret = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_SESSION_SECRET as string
);

export interface Session extends jose.JWTPayload {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

export async function createSession(session: Session) {
  console.log("createSession", session);

  const token = await new jose.SignJWT(session)
    .setExpirationTime("7d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

  setCookie("session-token", token, {});
}
