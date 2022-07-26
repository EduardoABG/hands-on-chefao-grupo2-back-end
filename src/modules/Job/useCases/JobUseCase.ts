import IRepository from "../../../repositories/IRepository";
const ObjectId = require("mongoose").Types.ObjectId;

export default class JobUseCase {
  private repository: IRepository;

  constructor(jobRepository: IRepository) {
    this.repository = jobRepository;
  }
  async listAll() {
    const jobList = await this.repository.findAll();
    return jobList;
  }

  listJob(_id: any) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      return null;
    }
    const listJob = this.repository.findById(_id);
    return listJob;
  }
}
