import { Component, OnInit } from '@angular/core';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import * as XLSX from 'xlsx';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import write_blob from "capacitor-blob-writer";

import * as Excel from "exceljs/dist/exceljs.min.js";
import * as ExcelProper from "exceljs";
import { Api } from 'src/services/api';
let workbook: ExcelProper.Workbook = new Excel.Workbook();


@Component({
  selector: 'app-teste',
  templateUrl: './teste.page.html',
  styleUrls: ['./teste.page.scss'],
})
export class TestePage implements OnInit {

  pdfObj = null;

  constructor(
    private provider:Api,
    private fileOpener: FileOpener
  ) { }

  ngOnInit() {
  }

  pdfDownload(){

    const docDef = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      // left, top, right, bottom
      pageMargins: [20,10,40,60,],
      content: [{
        table:{
          body: [
            ['demo pdf dolumn']
          ]
        }
      }]
    }
    this.pdfObj = pdfMake.createPdf(docDef).download("demo.pdf");
  }

  excelDownload(){
//    let lines: any = [];
//
//    for(var i = 0; i <100; i++){
//      var obj = {id:"id"+i.toString(),name:"name"+i.toString(),email:"email"+i.toString()};
//      lines.push(obj);
//    }
//
//    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//
//    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(lines);
//    
//    // eslint-disable-next-line
//    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
//    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//    
//    const excelData: Blob = new Blob([excelBuffer], {
//      type: EXCEL_TYPE
//    });
//    
//    write_blob({
//      path: "teste.xlsx",
//      blob: excelData,
//      on_fallback(error) {
//          console.error(error);
//      }
//    }).then(function () {
//        console.log("Excel written.");
//    });
//
//    /*
//    const writeSecretFile = async () => {
//      await Filesystem.writeFile({
//        path: 'teste,xlsx',
//        data: 'teste', //excelData'',
//        directory: Directory.Documents,
//        encoding: Encoding.UTF8,
//      });
//    };
//    */

    this.provider.generateExcel();
  }
  

}
