import IRepository from "../../../repositories/IRepository";
const ObjectId = require("mongoose").Types.ObjectId;

type PayloadJobCreate = {
  name: string;
  description: string;
  salary: number;
  companyName: string;
  status: string;
  date: Date;
};
export default class JobUseCase {
  private repository: IRepository;

  constructor(jobRepository: IRepository) {
    this.repository = jobRepository;
  }
  async createJob(payload: PayloadJobCreate) {
    const jobData = {
      name: payload.name,
      description: payload.description,
      salary: payload.salary,
      companyName: payload.companyName,
      status: payload.status,
      date: payload.date,
    };
    const newJob = await this.repository.create(jobData);
    return newJob;
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

  deleteJob(_id: any) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      return null;
    }
    const jobErase = this.repository.delete(_id);
    return jobErase;
  }
}
