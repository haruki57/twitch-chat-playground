import { username, password, channels } from './credentials';
import tmi from 'tmi.js';

export const init = () => {
  // Define configuration options
  const opts = {
    identity: {
      username,
      password,
    },
    channels,
  };

  // Create a client with our options
  const client = new tmi.client(opts);

  // Register our event handlers (defined below)
  client.on('message', onMessageHandler);
  client.on('connected', onConnectedHandler);

  // Connect to Twitch:
  client.connect();

  // Called every time a message comes in
  function onMessageHandler(target: string, context: Context, msg: string, self: any) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    // If the command is known, let's execute it
    if (commandName === '!dice') {
      const num = rollDice();
      client.say(target, `You rolled a ${num}`);
      console.log(`* Executed ${commandName} command`);
    } else {
      console.log(`* Unknown command ${commandName}`);
    }
  }

  // Function called when the "dice" command is issued
  function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
  }

  // Called every time the bot connects to Twitch chat
  function onConnectedHandler(addr: any, port: any) {
    console.log(`* Connected to ${addr}:${port}`);
    (document.querySelector('#isConnected') as HTMLElement).innerText = 'Connected!';
  }
}
interface Context {
  'badge-info': BadgeInfo;
  badges: Badges;
  'client-nonce': string;
  color: string;
  'display-name': string;
  emotes: Emotes;
  'first-msg': boolean;
  'flags'?: null;
  id: string;
  mod: boolean;
  'room-id': string;
  subscriber: boolean;
  'tmi-sent-ts': string;
  turbo: boolean;
  'user-id': string;
  'user-type'?: null;
  'emotes-raw': string;
  'badge-info-raw': string;
  'badges-raw': string;
  username: string;
  'message-type': string;
}
interface BadgeInfo {
  subscriber: string;
}
interface Badges {
  broadcaster: string;
  subscriber: string;
  premium: string;
}
interface Emotes {
  [stampId: string]: string[];
}
