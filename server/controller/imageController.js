// import { GoogleGenAI } from "@google/genai";

// export const moderateImage = async (req, res) => {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });

//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Image is required" });
//     }

//     // categories from client
//     const categories = JSON.parse(req.body.categories || "[]");

//     const categoryInstruction =
//       categories.length > 0
//         ? `The image must contain one of the following: ${categories.join(", ")}.`
//         : "";

//     const prompt = `
// Analyze this image.

// Rules:
// 1. Reject if image contains nudity, sexual content, violence, or offensive gestures.
// 2. ${categoryInstruction}
// 3. If image does not match the requested category, reject it.

// Respond ONLY in valid JSON format:

// {
//   "accepted": true or false,
//   "reason": "short reason why accepted or rejected"
// }
// `;

//     const imageBase64 = req.file.buffer.toString("base64");

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: [
//         {
//           role: "user",
//           parts: [
//             { text: prompt },
//             {
//               inlineData: {
//                 mimeType: req.file.mimetype,
//                 data: imageBase64,
//               },
//             },
//           ],
//         },
//       ],
//     });

//     const raw =
//       response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

//     let result;

  
//     try {
//       result = JSON.parse(raw);
//     } catch {
//       result = {
//         accepted: false,
//         reason: "Invalid object",
//       };
//     }

//     const status = result.accepted
//       ? "accepted"
//       : "rejected";

//     return res.json({
//       status,
//       reason: result.reason,
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "API request failed" });
//   }
// };


import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqs } from "../config/sqs.js";
import Moderation from "../models/Moderation.js";


export const moderateImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const categories = JSON.parse(req.body.categories || "[]");

    const requestId = Date.now(); 

    const imageBase64 = req.file.buffer.toString("base64");

    const message = {
      image: imageBase64,
      mimeType: req.file.mimetype,
      categories,
      requestId,
    };

    await Moderation.create({
      requestId,
      status: "processing",
    });

    await sqs.send(
      new SendMessageCommand({
        QueueUrl: process.env.SQS_QUEUE_URL,
        MessageBody: JSON.stringify(message),
      })
    );

    return res.json({
      status: "queued",
      requestId,   
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to queue job" });
  }
};


export const getModerationStatus = async (req, res) => {
  const result = await Moderation.findOne({
    requestId: req.params.requestId
  });

  if (!result) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(result);
};





/*

Client
   ↓
API
   ↓
Mongo (job created)
   ↓
SQS
   ↓
Lambda
   ↓
Gemini
   ↓
Mongo (result updated)
   ↓
Client polls result




*/