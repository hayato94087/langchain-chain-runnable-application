import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda } from "@langchain/core/runnables";
import 'dotenv/config'

// prompt
// ジョークを生成
const prompt = ChatPromptTemplate.fromTemplate("{topic}についてジョークを言ってください");

// model
const model = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0
});

// chain with pipe
const chain = prompt.pipe(model).pipe(new StringOutputParser());

// prompt
// ジョークを評価
const analysisPrompt = ChatPromptTemplate.fromTemplate(
  "このジョークはどう面白いのか解説してください。 {joke}"
);

// chain with pipe
const composedChain = new RunnableLambda({
  func: async (input:{topic:string}) => {
    if(!input){
      throw new Error("ジョークがありません");
    }
    const result = await chain.invoke(input);
    console.log(result)
    return { joke: result };
  },
})
  .pipe(analysisPrompt)
  .pipe(model)
  .pipe(new StringOutputParser());

const analysisResult = await composedChain.invoke({ topic: "熊" });
console.log(analysisResult);