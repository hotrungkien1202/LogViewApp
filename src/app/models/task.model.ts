export class Task{
    request_id : string;
    number_of_emp: string;
    start_time: string;
    checkin_time: string;
    checkout_time: string;
    type: string;
    sub_type_1: string;
    assigned : string;
    manual_priority: string;
    late_time: string;
    appointmentdate: string;
    reason_out_case: string;
    sub_type_2: string;
    emp_speciallized: string;
    contract: string;
    priority: string;
    appoimentdate2: string;
    is_history_task: string;
    constructor(request_id, checkin_time, checkout_time, task_type, sub_type, manual_priority, late_time, appointmentdate, reason_out_case, sub_type2, emp_speciallized, contract, appoimentdate2, priority, is_history_task){
        this.request_id = request_id;
        this.checkin_time = checkin_time;
        this.checkout_time = checkout_time;
        this.type = task_type;
        this.manual_priority = manual_priority;
        this.sub_type_1 = sub_type;
        this.late_time = late_time;
        this.appointmentdate = appointmentdate;
        this.reason_out_case = reason_out_case;
        this.sub_type_2 = sub_type2;
        this.emp_speciallized = emp_speciallized;
        this.contract = contract;
        this.appoimentdate2 = appoimentdate2;
        this.priority = priority;
        this.is_history_task = is_history_task;
    }
}