import IRepository from "../IRepository";
import { IJobApplication } from "../../models/JobApplication";
import { Model } from "mongoose";
import CreateJobDTO from "../../modules/Job/useCases/dtos/CreateJobDTO";

export default class JobApplicationRepository implements IRepository {
  private jobApplicationModel: any;

  constructor(jobApplicationModel: Model<IJobApplication>) {
    this.jobApplicationModel = jobApplicationModel;
  }

  async create(payload: CreateJobDTO) {
    return await this.jobApplicationModel.create(payload);
  }

  async find(payload?: any) {
    return await this.jobApplicationModel.find(payload);
  }

  async update(
    id: any,
    payload: {
      status?: string;
      feedback?: string;
      tagsFeedback?: string[];
      applicationDate: Date;
    },
    condition?: any
  ) {
    return await this.jobApplicationModel.updateOne({ _id: id }, payload);
  }

  async findAll(payload?: any) {
    const list = await this.jobApplicationModel.find({});
    return list;
  }

  async findById(id: any, payload?: any) {
    return await this.jobApplicationModel.findById(id);
  }
  
  async findByStatus(status: { $ne: 4}) {
    return await this.jobApplicationModel.find(status);
  };

  async delete(id: any) {
    return await this.jobApplicationModel.deleteOne({ _id: id });
  }
}
