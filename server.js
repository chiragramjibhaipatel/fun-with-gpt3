import express from 'express';
import fetch from "node-fetch";
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.get("/api/process-prompt/:prompt", (req, res) => {
    const {prompt} = req.params;
    console.log("Prompt is: ", prompt);
    const data = {
        prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
        },
        body: JSON.stringify(data),
    }).then(res => res.json()).then(_res=>{
        res.send(_res.choices[0].text);
    });

});

app.listen(5000,() => console.log("server is running"));

