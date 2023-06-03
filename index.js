const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.StackBox_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  try {
    const {message} = req.body;
    // console.log("Message: ", message);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // console.log("Result: ", response);

    return res.status(200).json({
        succes: true,
        data: response.data.choices[0].text
    })
  } catch (error) {
    console.log("Error: ", error);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));
