import { ComplaintResponse } from "./complaintResponse";
import { User } from "./user";

export class Complaint {
    idComplaint!: number;
    user!: User | null;
    titleComplaint!: string;
    descComplaint!: string;
    status!: boolean; 
    response?: ComplaintResponse | null; 
}
