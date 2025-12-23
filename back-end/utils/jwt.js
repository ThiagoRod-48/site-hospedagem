import "dotenv/config";
import jwt from "jsonwebtoken";

const { JWT_SECRET_KEY } = process.env;
export const JWTVerify = (req) => {
  const { token } = req.cookies;
  if (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfor) => {
        if (error) {
          console.error("Deu algun erro ao verificar o JWT:", error);
          reject(error);
        }

        resolve(userInfor);
      });
    });
  } else {
    return null;
  }
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
