import { Component, AfterViewChecked, ElementRef, ViewChild, OnInit} from '@angular/core';

import { OpenAiApiService } from 'src/app/services/chatbot.service';

@Component({

  selector: 'app-chatbot',

  templateUrl: './chatbot.component.html',

  styleUrls: ['./chatbot.component.css']

})

export class ChatbotComponent implements OnInit, AfterViewChecked  {

  userMessage!: string;

  assistantReply!: string;

  btnstate: boolean=false;

  chatMessages: { role: string, content: string }[] = [];

 

  constructor(private openAiApiService: OpenAiApiService){}

  @ViewChild('scrollMe') private myScrollContainer: any;

 

  ngOnInit() {

      this.scrollToBottom();

  }

 

  ngAfterViewChecked() {        

      this.scrollToBottom();        

  }

 

  scrollToBottom(): void {

      try {

          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;

      } catch(err) { }                

  }

  sendMessage() {

    this.btnstate = true;

    const userMessage12 = this.userMessage;

    this.userMessage = '';

    this.chatMessages.push({ role: 'user', content: userMessage12 });

    this.openAiApiService.sendMessage(userMessage12)

      .subscribe(response => {

        this.assistantReply = response.summary;

        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });

        this.userMessage = '';

        this.btnstate = false;

      });

     

  }

}

 