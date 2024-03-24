"use client"
import { useState } from "react";

export default function Home() {
  const [clientKey, setClientKey] = useState("");

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
              type = {clientKey === "" ? "text" : "password"}
              className={clientKey === "" ? "grow text-slate-400" : "grow text-black"}
              value={clientKey}
              onChange={(e) => {
                setClientKey(e.target.value)
              }}
            />
          </label>
        </div>
      </main>
    </>
  );
}
