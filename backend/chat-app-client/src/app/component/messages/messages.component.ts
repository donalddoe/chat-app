import { Component, OnInit} from '@angular/core';
import { PusherService } from '../../pusher.service';
import Pusher from 'pusher-js'

interface Message {
  text: string;
  user: string;
}


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})


export class MessagesComponent implements OnInit {
  username = 'username';
  message = '';
  
  messages: Array<Message>;

  constructor(private pusherService: PusherService) {
    this.messages = [];
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;
    this.pusherService.messagesChannel.bind('client-new-message', (message) => {
      this.messages.push(message);
    });
  }
  
  sendMessage(user: string, text: string) {
    const message: Message = {
       user: user,
       text: text,
    }
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.messages.push(message);
  }

}
