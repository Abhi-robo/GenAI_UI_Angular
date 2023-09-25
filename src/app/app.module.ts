import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/Material.Module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ChatComponent } from './pages/chat/chat.component'
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SummarizerComponent } from './pages/summarizer/summarizer.component';
import { KnowledgeComponent } from './pages/knowledge/knowledge.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { KnowledgeBaseComponent } from './pages/knowledge-base/knowledge-base.component';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    ChatComponent,
    SummarizerComponent,
    KnowledgeComponent,
    ChatbotComponent,
    KnowledgeBaseComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
