"use client"
import { useState } from "react";
import ClientKeyInput from "./components/inputKey";
import FileAudioInput from "./components/inputFile";
import Sbobinatura from "./components/sbobinatura";

export default function Home() {
  const [clientKey, setClientKey] = useState("");
  const [sbobinatura, setSbobinatura] = useState("");

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-cyan-600">
        <div className="container flex min-w-full max-w-screen-lg flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Sbobinator
          </h1>

          <ClientKeyInput clientKey={clientKey} setClientKey={setClientKey} />
          <FileAudioInput clientKey={clientKey} setSbobinatura={setSbobinatura} />
          <Sbobinatura sbobinatura={sbobinatura} />

        </div>
      </main>
    </>
  );
}
