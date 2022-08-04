import IRepository from "../../../repositories/IRepository";
import IJobApplicationRepository from "../../../repositories/JobApplication/IJobApplicationRepository"
import ListAllDTO from "./dtos/ListAllDTO";
import CreateJobDTO from "./dtos/CreateJobDTO";
import UpdateJobDTO from "./dtos/UpdateJobDTO";
import AppError from "../../../errors/AppError";
const ObjectId = require("mongoose").Types.ObjectId;

export default class JobUseCase {
  private JobRepository: IRepository;
  private JobApplicationRepository: IJobApplicationRepository

  constructor(jobRepository: IRepository, jobApplicationRepository: IJobApplicationRepository) {
    this.JobRepository = jobRepository;
    this.JobApplicationRepository = jobApplicationRepository;
  }

  async createJob(payload: CreateJobDTO) {
    const newJob = await this.JobRepository.create(payload as CreateJobDTO);
    return newJob;
  }

  async updateJob(id: string, payload: UpdateJobDTO) {

    if(!ObjectId.isValid(id)) throw new AppError(400, "Id invalido");

    const hasJob = await this.JobRepository.findById(id);
    if(!hasJob) throw new AppError(404, "Vaga não encontrada")

    return await this.JobRepository.update(id, payload);
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

    return await this.JobRepository.findAll(dataObject);
  }

  async listJob(id: any) {
    if(!ObjectId.isValid(id)) throw new AppError(400, "Id invalido");

    const jobList = await this.JobRepository.findById(id);
    if(!jobList) throw new AppError(404, "Vaga não encontrada");

    return jobList;
  }

  async deleteJob(id: any) {
    if(!ObjectId.isValid(id)) throw new AppError(400, "Id invalido");

    return await this.JobRepository.delete(id);
  }

  async candidatesCounter(jobId: string) {
    if(!ObjectId.isValid(jobId)) throw new AppError(400, "Id invalido");

    const hasJob = await this.JobRepository.findById(jobId);
    if(!hasJob) { throw new AppError(400, "Id invalido") }

    return await this.JobApplicationRepository.count(jobId)
  }
}
