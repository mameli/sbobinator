"use client"
import { useState } from "react";
import axios from "axios"

export default function Home() {
  const [clientKey, setClientKey] = useState("");
  const [file, setFile] = useState(null);
  const [sbobinatura, setSbobinatura] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("model", "whisper-1");
    formData.append("file", file);


    const { data: transcriptionData } = await axios.post(
      "https://api.openai.com/v1/audio/transcriptions",
      formData,
      {
        headers: {
          Authorization: `Bearer ${clientKey}`,
        },
      }
    )

    const { data: completionData } = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a talented assistant who can summarise text. Give a general summary of the text and then create a simple bullet point list of the most important aspects of a text.",
          },
          {
            role: "user",
            content: transcriptionData.text,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${clientKey}`,
        },
      }
    )


    setSbobinatura(completionData.choices[0].message.content);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-cyan-600">
        <div className="container flex min-w-full max-w-screen-lg flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Sbobinator
          </h1>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              placeholder="OPEN_AI_API_KEY"
              type={clientKey === "" ? "text" : "password"}
              className={clientKey === "" ? "grow text-slate-400" : "grow text-black"}
              value={clientKey}
              onChange={(e) => {
                setClientKey(e.target.value)
              }}
            />
          </label>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >

            <input type="file" className="file-input w-full max-w-xs "
              id="audio-upload"
              name="audio-upload"
              accept="audio/*"
              onChange={(e) => {
                setFile(e?.target?.files?.[0])
              }} />

            <button
              type="submit"
              className="rounded-full bg-white/30 px-10 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              Submit
            </button>

          </form>

          <div>
            {sbobinatura ? (
              <div
                className="max-w-md text-xl font-normal text-white "
                style={{ whiteSpace: "pre-line" }}
              >
                {sbobinatura}
              </div>
            ) : (
              <div
                className="max-w-md text-xl font-normal text-white "
                style={{ whiteSpace: "pre-line" }}
              ></div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
