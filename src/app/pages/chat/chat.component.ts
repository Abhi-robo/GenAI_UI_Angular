import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {
  textToSummarize: string = ''; 
  // summary: string = '';
  summary={};

  constructor(private chatService: ChatService) {}

  // summarizeText() {
  //   this.chatService.summarizeText(this.textToSummarize)
  //     .subscribe(response => {
  //       // const summary = response.summary;
  //       console.log('Summary:', this.textToSummarize);
  //       this.summary = response.summary;
  //       // console.log('Summary:', summary); 
  //     });
  // }
  summarizeText() {
    this.chatService.summarizeText(this.textToSummarize)
      .subscribe(response => {
        // const summary = response.summary;
        console.log('Summary:', this.textToSummarize);
        this.summary = response;
        // console.log('Summary:', summary); 
      });
  }

  
}
