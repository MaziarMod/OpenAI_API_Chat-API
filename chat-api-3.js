import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const reply = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant that classifies the sentiment in text as either positive, neutral, or negative',
      },
      {
        role: 'user',
        content:
          "Classify the sentiment in the following text: 'I really hate chickens'",
      },
      { role: 'assistant', content: 'Negative' },
      {
        role: 'user',
        content:
          "Classify the sentiment in the following text: 'I love my dog'",
      },
    ],
  });

  const reply_text = reply.data.choices[0].message.content;
  console.log(reply_text);
})();
