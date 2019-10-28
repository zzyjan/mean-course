import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class SystemService {

  constructor(private http: HttpClient) {}

  getBanks() {
    return this.http.get<{message: string, bankList: any}>('http://localhost:3000/api/banks/getBanks');
  }

  getIcbcBranches() {
    return this.http.get<{message: string, branchList: any}>('http://localhost:3000/api/banks/getIcbcBranches');
  }

}
