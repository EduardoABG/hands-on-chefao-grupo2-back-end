import IRepository from "../IRepository";
import { IJob } from "../../models/Job";
import { Model } from "mongoose";

export default class JobRepository implements IRepository {
  private jobModel: any;
  constructor(jobModel: Model<IJob>) {
    this.jobModel = jobModel;
  }
  async create(payload: any) {
    return await this.jobModel.create(payload);
  }
  async find(payload?: any) {}
  async update(
    id: any,
    payload: {
      name: string;
      description: string;
      salary: number;
      companyName: string;
      status: string;
      date: Date;
      location: string;
      jobPicture: string;
    }
  ) {
    await this.jobModel.findOneAndUpdate({ _id: id }, payload, { new: true });
    const result = await this.findById(id);
    return result;
  }
  async findAll(payload?: any) {
    return await this.jobModel.find(payload);
  }
  async findById(id: any, payload?: any) {
    return await this.jobModel.findById(id);
  }
  async delete(id: any) {
    return await this.jobModel.deleteOne({ _id: id });
  }
}
