import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const adminCredential = {
  name: config.admin_name,
  email: config.admin_email,
  password: config.admin_password,
  phone: "",
  address: "",
  role: USER_ROLE.ADMIN,
};

const seedAdmin = async () => {
  const isAdminExists = await User.findOne({ role: USER_ROLE.ADMIN });
  if(!isAdminExists){
    await User.create(adminCredential);
  }
};

export default seedAdmin;
