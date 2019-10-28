import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemService } from '../system.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload';
import {MatTable} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface Bank {
  name: string;
  position: number;
  description: string;
  paySysBankCode: string;
}

const URL = 'http://localhost:3000/api/banks/addBanks';

@Component({
  selector: 'app-bank-control',
  templateUrl: './bank-control.component.html',
  styleUrls: ['./bank-control.component.css']
})

export class BankControlComponent {
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'InterBankCodeInfo'});
  displayedColumns: string[] = ['position', 'name', 'description', 'paySysBankCode'];
  dataSource = new MatTableDataSource<Bank>();



  constructor(private sysService: SystemService) {}

  // @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    const tableData: Bank[] = [];
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
    };
    this.sysService.getBanks().subscribe(result => {
      console.log(result);
      // this.dataSource = result.bankList;

      const bankList = result.bankList;
      for (let i = 0; i < bankList.length; i++) {
        tableData.push({
          name: bankList[i].name,
          position: i + 1 ,
          description: bankList[i].description,
          paySysBankCode: bankList[i].paySysBankCode
        });
      }
      this.dataSource.data = tableData;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // this.table.renderRows();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
