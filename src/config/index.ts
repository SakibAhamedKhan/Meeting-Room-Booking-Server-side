import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expries: process.env.JWT_ACCESS_EXPRIES,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expries: process.env.JWT_REFRESH_EXPRIES,
  node_env: process.env.NODE_ENV,

  admin_name: process.env.ADMIN_NAME,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
};
