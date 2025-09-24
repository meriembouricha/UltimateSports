import { Complaint } from "./complaint";

export class Response {
    idResponse: number;
    complaint: Complaint;
    descResponse: string;

    constructor(idResponse: number, complaint: Complaint, descResponse: string) {
        this.idResponse = idResponse;
        this.complaint = complaint;
        this.descResponse = descResponse;
    }
}