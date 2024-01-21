import OpenAI from "openai"
import dotenv from 'dotenv';

dotenv.config();


  const openai = new OpenAI({
    apiKey: "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",
});




export default openai