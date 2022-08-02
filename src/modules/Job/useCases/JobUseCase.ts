import IRepository from "../../../repositories/IRepository";
import ListAllDTO from "./dtos/ListAllDTO";
import CreateJobDTO from "./dtos/CreateJobDTO";
import UpdateJobDTO from "./dtos/UpdateJobDTO";
import AppError from "../../../errors/AppError";
const ObjectId = require("mongoose").Types.ObjectId;

export default class JobUseCase {
  private repository: IRepository;

  constructor(jobRepository: IRepository) {
    this.repository = jobRepository;
  }

  async createJob(payload: CreateJobDTO) {
    const newJob = await this.repository.create(payload as CreateJobDTO);
    return newJob;
  }

  async updateJob(id: string, payload: UpdateJobDTO) {

    if(!ObjectId.isValid(id)) throw new AppError(400, "Id invalido");

    const hasJob = await this.repository.findById(id);
    if(!hasJob) throw new AppError(404, "Vaga não encontrada")

    return await this.repository.update(id, payload);
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

  async listJob(id: any) {
    if(!ObjectId.isValid(id)) throw new AppError(400, "Id invalido");

    const jobList = await this.repository.findById(id);
    if(!jobList) throw new AppError(404, "Vaga não encontrada");

    return jobList;
  }

  async deleteJob(id: any) {
    if(!ObjectId.isValid(id)) throw new AppError(400, "Id invalido");

    return await this.repository.delete(id);
  }
}
