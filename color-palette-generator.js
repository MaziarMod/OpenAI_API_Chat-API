import chalk from 'chalk';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const display_colors = async (colors) => {
  colors.forEach((hexCode) => {
    const coloredText = chalk.bgHex(hexCode).black('        ');
    console.log(coloredText, hexCode);
  });
};

(async (msg) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const messages = [
    {
      role: 'system',
      content:
        'You are a color palette generating assistant that responds to text prompts for color palettes. You should generate color palettes that fit the theme, mood, or instructions in the prompt.The palettes should be between 2 and 8 colors.',
    },
    {
      role: 'user',
      content:
        'Convert the following verbal description of a color palette into a list of colors: The Mediterranean Sea',
    },
    {
      role: 'assistant',
      content: '["#006699", "#66CCCC", "#F0E68C", "#008000", "#F08080"]',
    },
    {
      role: 'user',
      content:
        'Convert the following verbal description of a color palette into a list of colors: sage, nature, earth',
    },
    {
      role: 'assistant',
      content: '["#EDF1D6", "#9DC08B", "#609966", "#40513B"]',
    },
    {
      role: 'user',
      content: `Convert the following verbal description of a color palette into a list of colors: ${msg}`,
    },
  ];

  const reply = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    max_tokens: 200,
  });

  const reply_text = reply.data.choices[0].message.content;

  // Because completion_text was array-like string, we typecasted it into array before calling the function
  display_colors(JSON.parse(reply_text));
})('Sunset colors');
