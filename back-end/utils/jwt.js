import "dotenv/config";
import jwt from "jsonwebtoken";

const { JWT_SECRET_KEY } = process.env;

export const JWTVerify = (req) => {
  const { token } = req.cookies;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (error, userInfo) => {
      if (error) {
        return reject(error);
      }

      resolve(userInfo);
    });
  });
};

export const JWTSing = (newUserObj) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      newUserObj,
      JWT_SECRET_KEY,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          console.error("Deu algun erro ao assinar o JWT:", error);
          reject(error);
        }

        resolve(token);
      }
    );
  });
};
