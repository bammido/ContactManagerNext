import { SignJWT, jwtVerify } from "jose";
import { getToken } from "./service/users";
import { contactManagerNest } from "./service/apis/contactManagerNest";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(data: { email: string, password: string }) {
  const response = await getToken(data);

  contactManagerNest.defaults.headers['token'] =  response?.data?.token

  return {token: response?.data?.token, status: response?.response?.status}
}