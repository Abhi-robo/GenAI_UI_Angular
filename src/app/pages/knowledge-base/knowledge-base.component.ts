import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.css']
})
export class KnowledgeBaseComponent implements OnInit{
  files: any[] = [];
  page: number = 1; // Initial page number
  itemsPerPage: number = 10; // Number of items to display per page

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Replace with the actual API endpoint
    const apiUrl = 'http://127.0.0.1:5000/get_files';

    this.http.get(apiUrl).subscribe((data: any) => {
      this.files = data.files;
    });
  }
}