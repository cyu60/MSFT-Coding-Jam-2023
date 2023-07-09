import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

if (!process.env.NEXT_PUBLIC_OPEN_AI_API_KEY) {
  throw new Error("Missing API key");
}
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState("");
  const [summaryReport, setSummaryReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateSummaryReport = async () => {
    setIsLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
      <main className="min-h-screen bg-indigo-800">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-indigo-700 p-6 text-white">
          <div className="text-2xl font-bold">ChronoMate!</div>
          <div className="space-x-4">
            <Link className="hover:text-indigo-300" href="/">
              Home
            </Link>
            <Link className="hover:text-indigo-300" href="/about">
              About
            </Link>
            <Link className="hover:text-indigo-300" href="/contact">
              Contact
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Welcome to ChronoMate 🤖!
          </h1>
          <div className="min-h-full w-full max-w-6xl divide-y-4 divide-indigo-800 rounded-lg bg-white p-6 shadow-lg">
            <ActivitiesList />
            <button
              className="mt-4 rounded bg-indigo-500 px-4 py-2 text-white"
              onClick={() => void generateSummaryReport()}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Generate Summary Report"}
            </button>
            {summaryReport && (
              <div className="mt-4 rounded bg-gray-100 p-3">
                <p className="text-lg font-semibold">Summary Report:</p>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {summaryReport}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-center bg-indigo-700 p-4 text-white">
          <div className="text-center">
            © 2023 ChronoMate. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
};

const ActivitiesList: React.FC = () => {
  const activities = [
    {
      name: "Research",
      time: "4 hours",
      icon: <WorkIcon />,
      color: "yellow",
    },
    { name: "Reading", time: "2 hours", icon: <StudyIcon />, color: "green" },
    { name: "Coding", time: "1 hour", icon: <CodeIcon />, color: "blue" },
    { name: "Break", time: "30 minutes", icon: <BreakIcon />, color: "gray" },
  ];

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500">
          <AssistantIcon />
        </div>
        <div>
          <p className="font-semibold text-indigo-600">Assistant</p>
          <p className="text-gray-700">
            From ChronoMate, here is a list of your activities and the time
            spent on each:
          </p>
        </div>
      </div>

      <ul className="mt-4 list-disc pl-6">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="mt-2 flex gap-4 rounded border p-3 transition-shadow hover:shadow-md"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-${activity.color}-500`}
            >
              {activity.icon}
            </div>
            <div>
              <p className="font-semibold text-indigo-600">Activity</p>
              <p className="text-gray-700">
                {activity.name} {"\u2022"} {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export function BreakIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function CodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// const Home: NextPage = () => {
//   const [userInput, setUserInput] = useState("");
//   const [conversation, setConversation] = useState<
//     ChatCompletionRequestMessage[]
//   >([initialQuestion]);

//   // useEffect(() => {
//   //   console.log(userInput);
//   // }, [userInput]);
//   return (
//     <>
//       <Head>
//         <title>Chat with me App</title>
//         <meta name="description" content="Chat with me" />
//         <link rel="icon" href="" />
//       </Head>
//       <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-800">
//         <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
//           <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
//             Chat with me!
//           </h1>
//           <div className="min-h-full w-full max-w-xl divide-y-4 divide-indigo-800 bg-white">
//             {/* {dummyConversation.map((c, i) => (
//               <ConversationBox conversation={c} key={i} />
//             ))} */}
//             {conversation.map((c, i) => (
//               <ConversationBox conversation={c} key={i} />
//             ))}
//             <UserInputBox
//               userInput={userInput}
//               setUserInput={setUserInput}
//               conversation={conversation}
//               setConversation={setConversation}
//             />
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };
const StudyIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="h-6 w-6"
    >
      <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
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
        stroke="white"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="white"
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
const WorkIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
      <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
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
