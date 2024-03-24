import React from 'react';
import axios from "axios"
import { useState } from "react";

const FileAudioInput = ({ clientKey, setSbobinatura }) => {
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("model", "whisper-1");
        formData.append("file", file);

        try {

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
        } catch (error) {
            setSbobinatura(error.response.data.error.message);
        }
    };

    return (
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
    );
};

export default FileAudioInput;