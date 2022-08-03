export default interface IRepository {
  create(payload: any): Promise<any>;
  update(id: any, payload: any, condition?: any): Promise<any>;
  findAll(payload?: any): Promise<any>;
  findById(payload?: any, id?: any): Promise<any>;
  findByStatus(status: number): Promise<any>;
  delete(id: any): Promise<any>;
}