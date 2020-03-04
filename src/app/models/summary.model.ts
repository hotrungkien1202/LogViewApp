import { Employee } from './employee.model';

export interface Summary{
    block_id: string;
    block_name: string;
    capacity: string;
    employees: Employee[];
}