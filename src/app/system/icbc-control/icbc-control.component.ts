import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemService } from '../system.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload';
import {MatTable} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface IcbcBranch {
  stateName: string;
  position: number;
  cityName: string;
  areaCode: string;
}

const URL = 'http://localhost:3000/api/banks/addIcbcBranches';

@Component({
  selector: 'app-icbc-control',
  templateUrl: './icbc-control.component.html',
  styleUrls: ['./icbc-control.component.css']
})

export class IcbcControlComponent {
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'AreaCodes'});
  displayedColumns: string[] = ['position', 'stateName', 'cityName', 'areaCode'];
  dataSource = new MatTableDataSource<IcbcBranch>();



  constructor(private sysService: SystemService) {}

  // @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    const tableData: IcbcBranch[] = [];
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
    };
    this.sysService.getIcbcBranches().subscribe(result => {
      console.log(result);
      const branchList = result.branchList;
      for (let i = 0; i < branchList.length; i++) {
        tableData.push({
          stateName: branchList[i].stateName,
          position: i + 1 ,
          cityName: branchList[i].cityName,
          areaCode: branchList[i].areaCode
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
