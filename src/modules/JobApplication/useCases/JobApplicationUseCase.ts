import IJobApplicationRepository from "../../../repositories/JobApplication/IJobApplicationRepository";
import IRepository from "../../../repositories/IRepository";
import AppError from "../../../errors/AppError";
const ObjectId = require("mongoose").Types.ObjectId;

type CreateJobApplicationDTO = {
  userId: string;
  jobId: string;
};

type PayloadJobApplicationUpdate = {
  status: number;
  feedback: {
    letter:  string,
    area: [{
	    tittle: string,
	    content: [{
	      text: string,
	      link: string,
	    }]
	  }]
  };
};
export default class JobUseCase {
  private jobApplicationRepository: IJobApplicationRepository;
  private jobRepository: IRepository;

  constructor(jobApplicationRepository: IJobApplicationRepository, jobRepository: IRepository) {
    this.jobApplicationRepository = jobApplicationRepository;
    this.jobRepository = jobRepository;
  }
  async createJobApplication(payload: CreateJobApplicationDTO) {

    const currentDate = new Date()

    const job = await this.jobRepository.findById(payload.jobId);
    if(!job) { throw new AppError(404, "Vaga não encontrada") }

    const jobApplicationData = {
      status: 0,
      applicationDate: currentDate.toISOString(),
      user: payload.userId,
      job: {
        _id: job._id,
        name: job.name,
        companyName: job.companyName
      },
    };

    const newJobApplication = await this.jobApplicationRepository.create(jobApplicationData);
    if(!newJobApplication) { throw new Error() }

    return newJobApplication;
  }

  async updateJobApplication(_id: any, payload: PayloadJobApplicationUpdate) {
    const jobApplicationData = {
      status: payload.status,
      feedback: payload.feedback,
    };
    const updateJobApplication = this.jobApplicationRepository.update(
      _id,
      jobApplicationData
    );
    return updateJobApplication;
  }
  async listAll(id: string) {
    const jobApplicationList = await this.jobApplicationRepository.find({ user: id });
    return jobApplicationList;
  }

  async listInProgress(id: string) {
    const inProgressList = await this.jobApplicationRepository.find({ user: id, status: { $ne: 4} });
    return inProgressList;
  }

  async listFinished(id: string) {
    const inProgressList = await this.jobApplicationRepository.find({ user: id, status: 4 });
    return inProgressList;
  }

  async listJobApplication(_id: any, userId: string) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) {
      throw new AppError(400, "Id invalido");
    }
    const jobApplication = await this.jobApplicationRepository.findById(_id);
    if(jobApplication.user != userId) {
      throw new AppError(403, "Não autorizado");
    }
    return jobApplication;
  }

  async deleteJobApplication(_id: any, userId: string) {
    const isValidId = ObjectId.isValid(_id);
    if (!isValidId) { throw new AppError(404, "Id inválido") }

    const jobApplication = await this.jobApplicationRepository.findById(_id);
    if(jobApplication.user != userId) { throw new AppError(403, "Não autorizado") }

    return await this.jobApplicationRepository.delete(_id);
  }

  async dashboard(userId: string) {
    const views = await this.jobApplicationRepository.dashboardCount({  status: 1 });
    const inProgress = await this.jobApplicationRepository.dashboardCount({ status: { $ne: 4} });
    const finished = await this.jobApplicationRepository.dashboardCount({ status: 4 });

    return { views: views, inProgress: inProgress, finished: finished }
  }
}
