import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export interface KnowledgeDoc {
  name: string;
  last_modified: string;
  size: string;
}


@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.css']
})
export class KnowledgeComponent implements AfterViewInit {

  // displayedColumns: string[] = ['name', 'last_modified', 'size'];
  displayedColumns: string[] = ['select', 'name', 'last_modified', 'size'];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private toastr: ToastrService) {}
  selection = new SelectionModel<KnowledgeDoc>(true, []);

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator  | null = null;
  loading = false;

  ngAfterViewInit() {
    this.loading = true; 
    this.cdr.detectChanges();
    this.http.get<any>('http://127.0.0.1:5000/get_files').subscribe(
      response => {
        this.dataSource.data = response.files;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error => {
        console.error(error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
    this.dataSource.paginator = this.paginator;
    }
  // }
  // addData(event:any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile);
  //   }
  
  // removeData() {
  
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: KnowledgeDoc): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.dataSource.data.indexOf(row) + 1}`;
  }

    // getSelectedFiles() {
    //   const selectedFiles = this.selection.selected.map((row) => row.name);
    //   console.log('Selected Files:', selectedFiles);
    //   this.http.post('http://127.0.0.1:5000//delete-blobs', { selectedFiles }).subscribe(
    //     (response) => {
    //       console.log('API Response:', response);
 
    //     },
    //     (error) => {
    //       console.error('API Error:', error);
    //     }
    //     );
    //   }

    getSelectedFiles() {
      this.toastr.info('Deleting file...', 'File Delete');
      const selectedFiles = this.selection.selected.map((row) => row.name);
      console.log('Selected Files:', selectedFiles);
    
      this.http.post('http://127.0.0.1:5000/delete-blobs', { selectedFiles }).subscribe(
        (response) => {
          console.log('API Response:', response);
    
          // Check if the API response contains any information
          if (response) {
            const responseData: any = response;
            if (responseData.message) {
              this.toastr.success(responseData.message, 'Files Deleted'); // Show success toast with the message
            } else {
              this.toastr.error('Error deleting files', 'File Deletion'); // Show error toast
            }
          }
          this.ngAfterViewInit()
        },
        (error) => {
          console.error('API Error:', error);
          this.toastr.error('Error deleting files', 'File Deletion'); // Show error toast
        }
      );
    }


// onFileSelected(event: Event) {
//   const fileInput = event.target as HTMLInputElement;
//   if (fileInput.files && fileInput.files.length > 0) {
//     const selectedFile = fileInput.files[0];
//     // You can now access the selected file and perform actions like uploading it.
//     console.log('Selected file:', selectedFile);
//   }
// }

onFileSelected(event: Event) {
  this.toastr.info('Uploading file and Creating Embeddings...', 'File Upload');
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', selectedFile);

    this.http.post('http://127.0.0.1:5000/upload', formData).subscribe(
      (response: any) => {
        console.log('File uploaded successfully:', response);
        if (response && response.hasOwnProperty('error') && response.error === 'The specified blob already exists') {
          this.toastr.error('The specified blob already exists', 'File Upload');
        } else {
          this.toastr.success('Embeddings Created and  File uploaded to Azure successfully', 'File Upload');
        }
        this.ngAfterViewInit()
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.toastr.error('Error uploading file', 'File Upload');
      }
    );
  }
}

}