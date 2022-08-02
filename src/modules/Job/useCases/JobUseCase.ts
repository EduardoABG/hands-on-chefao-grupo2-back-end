import IRepository from "../../../repositories/IRepository";
import ListAllDTO from "./dtos/ListAllDTO";
import CreateJobDTO from "./dtos/CreateJobDTO";
import { pathToFileURL } from "url";
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
  async createJob(payload: CreateJobDTO) {
    const jobData = {
      name: payload.name,
      description: payload.description,
      salary: payload.salary,
      companyName: payload.companyName,
      status: payload.status,
      date: payload.date,
    };
    const newJob = await this.repository.create(payload as CreateJobDTO);
    return newJob;
  }

  async listAll(payload?: ListAllDTO) {

    const dataObject: {
      $text?: Object;
      description?: Object;
      proficiency?: string;
      workingTime?: string;
      workingMode?: string;
      hiringRegime?: string;
    } = {};

    if(payload?.search) { dataObject.$text = { $search : payload?.search } };
    if(payload?.proficiency) dataObject.proficiency = payload.proficiency;
    if(payload?.workingtime) dataObject.workingTime = payload.workingtime;
    if(payload?.workingmode) dataObject.workingMode = payload.workingmode;
    if(payload?.hiringregime) dataObject.hiringRegime = payload.hiringregime;

    return await this.repository.findAll(dataObject);
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
