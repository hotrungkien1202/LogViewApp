import { Component, OnInit, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { LogfileService } from '../services/logfile.service';
import { Logfile } from '../models/logfile.model';
import { Task } from '../models/task.model';
import { Employee } from '../models/employee.model'
import { Block } from '../models/block.model';
import { EmployeeTaskAssigned } from '../models/employeetaskassigned.model';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../models/file.model';
// import { filter } from 'rxjs/operators';
// import { Observable } from 'rxjs';

declare const getMap: any;
declare const getBlockMap: any;
declare const getAllBlocksMap: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  EMP_NAME = ['NVKT', 'KTV'];
  TASK_NAME = ['Bao tri vat ly', 'Bao tri logic', 'Trien khai indoor outdoor', 'Trien khai indoor'];
  folders = [];
  times = ['07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00'];
  folder: any;
  time: string;
  file: File;
  logfiles: any = [];
  logFileContent: Logfile;
  items: number[] = [];
  blocks: any = [];
  block: any;
  nsldtb_block: any;
  employees: Array<Employee> = [];
  load_factor: string = "0";
  file_len: number = 0;
  index_file: number;
  block_id_search: string = "";
  all_blocks: any = [];
  block_name: string = "Name";
  block_model_id: string;
  VERSION = "20190923_1551"
  contract_search: string;
  filecontracts: any = [];
  emp_by_task_assigned: any = [];
  topFiveEmps: any = [];
  notHasContract = false;
  average_distance: number = 0;
  on_time_percent = 0;
  index_block = 0;
  map_emp: any;
  map_block: any;
  block1: any;
  latesttime: String;
  number_of_employee: any;
  number_of_tasks: any;
  res_time: String;
  constructor(private logService: LogfileService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log("production version: ", this.VERSION)
    this.setDefaultValue();
    this.getBlocks();
    this.getLatestTime();
    this.logService.getFolderNames().subscribe(response => {
      this.folders = response.body;
    });
    // this.getSummary();
    this.items = this.range(2, 99, 1);
    this.file_len = 1;
  }

  /**********************
  * To get one range of integer numbers
  **********************/
  range(start, stop, step) {
    let a = [start], b = start;
    while (b < stop) {
      a.push(b += step || 1);
    }
    return a;
  }


  // convert minutes to format(HH:mm)
  parseMinuteToTime(minutes: number) {
    let h = minutes / 60;
    h = Math.floor(h);
    let m = minutes - (h * 60)
    let hh = h.toString().padStart(2, "0");
    let mm = m.toString().padStart(2, "0");
    return hh + ":" + mm;
  }

  /*********
   * To build task time segments, ipnut str full datetime (Y-M-D hh:mi:ss)
   * ******** */
  get_task_time_segments(task_time_str) {
    let tmp_str = task_time_str.trim().split(' ')

  }

  get_current_time_point(time_str) {
    let time_number = this.parseHourToMinute(time_str);
    let minTime = 7 * 60; // start time of day 0%
    let maxTime = 21 * 60; // end time of day 100%
    // convert to percent
    let percent_point = ((time_number - minTime) / (maxTime - minTime)) * 100; // percent from 0 to current time
    percent_point = Math.floor(percent_point)
    // console.log(percent_point);
    return percent_point
  }

  /**********************
  * To build time segments
  **********************/
  get_available_time_segments(available_time_str) {
    let minTime = 7 * 60; // start time of day 0%
    let maxTime = 21 * 60; // end time of day 100%
    let list_time = available_time_str.trim().split(",");
    let emp_start_time = minTime;
    let emp_end_time = maxTime;
    //console.log("================================== : " + available_time_str)
    for (let i in list_time) {
      let firstTime = list_time[i].trim().split("-")[0];
      let secondTime = list_time[i].trim().split("-")[1];
      //console.log("firstTime: " + this.parseHourToMinute(firstTime))
      //console.log("secondTime: " + this.parseHourToMinute(secondTime))
      if (this.parseHourToMinute(firstTime) < emp_end_time) {
        emp_end_time = this.parseHourToMinute(firstTime);
      }
      if (this.parseHourToMinute(secondTime) > emp_start_time) {
        emp_start_time = this.parseHourToMinute(secondTime);
      }
    }
    let l: Array<number> = [];


    // convert to percent
    let start_percent = ((emp_start_time - minTime) / (maxTime - minTime)) * 100; // percent from 0 to startTime
    start_percent = Math.floor(start_percent)
    //console.log("start_percent: " + start_percent)

    let end_percent = start_percent + ((emp_end_time - emp_start_time) / (maxTime - minTime)) * 100 // percent from 0 to startTime + percent from startTime to endTime
    end_percent = Math.ceil(end_percent)
    //console.log("end_percent: " + end_percent)
    l.push(start_percent); // start time
    l.push(end_percent) // end time
    return l;
  }

  /********
   * to get available time
   */
  getAvailableTime(available_time_str) {
    let minTime = 7 * 60; // start time of day 0%
    let maxTime = 21 * 60; // end time of day 100%
    let list_time = available_time_str.trim().split(",");
    let emp_start_time = minTime;
    let emp_end_time = maxTime;
    //console.log("================================== : " + available_time_str)
    for (let i in list_time) {
      let firstTime = list_time[i].trim().split("-")[0];
      let secondTime = list_time[i].trim().split("-")[1];
      if (this.parseHourToMinute(firstTime) < emp_end_time) {
        emp_end_time = this.parseHourToMinute(firstTime);
      }
      if (this.parseHourToMinute(secondTime) > emp_start_time) {
        emp_start_time = this.parseHourToMinute(secondTime);
      }
    }
    let l: Array<string> = [];
    l.push(this.parseMinuteToTime(emp_start_time)); // start time
    l.push(this.parseMinuteToTime(emp_end_time)) // end time
    return l;
  }

  /*****************
   * To test display text in timeline or not
   *****************/
  do_display_text_time(item, val) {
    val = Math.round(val)
    if (item == val) {
      return true;
    }
    return false;
  }

  do_display_res_time(item, val, starting, ending) {
    val = Math.round(val)
    if (item == val) {
      if (item == starting || item == ending) {
        return false;
      }
      return true;
    }
    return false;
  }

  setStyleForTask(emp_id, type, sub_type, sub_type2, is_history_task) {
    let style = {
      'background-color': type == 1 ? '#28a745' : '#ffc107',
      'border-left': emp_id == '' ? '5px solid red' : '',
      'border-right': sub_type == '2' ? '5px solid black' : sub_type2 == 11 ? '5px solid black' : ''
    };
    return style;
  }

  setStyleForEmp(emp) {
    let style = {
      'color': emp.emp_type == '1' ? '' : '#000000',
      'border-color': this.isDangerEmployee(emp) == 1 ? '#dc3545' : '#17a2b8'
    }

    return style;
  }

  setStyleForTop(obj: any, listEmp: any[]) {
    let style = {
      'color': this.indexOfOject(obj, listEmp) < 10 ? 'red' : '#8A2BE2'
    }
    return style;
  }
  // get all log file name by folder and time now in combobox
  getLogFile() {
    let varTime = this.time.split("-", 2)[0].split(":")[0];

    if (this.block != null) {
      this.logService.getFilesByFolder(this.folder, varTime, this.block.block_id).subscribe(response => {
        this.logfiles = response.body;
        this.file = this.logfiles[0];
        this.res_time = this.file.res_time.split(" ")[1].substr(0, 5);
        this.index_file = 0;
        this.getFetchDataButtonClick();
      });
    }
  }

  getBlocks() {
    let varTime = this.time.split("-", 2)[0].split(":")[0];
    this.logService.getBlocksByNameAndTime(this.folder, varTime).subscribe(response => {
      this.blocks = response.body;
      this.block = this.blocks[0];
      this.all_blocks = this.blocks;
      this.index_block = 0;
      this.getLogFile();
    })
  }
  // set value for combobox when refresh website
  setDefaultValue() {
    let now = new Date();
    this.folder = formatDate(now.toString(), "yyyyMMdd", "en");
    let timeStart = now.getHours();
    if (timeStart >= 10) {
      this.time = timeStart + ":00 - " + (timeStart + 1) + ":00";
    }
    else {
      if (timeStart == 9) {
        this.time = "0" + timeStart + ":00 - " + (timeStart + 1) + ":00";
      }
      else {
        this.time = "0" + timeStart + ":00 - 0" + (timeStart + 1) + ":00";
      }

    }
  }

  // action when change folder combobox
  changeFolder(val: any) {
    this.folder = val;
    this.getBlocks();
    this.getSummary();
  }

  // get action when change time combobox
  changeTime(val: any) {
    this.time = val;
    this.getBlocks();
    this.getSummary();
  }

  // get action when change file combobox
  changeFile(val: any) {
    this.file = val;
    this.getFetchDataButtonClick();
  }

  changeBlock(val: any) {
    this.block = val;
    this.getLogFile();
  }
  // get action when click fetch data button
  getFetchDataButtonClick() {
    // console.log(this.file);
    if (this.file != null && this.file != undefined) {
      this.logService.getContentLogFile(this.folder, this.file.file_name).subscribe(response => {
        this.logFileContent = response.body;
        this.employees = this.logFileContent.employees;
        // console.log(this.logFileContent)
      });
      this.file_len = 1;
    } else {
      this.file_len = 0;
    }
  }

  // convert time from format(HH:mm:ss) to number of minutes
  parseHourToMinute(hours: string) {
    if ((hours + '').includes(":")) {
      let timeHour = hours.trim().split(":")[0];
      let timeMin = hours.trim().split(":")[1];
      return (parseInt(timeHour) * 60 + parseInt(timeMin));
    }
    return 0;
  }

  getTimePerDay(startTime: number, endTime: number) {
    let totalTime = (endTime - startTime);
    return (totalTime / (14 * 60)) * 100;
  }

  getRedProgress(checkinTime: string, checkoutTime: string) {
    let minTime = 7 * 60;
    let time_checkin = checkinTime.trim().split(" ")[1];
    let time_checkout = checkoutTime.trim().split(" ")[1];
    let ll: Array<number> = []
    ll.push(this.getTimePerDay(minTime, this.parseHourToMinute(time_checkin)));
    ll.push(this.getTimePerDay(this.parseHourToMinute(time_checkin), this.parseHourToMinute(time_checkout)))
    return ll;
  }

  getAvailableProgress(emp: Employee) {
    let minTime = 21 * 60;
    let maxTime = 7 * 60;
    let available_time = emp.emp_available;
    let list_time = available_time.trim().split(",");
    for (let i in list_time) {
      let firstTime = list_time[i].trim().split("-")[0];
      let secondTime = list_time[i].trim().split("-")[1];
      if (this.parseHourToMinute(firstTime) < minTime) {
        minTime = this.parseHourToMinute(firstTime);
      }
      if (this.parseHourToMinute(secondTime) > maxTime) {
        maxTime = this.parseHourToMinute(secondTime);
      }
    }
    let l: Array<number> = [];
    l.push(this.getTimePerDay(420, minTime));
    l.push(this.getTimePerDay(minTime, maxTime))
    return l;
  }

  getIndexEmployee(emp: Employee) {
    try {
      return parseInt(emp.emp_type) - 1;
    }
    catch (err) {
      console.log(err.message);
    }
  }

  getIndexTask(task: Task) {
    try {
      return parseInt(task.sub_type_1) - 1;
    } catch (error) {
      console.log(error.message);
    }
  }

  isLate(late_time: string) {
    if (late_time.charAt(0) == "-") {
      return 0;
    }
    else {
      let tt1 = late_time.trim().split(":")[0];
      let tt2 = late_time.trim().split(":")[1]
      let totalMinute = parseInt(tt1) * 60 + parseInt(tt2)
      if (totalMinute < 5) {
        return 0;
      }
    }
    return 1;
  }

  getMinTimeTaskOfEmp(tasks: Task[]) {
    let minTime = 21 * 60;
    for (let t in tasks) {
      if (tasks[t].assigned == "2" && this.parseHourToMinute(tasks[t].start_time.trim().split(" ")[1]) < minTime) {
        minTime = this.parseHourToMinute(tasks[t].start_time.trim().split(" ")[1]);
      }
    }
    if (tasks.length == 0 || typeof tasks == 'undefined') {
      return 0;
    }
    return minTime;
  }

  isDangerEmployee(emp: Employee) {
    let minTime;
    for (let i in this.employees) {
      if (this.employees[i].emp_id == emp.emp_id) {
        minTime = this.getMinTimeTaskOfEmp(emp.tasks);
      }
    }
    // console.log(emp.emp_id, " ", minTime);
    let time_now = new Date();
    let m = time_now.getHours() * 60 + time_now.getMinutes();
    if (minTime - m >= 20) {
      return 1;
    }
    return 0;
  }

  nextBlock() {
    this.index_block += 1;
    if (this.index_block < this.blocks.length) {
      this.block = this.blocks[this.index_block]
      this.getLogFile();
    }
    else {
      alert('This is last block');
    }
  }
  actionNext() {
    this.index_file += 1;
    if (this.index_file < this.logfiles.length) {
      this.file = this.logfiles[this.index_file];
    }
    else {
      alert("Choose new block !!!!");
    }
    this.logService.getContentLogFile(this.folder, this.file.file_name).subscribe(response => {
      this.logFileContent = response.body;
      this.employees = this.logFileContent.employees;
    });
  }

  actionDownload() {
    var element = document.createElement('a');
    this.logService.downloadInput(this.folder, this.file.file_name).subscribe(response => {
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(response.body, null, 4)));
      element.setAttribute('download', this.file.file_name);
      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    })
  }

  searchBlock() {
    // console.log(this.block_id_search);
    let rs: Block[] = [];
    let key: string = "";
    if (this.block_id_search.includes("*") && this.block_id_search.length < 6) {
      key = this.block_id_search.substring(0, this.block_id_search.length - 1)
    }
    else {
      if (this.block_id_search.length != 6) {
        alert("Wrong format. Please enter input corectly or format like (x*) !!!")
      }
      else {
        key = this.block_id_search;
      }
    }

    for (let i in this.all_blocks) {
      var t = this.all_blocks[i].block_id.toString();
      if (key == t.substring(0, key.length)) {
        rs.push(this.all_blocks[i]);
      }
    }
    if (rs.length > 0) {
      this.blocks = rs;
      this.block = this.blocks[0];
      this.getLogFile();
    }
    else {
      alert("This block does not exist !");
    }
    this.block_id_search = "";
  }

  searchContract() {
    //console.log(this.contract_search);
    this.filecontracts = [];
    this.logService.getFilesByContract(this.folder, this.contract_search).subscribe(response => {
      this.filecontracts = response.body;
      if(this.filecontracts.length == 0 || this.filecontracts == null){
        alert("Not found");
      }
    })
    this.contract_search = "";
  }

  getSummary() {
    var time_hour = this.time.trim().split("-")[0].split(":")[0];
    this.logService.sumaryEmployeeByTaskAssined(this.folder, time_hour).subscribe(response => {
      this.emp_by_task_assigned = response.body;
      this.topFiveEmps = this.searchTop5TaskAssignedEmployee();
    })

    this.logService.countEmpAndTask(this.folder).subscribe(response =>{
      let result = response.body;
      this.number_of_employee = result.split("_")[0]
      this.number_of_tasks = result.split("_")[1]
      // console.log(this.number_of_employee, this.number_of_tasks);
    }

    )
  }

  searchTop5TaskAssignedEmployee() {
    let result: EmployeeTaskAssigned[] = [];
    for (let i in this.emp_by_task_assigned) {
      for (let j in this.emp_by_task_assigned[i].employees) {
        result.push(new EmployeeTaskAssigned(this.emp_by_task_assigned[i].block_id, this.emp_by_task_assigned[i].block_name, this.emp_by_task_assigned[i].employees[j].emp_id, this.emp_by_task_assigned[i].employees[j].emp_assigned, this.emp_by_task_assigned[i].employees[j].emp_type, this.emp_by_task_assigned[i].employees[j].warning));
        // console.log(this.emp_by_task_assigned[i])
        // this.number_of_tasks += this.emp_by_task_assigned[i].employees[j].emp_assigned;
      }
    }
    // this.number_of_employee = result.length;
    result.sort((a, b) => (a.emp_assigned > b.emp_assigned) ? 1 : -1).reverse();
    if (result.length > 20) {
      return result.slice(0, 10).concat(result.slice(result.length - 10, result.length));
    }

    return result;
  }

  lengthOfList(l: any[]) {
    return l.length;
  }

  indexOfOject(obj: any, l: any[]) {
    for (let i in l) {
      if (l[i].emp_id == obj.emp_id) {
        return i;
      }
    }
    return 0;
  }

  showAllBlocksMap() {
    try {
      getAllBlocksMap(this.emp_by_task_assigned)
    } catch (err) { }
  }

  showBlockMap(block) {
    try {
      let varTime = this.time.split("-", 2)[0].split(":")[0];
      this.logService.getEmpsInBlockCoordinate(this.folder, block.block_id, varTime).subscribe(response => {
        this.block1 = block.block_name
        this.nsldtb_block = block.capacity
        let res = response.body;
        getBlockMap(res)
      });
    } catch (error) { }
  }

  showMap(block_id: string, emp_id: string) {
    let varTime = this.time.split("-", 2)[0].split(":")[0];
    this.logService.getCoordinateForEmp(this.folder, block_id, emp_id, varTime).subscribe(response => {
      let coords = response.body;
      let s = 0;
      let kpi = 0;
      for (let i in coords) {
        s += Number(coords[i].emp_distance);
        if (parseInt(coords[i].late_time) >= 0) {
          kpi += 1;
        }
      }
      let tmp1 = 0;
      let tmp2 = 0;
      if (coords.length > 0) {
        tmp1 = s / coords.length
        tmp2 = kpi / coords.length
      }
      this.average_distance = Number(tmp1.toFixed(2));
      this.on_time_percent = Number(tmp2.toFixed(4)) * 100;
      // console.log(this.average_distance)
      getMap(coords);
    })
    let b = this.all_blocks.find(obj => obj.block_id == block_id)
    this.map_emp = emp_id;
    if(b != null || b != undefined){
      this.map_block = b.block_name;
    }
    else{
      this.map_block = "N/A";
    }
    // this.getLogFile();
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // console.log("a")
  }

  hrefLink(s: string) {
    return "home#" + s;
  }

  setClassByLoadFactor(loadFactor) {
    var strClassName = 'text-dark';
    if (loadFactor >= 75) {
      strClassName = 'text-danger font-weight-bold';
    } else if (loadFactor >= 50 && loadFactor < 75) {
      strClassName = 'text-warning';
    }
    return strClassName;
  }

  isLoadingSumary() {
    if (this.emp_by_task_assigned.length > 0) return false;
    return true;
  }

  getLatestTime() {
    this.logService.getLastTime(this.folder).subscribe(response => {
      this.latesttime = response.body;
    })
  }

  showTaskInfor() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }


  logout() {
    sessionStorage.setItem('isLoggedIn', 'false')
    this.router.navigate(['/']);
  }

  get_unique_id(request_id, type){
    return request_id + "_" + type;
  }

  isValidAvailableTime(available){
    if(null == available || undefined == available || !available.includes("-") || available.length < 13){
      return false;
    }
    return true;
  }
}
