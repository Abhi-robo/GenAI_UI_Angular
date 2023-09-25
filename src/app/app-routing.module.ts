import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ChatComponent } from './pages/chat/chat.component';
import {ChatbotComponent} from './pages/chatbot/chatbot.component'
import { SummarizerComponent } from './pages/summarizer/summarizer.component';
import { KnowledgeComponent } from './pages/knowledge/knowledge.component'
import { KnowledgeBaseComponent } from './pages/knowledge-base/knowledge-base.component'
import { HomeComponent } from './pages/home/home.component'

const routes: Routes = [
  {path : 'knowledge', component: KnowledgeComponent},
  { path: 'chat', component: ChatbotComponent },
  { path: 'summary', component: SummarizerComponent },
  { path: 'Document', component: KnowledgeBaseComponent },
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
