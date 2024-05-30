import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import 'dotenv/config'

// prompot
const prompt = ChatPromptTemplate.fromTemplate("{topic}についてジョークを言ってください");

// model
const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0
});

// chain with pipe
const chain = prompt.pipe(model).pipe(new StringOutputParser());

// invoke
const result = await chain.invoke({ topic: "熊" });
console.log(result)