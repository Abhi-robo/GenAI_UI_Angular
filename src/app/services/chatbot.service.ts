import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenAiApiService {

  // private apiUrl = 'http://127.0.0.1:5000/chat/query';
    // Update with your Node.js server URL
    private apiUrl = 'http://127.0.0.1:5000/query_vector'; 
  constructor(private http: HttpClient) { }

  public sendMessage(message: string) {
    return this.http.post<any>(`${this.apiUrl}`, {'user_input': message });
    // let params = new HttpParams();
    // params = params.append('user_input', message);
    // const requestData = { user_input: message }; // Use 'user_input' field to match Flask's expectation
    // console.log('Input from service:', requestData);

    // return this.http.get(this.apiUrl, {params});
  }
}
