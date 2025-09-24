import { Component } from '@angular/core';
import { ChatbotService } from '../core/services/chatbot.service';

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  question: string = '';
  loading: boolean = false;
  chatHistory: ChatMessage[] = [];

  constructor(private chatbotService: ChatbotService) { }

  sendQuestion() {
    if (!this.question.trim()) return;

    // Ajouter la question à l'historique
    this.chatHistory.push({ type: 'user', message: this.question });
    const currentQuestion = this.question;
    this.question = '';
    this.loading = true;

    this.chatbotService.askQuestion(currentQuestion).subscribe({
      next: (res) => {
        // Ajouter la réponse à l'historique
        this.chatHistory.push({ type: 'bot', message: res.answer });
        this.loading = false;

        // Scroll automatique
        setTimeout(() => {
          const chatBody = document.getElementById('chatBody');
          if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
        }, 100);
      },
      error: (err) => {
        console.error(err);
        this.chatHistory.push({ type: 'bot', message: 'Erreur de communication avec le chatbot.' });
        this.loading = false;
      }
    });
  }
}
