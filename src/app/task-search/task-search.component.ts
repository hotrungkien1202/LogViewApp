import { Component, OnInit } from '@angular/core';
import { LogfileService } from '../services/logfile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  constructor(private logService: LogfileService, private route: ActivatedRoute, private router: Router) { }
  logRespone: any;
  selectedFolder: any;
  block_id: any;
  unique_id: any;
  searchFound: any;
  event_log : any;
  EVENTNAME = ["Assigned Task", "Accepted Task", "Rejected Task", "Check in", "Monitoring", "Check out"]
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedFolder = params.get("folder");
      this.block_id = params.get("block_id");
      this.unique_id = params.get("unique_id")
      this.getLogResponse();
    });
  }

  getLogResponse(){
    this.logService.getEmpForTask(this.selectedFolder, this.block_id, this.unique_id).subscribe(res =>{
      this.logRespone = res.body;
      this.event_log = this.logRespone.event_log;
      this.searchFound = true;
      console.log(this.event_log)
    })
  }

  getColorByCode(code){
    switch(code){
      case "1":
        return '#228B22';
      case "2":
        return '#0000CD';
        
      case "3":
        return '#DC143C';
        
      case "4":
        return '#FFD700';
        
      case "5":
        return '#4B0082';
        
      case "6":
        return '#6495ED';
    }
  }

  setStyleForText(code){
    let style = {
      'color': this.getColorByCode(code),
      'font-weight': 'bold'
    }
    return style;
  }

  logout() {
    sessionStorage.setItem('isLoggedIn', 'false')
    this.router.navigate(['/']);
  }
}
