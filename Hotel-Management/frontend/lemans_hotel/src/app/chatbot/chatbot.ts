import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AiService } from '../services/ai.service';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  time: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css',
})
export class Chatbot implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  isOpen = false;
  isTyping = false;
  newMessage = '';
  messages: Message[] = [
    { text: 'Hello! Welcome to Le Mans Hotel. How can I help you today?', sender: 'bot', time: new Date() }
  ];

  constructor(private aiService: AiService) { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sender: 'user', time: new Date() });
      const userMsg = this.newMessage;
      this.newMessage = '';
      this.isTyping = true;

      // Check if user is admin (simple check - you can enhance this)
      const isAdmin = window.location.pathname.includes('/admin');
      const aiCall = isAdmin ?
        this.aiService.sendAdminMessage(userMsg) :
        this.aiService.sendUserMessage(userMsg);

      aiCall.subscribe({
        next: (response) => {
          this.isTyping = false;
          this.messages.push({ text: response.response, sender: 'bot', time: new Date() });
        },
        error: (err) => {
          console.error('AI service error:', err);
          this.isTyping = false;
          // Fallback to mock response if backend is unavailable
          let botResponse = "I'm sorry, I didn't quite catch that. Could you please rephrase?";

          if (userMsg.toLowerCase().includes('room') || userMsg.toLowerCase().includes('book')) {
            botResponse = "You can view our luxurious rooms and suites on the 'Suites' page. Would you like me to guide you there?";
          } else if (userMsg.toLowerCase().includes('food') || userMsg.toLowerCase().includes('dining')) {
            botResponse = "We offer exquisite dining experiences. Check out our 'Dining' page for more details on our 5 world-class cuisines.";
          } else if (userMsg.toLowerCase().includes('check in') || userMsg.toLowerCase().includes('time')) {
            botResponse = "Check-in time is at 3:00 PM and check-out is at 11:00 AM. Early check-in may be available upon request.";
          }

          this.messages.push({ text: botResponse, sender: 'bot', time: new Date() });
        }
      });
    }
  }
}
