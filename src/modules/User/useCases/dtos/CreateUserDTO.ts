export default interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  profilePicture: {
    type: string;
    resource: string;
  };
};