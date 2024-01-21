import OpenAI from "openai"
import dotenv from 'dotenv';

dotenv.config();


  const openai = new OpenAI({
    apiKey: "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",
});




export default openai