import p5 from "p5";
import { TwitchChatContext } from './bot';

let text = '';

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
    p.ellipse(50, 50, 80, 80);
    p.text(text, 50, 150);
  };
};

export const onMessageHandler = (target: string, context: TwitchChatContext, msg: string, self: any) => {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    // const num = rollDice();
    // client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
  text = msg;
}

new p5(sketch);