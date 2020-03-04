import { Task } from '../models/task.model'
export interface Employee{
    emp_id: string;
    emp_available: string;
    emp_type: string;
    emp_rank: string;
    emp_level: string;
    emp_status: string;
    emp_assigned: string;
    tasks : Array<Task>;
}