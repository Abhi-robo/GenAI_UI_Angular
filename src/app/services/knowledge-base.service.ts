import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {

  constructor(private http: HttpClient) {}

  getFiles() {
    // Replace with the URL of your API endpoint
    const apiUrl = 'YOUR_API_ENDPOINT';

    return this.http.get(apiUrl);
  }
}