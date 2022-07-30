import IRepository from "../../../repositories/IRepository";
const ObjectId = require("mongoose").Types.ObjectId;

type PayloadMentoringCreate = {
  name: string;
  description: string;
  price: number;
};
type PayloadMentoringUpdate = {
  name: string;
  description: string;
  price: number;
};
export default class MentoringUseCase {
  private repository: IRepository;

  constructor(mentoringRepository: IRepository) {
    this.repository = mentoringRepository;
  }
  async createMentoring(payload: PayloadMentoringCreate) {
    const mentoringData = {
      name: payload.name,
      description: payload.description,
      price: payload.price,
    };
    const newMentoring = await this.repository.create(mentoringData);
    return newMentoring;
  }

  async updateMentoring(_id: any, payload: PayloadMentoringUpdate) {
    const mentoringData = {
      name: payload.name,
      description: payload.description,
      price: payload.price,
    };
    const updateMentoring = this.repository.update(_id, mentoringData);
    return updateMentoring;
  }
  async listAll() {
    const mentoringList = await this.repository.findAll();
    return mentoringList;
  }

  listMentoring(_id: any) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      return null;
    }
    const listMentoring = this.repository.findById(_id);
    return listMentoring;
  }

  async deleteMentoring(_id: any) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      return null;
    }
    const mentoringErase = this.repository.delete(_id);
    return mentoringErase;
  }
}
