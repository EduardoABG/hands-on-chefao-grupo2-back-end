import IRepository from "../IRepository";
import { Schema } from "mongoose";
import { IJobApplication } from "../../models/JobApplication";
import { IMentoring } from "../../models/Mentoring";
import { IUser } from "../../models/User";
import { IJob } from "../../models/Job";
import { Model } from "mongoose";

export default class MentoringRepository implements IRepository {
  private mentoringModel: any;
  constructor(mentoringModel: Model<IMentoring>) {
    this.mentoringModel = mentoringModel;
  }
  async create(payload: {
    name: string;
    description: string;
    price: number;
  }) {
    return await this.mentoringModel.create(payload);
  }
  async find(payload?: any) {}
  async update(
    id: any,
    payload: {
      name?: string;
      description?: string;
      price?: number;
    },

  ) {
    return await this.mentoringModel.findOneAndUpdate({ _id: id }, payload, {new: true,});

  }
  async findAll(payload?: any) {
    const list = await this.mentoringModel.find({});
    return list;
  }
  async findById(id: any, payload?: any) {
    return this.mentoringModel.findById(id);
  }
  async delete(id: any) {
    return await this.mentoringModel.deleteOne({ _id: id });
  }
}
