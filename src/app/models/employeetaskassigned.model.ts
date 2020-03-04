import { emptyScheduled } from 'rxjs/internal/observable/empty';

export class EmployeeTaskAssigned {
    block_id: string;
    block_name: string;
    emp_id: string;
    emp_assigned: string;
    emp_type: number;
    warning: number;

    constructor(block_id, block_name, emp_id, emp_assigned, emp_type, warning) {
        this.block_id = block_id;
        this.block_name = block_name;
        this.emp_id = emp_id;
        this.emp_assigned = emp_assigned;
        this.emp_type = emp_type;
        this.warning = warning;
    }
}