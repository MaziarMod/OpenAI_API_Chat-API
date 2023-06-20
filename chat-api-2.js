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
          'You are a helpful assistant that translates English to French.',
      },
      {
        role: 'user',
        content:
          'Translate the following English text to French: I want a pet frog',
      },
    ],
  });

  const reply_text = reply.data.choices[0].message.content;
  console.log(reply_text);
})();
