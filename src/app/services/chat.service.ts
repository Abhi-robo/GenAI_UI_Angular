import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:5000/chat/query'; 
  constructor(private http: HttpClient) {}


  // summarizeText(userInput: string): Observable<any> {
  //   const requestData = { user_input: userInput }; // Use 'user_input' field to match Flask's expectation
  //   console.log('Input from service:', requestData);

  //   return this.http.post<any>(this.apiUrl, requestData);
  // }
   summarizeText(userInput: string){
    let params = new HttpParams();
    params = params.append('user_input', userInput);
    const requestData = { user_input: userInput }; // Use 'user_input' field to match Flask's expectation
    console.log('Input from service:', requestData);

    return this.http.get(this.apiUrl, {params});
  }

}