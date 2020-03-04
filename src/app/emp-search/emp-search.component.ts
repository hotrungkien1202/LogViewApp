import { Component, OnInit } from '@angular/core';
import { LogfileService } from '../services/logfile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emp-search',
  templateUrl: './emp-search.component.html',
  styleUrls: ['./emp-search.component.css']
})
export class EmpSearchComponent implements OnInit {

  folders = [];
  selectedFolder: any = null;
  inputedEmpId: any = null;
  searchFound: any;
  empResponse: any = null;
  task: any;
  block_id: any = null;
  constructor(private logService: LogfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    var setSelected = true;
    this.route.paramMap.subscribe(params => {
      // console.log(params.get("folder"));
      // console.log(params.get("emp_id"));
      this.selectedFolder = params.get("folder");
      this.inputedEmpId = params.get("emp_id");
      this.block_id = params.get("block_id");
      setSelected = false;
      this.searchEmployee();
    });
  }


  searchEmployee() {
    // console.log(this.isNullOrEmpty(this.selectedFolder));
    // console.log(this.isNullOrEmpty(this.inputedEmpId));    
    if (!this.isNullOrEmpty(this.selectedFolder) && !this.isNullOrEmpty(this.inputedEmpId)) {
      this.logService.getEmployeeInfo(this.selectedFolder, this.inputedEmpId, this.block_id).subscribe(res => {
        this.empResponse = null;
        this.searchFound = null;
        this.empResponse = res.body;
        console.log(this.empResponse);


        if (this.isNullOrEmpty(this.empResponse.emp_id)) {
          this.searchFound = false;
        } else {
          this.searchFound = true;
        }
        // console.log(this.searchFound)
        // console.log(this.empResponse)
      });

    }
  }

  isNullOrEmpty(val) {
    return (val === undefined || val == null || val.toString().trim().length <= 0) ? true : false;
  }

  getTaskInfo(parentFolder, request_id, file_name) {
    this.logService.getTaskInfo(parentFolder, request_id, file_name).subscribe(res => {
      this.task = res.body;
    })
  }

  setStyleDotted(event_code) {
    console.log(event_code)
    let style = {
      'boder-bottom': event_code == '6' ? '5px solid black' : '5px solid red'
    };
    console.log(style)
    return style;
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false')
    // this.router.navigate(['/']);
  }
}
