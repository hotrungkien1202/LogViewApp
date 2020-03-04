import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Logfile } from '../models/logfile.model'
import { Block } from '../models/block.model';
import { Summary } from '../models/summary.model';
import { MapInfor } from '../models/mapinfo.model';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})
export class LogfileService {

  // SERVER_URL = "http://172.27.169.36:5005";
  SERVER_URL = "http://13.76.0.136:5005";
  constructor(private httpService: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
    })
  }

  public getFilesByFolder(parentFolderName: string, time: string, block: string): Observable<HttpResponse<File[]>> {
    return this.httpService.get<File[]>(this.SERVER_URL + '/filenames/' + parentFolderName + "/" + time + "/" + block, { observe: 'response' });
  }

  public getBlocksByNameAndTime(parentFolderName: string, time: string): Observable<HttpResponse<Block[]>> {
    return this.httpService.get<Block[]>(this.SERVER_URL + '/blocks/' + parentFolderName + "/" + time, { observe: 'response' });
  }

  public getFolderNames(): Observable<HttpResponse<String[]>> {
    return this.httpService.get<String[]>(this.SERVER_URL + '/foldernames', { observe: 'response' });
  }

  public getContentLogFile(parentFolderName: string, fileName: string): Observable<HttpResponse<Logfile>> {
    return this.httpService.get<Logfile>(this.SERVER_URL + '/filecontent/' + parentFolderName + '/' + fileName, { observe: 'response' });
  }

  public downloadInput(parentFolderName: string, fileName: string): Observable<HttpResponse<Logfile>> {
    return this.httpService.get<Logfile>(this.SERVER_URL + '/download/' + parentFolderName + '/' + fileName, { observe: 'response' });
  }

  public getFilesByContract(parentFolderName: string, contract_id: string): Observable<HttpResponse<String[]>> {
    return this.httpService.get<String[]>(this.SERVER_URL + '/contract/' + parentFolderName + "/" + contract_id, { observe: 'response' });
  }

  public sumaryEmployeeByTaskAssined(parentFolderName: string, time: string): Observable<HttpResponse<Summary[]>> {
    return this.httpService.get<Summary[]>(this.SERVER_URL + '/summary/' + parentFolderName + "/" + time, { observe: 'response' });
  }

  public getCoordinateForEmp(parentFolderName: string, block_id: string, emp_id: string, time: string): Observable<HttpResponse<MapInfor[]>> {
    return this.httpService.get<MapInfor[]>(this.SERVER_URL + '/maps/' + parentFolderName + "/" + block_id + "/" + emp_id + "/" + time, { observe: 'response' });
  }

  public getEmpsInBlockCoordinate(parentFolderName: string, block_id: string, time: string): Observable<HttpResponse<MapInfor[]>> {
    return this.httpService.get<MapInfor[]>(this.SERVER_URL + '/map_block_time/' + parentFolderName + "/" + time + "/" + block_id, { observe: 'response' });
  }

  public getAllBlocks(parentFolderName: string, time: string): Observable<HttpResponse<MapInfor[]>> {
    return this.httpService.get<MapInfor[]>(this.SERVER_URL + '/block_all/' + parentFolderName + "/" + time, { observe: 'response' });
  }

  public getLastTime(parentFolderName: string): Observable<HttpResponse<String>> {
    return this.httpService.get<String>(this.SERVER_URL + '/lasttime/' + parentFolderName, { observe: 'response' });
  }

  public getEmployeeInfo(parentFolderName: string, empId: string, block_id: string): Observable<HttpResponse<String>> {
    return this.httpService.get<String>(this.SERVER_URL + '/emp_info/' + parentFolderName + '/' + empId + '/' + block_id, { observe: 'response' });
  }

  public getTaskInfo(parentFolderName: string, request_id: string, file_name: string): Observable<HttpResponse<Task>> {
    return this.httpService.get<Task>(this.SERVER_URL + '/task_info/' + parentFolderName + '/' + request_id + '/' + file_name, { observe: 'response' });
  }

  public countEmpAndTask(parentFolderName: string): Observable<HttpResponse<String>> {
    return this.httpService.get<String>(this.SERVER_URL + '/count_emp/' + parentFolderName, { observe: 'response' });
  }

  public getEmpForTask(folder: string, block_id: string, unique_id: string): Observable<HttpResponse<String>> {
    return this.httpService.get<String>(this.SERVER_URL + "/emp_for_task/" + folder + "/" + block_id + "/" + unique_id, { observe: 'response' });
  }
}
