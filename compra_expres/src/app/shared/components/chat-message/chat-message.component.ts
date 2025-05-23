import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  standalone: false,
 
})
export class ChatMessageComponent  implements OnInit {
  @Input() message?: { text: string; isUser: boolean };
  @Input() isUser?: boolean;

  constructor() { }

  ngOnInit() {}

}
