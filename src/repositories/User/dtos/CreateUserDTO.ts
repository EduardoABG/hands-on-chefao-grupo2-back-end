export default interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  profilePicture: string;
}