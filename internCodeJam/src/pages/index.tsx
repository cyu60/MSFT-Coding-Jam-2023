import { type NextPage } from "next";
import Head from "next/head";
import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

if (!process.env.NEXT_PUBLIC_OPEN_AI_API_KEY) {
  throw new Error("Missing API key");
}
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// Dummy conversation for testing
const dummyConversation: ChatCompletionRequestMessage[] = [
  { role: "user", content: "Hi, I'm planning a trip to Europe." },
  {
    role: "assistant",
    content:
      "Great! I can help with that. Where in Europe are you planning to go?",
  },
  { role: "user", content: "I need to track my activities and time." },
  {
    role: "assistant",
    content:
      "No problem! Here's a list of your activities and the time spent on each:",
  },
];

const initialQuestion: ChatCompletionRequestMessage = {
  role: "assistant",
  content: "Hi, how can I help you today?",
};

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState<
    ChatCompletionRequestMessage[]
  >([initialQuestion]);
  const [summaryReport, setSummaryReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateSummaryReport = async () => {
    setIsLoading(true);

    const assistantResponseObj = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Generate summary report for my activities: Activity

        Work - 4 hours
        
        Activity
        
        Study - 2 hours
        
        Activity
        
        Exercise - 1 hour
        
        Activity
        
        Break - 30 minutes`,
        },
      ],
    });

    const assistantResponse =
      assistantResponseObj?.data?.choices[0]?.message?.content || "";

    setSummaryReport(assistantResponse);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>ChronoMate App</title>
        <meta name="description" content="ChronoMate" />
        <link rel="icon" href="" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            ChronoMate!
          </h1>
          <div className="min-h-full w-full max-w-xl divide-y-4 divide-slate-800 bg-white">
            <ActivitiesList />
            <button
              className="mt-4 rounded bg-slate-500 px-4 py-2 text-white"
              onClick={() => void generateSummaryReport()}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Generate Summary Report"}
            </button>
            {summaryReport && (
              <div className="mt-4 bg-gray-100 p-3">
                <p className="text-lg font-semibold">Summary Report:</p>
                <p>{summaryReport}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const ActivitiesList: React.FC = () => {
  const activities = [
    { name: "Work", time: "4 hours" },
    { name: "Study", time: "2 hours" },
    { name: "Exercise", time: "1 hour" },
    { name: "Break", time: "30 minutes" },
  ];

  return (
    <div className="p-3">
      <div className="flex gap-4 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500 p-6">
          <div>
            <AssistantIcon />
          </div>
        </div>
        <div>
          <p className="italic text-slate-600">assistant</p>
          <p>
            From ChromoMate, here is a list of your activities and the time
            spent on each:
          </p>
        </div>
      </div>
      <ul className="list-disc pl-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex gap-4 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500 p-6">
              <div>
                <AssistantIcon />
              </div>
            </div>
            <div>
              <p className="italic text-slate-600">Activity</p>
              <p>
                {activity.name} - {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ConversationBox: React.FC<{
  conversation: ChatCompletionRequestMessage;
}> = ({ conversation }) => {
  return (
    <div className="flex gap-4 p-3">
      {/* profile pic */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500 p-6">
        <div>
          {conversation.role === "user" ? (
            <UserIcon></UserIcon>
          ) : (
            <AssistantIcon />
          )}
        </div>
      </div>
      <div className="">
        <p className="italic text-slate-600">{conversation.role}</p>
        <p>{conversation.content}</p>
      </div>
    </div>
  );
};

const UserInputBox: React.FC<{
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  conversation: ChatCompletionRequestMessage[];
  setConversation: Dispatch<SetStateAction<ChatCompletionRequestMessage[]>>;
}> = ({ userInput, setUserInput, conversation, setConversation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const assistantResponseObj = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...conversation, { role: "user", content: userInput }],
    });

    const assistantResponse =
      assistantResponseObj?.data?.choices[0]?.message?.content || "";
    console.log(userInput, assistantResponse, [
      ...conversation,
      { role: "user", content: userInput },
      { role: "assistant", content: assistantResponse },
    ]);

    setConversation([
      ...conversation,
      { role: "user", content: userInput },
      { role: "assistant", content: assistantResponse },
    ]);
    setUserInput("");
    setIsLoading(false);
  };

  return (
    <div className="flex items-center bg-slate-300">
      {/* User Input */}
      <textarea
        className="m-3 w-9/12 p-3"
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        disabled={isLoading}
      ></textarea>

      <div className="m-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-500 p-6">
        {isLoading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div onClick={() => void handleClick()}>
            <NextIcon></NextIcon>
          </div>
        )}
      </div>
    </div>
  );
};

const UserIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
};

const Spinner: React.FC = () => {
  return (
    <svg
      className="h-5 w-5 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const NextIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
};

const AssistantIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
      />
    </svg>
  );
};

export default Home;
