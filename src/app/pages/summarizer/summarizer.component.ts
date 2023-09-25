import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-summarizer',
  templateUrl: './summarizer.component.html',
  styleUrls: ['./summarizer.component.css']
})
export class SummarizerComponent {

  selectedFile: File | null = null;
  summary: string = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      // if(this.selectedFile.type == "application/pdf"){
      //   console.log("pdf")
      // }
      formData.append('file', this.selectedFile);
            this.http.post<any>('http://127.0.0.1:5000/pdf_summariser', formData).subscribe(
        response => {
          this.summary = response.summary;
          console.log(this.summary)
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}