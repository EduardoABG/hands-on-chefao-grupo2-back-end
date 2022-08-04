export default interface JobApplicationUpdateDTO {
  status?: number;
  feedback?: {
    letter?:  string,
    area?: [{
	    tittle?: string,
	    content?: [{
	      text?: string,
	      link?: string,
	    }]
	  }]
  };
};