import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
declare const Pusher: any;

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  messagesChannel: any;
  constructor() { 
    this.pusher = new Pusher('5b4eb9a552ab682c288a', {
      authEndpoint: 'http://localhost:4000/pusher/auth',
    });
    this.messagesChannel = this.pusher.subscribe('private-messages');
  }
}
