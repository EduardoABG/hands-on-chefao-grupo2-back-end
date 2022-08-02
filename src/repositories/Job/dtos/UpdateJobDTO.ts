export default interface UpdateJobDTO {
  name?: string;
  description?: string;
  salary?: number;
  companyName?: string;
  status?: string;
  date?: Date;
  location?: string;
  jobPicture?: string;
  proficiency?: string;
  workingTime?: string;
  workingMode?: string;
  hiringRegime?: string;
  stage?: [{
    title: string,
	  numberOfCandidates: number,
	  status: string,
  }];
}