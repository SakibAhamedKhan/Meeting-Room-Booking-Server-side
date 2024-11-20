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
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  admin_name: process.env.ADMIN_NAME,
  admin_email: process.env.ADMIN_EMAIL,
  admin_password: process.env.ADMIN_PASSWORD,
};
