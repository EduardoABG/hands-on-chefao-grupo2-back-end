import IRepository from "../../../repositories/IRepository";
const ObjectId = require("mongoose").Types.ObjectId;

type PayloadJobApplicationCreate = {
  status: string;
  feedback: string;
  tagsFeedback: string[];
  applicationDate: Date;
  user: number;
  job: {
    _id: number;
    name: string;
    companyName: string;
  };
};
type PayloadJobApplicationUpdate = {
  status: string;
  feedback: string;
  tagsFeedback: string[];
};
export default class JobUseCase {
  private repository: IRepository;

  constructor(jobRepository: IRepository) {
    this.repository = jobRepository;
  }
  async createJobApplication(payload: PayloadJobApplicationCreate) {
    const jobApplicationData = {
      status: payload.status,
      feedback: payload.feedback,
      tagsFeedback: payload.tagsFeedback,
      applicationDate: payload.applicationDate,
      user: payload.user,
      job: payload.job,
    };
    const newJobApplication = await this.repository.create(jobApplicationData);
    return newJobApplication;
  }

  async updateJobApplication(_id: any, payload: PayloadJobApplicationUpdate) {
    const jobApplicationData = {
      status: payload.status,
      feedback: payload.feedback,
      tagsFeedback: payload.tagsFeedback,
    };
    const updateJobApplication = this.repository.update(
      _id,
      jobApplicationData
    );
    return updateJobApplication;
  }
  async listAll() {
    const jobApplicationList = await this.repository.findAll();
    return jobApplicationList;
  }

  listJobApplication(_id: any) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      return null;
    }
    const listJobApplication = this.repository.findById(_id);
    return listJobApplication;
  }

  deleteJobApplication(_id: any) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      return null;
    }
    const jobApplicationErase = this.repository.delete(_id);
    return jobApplicationErase;
  }
}
