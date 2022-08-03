export default interface IAuthRepository {
  find(payload?: any): Promise<any>;
  count(payload?: any): Promise<any>;
}
