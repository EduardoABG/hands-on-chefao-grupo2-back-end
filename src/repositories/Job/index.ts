import IRepository from "../IRepository";
import { IJob } from "../../models/Job";
import { Model } from "mongoose";

export default class JobRepository implements IRepository {
  private jobModel: any;
  constructor(jobModel: Model<IJob>) {
    this.jobModel = jobModel;
  }
  async create(payload: any) {}
  async find(payload?: any) {}
  async update(id: any, payload: any, condition?: any) {}
  async findAll(payload?: any) {
    const list = await this.jobModel.find({});
    return list;
  }
  async findById(id: any, payload?: any) {
    return this.jobModel.findById(id);
  }
  async delete(id: any) {}
}
