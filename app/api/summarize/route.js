import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  const { text } = await request.json();

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
      }
    );

    const summary = response.data[0]?.summary_text || "No summary generated.";
    return NextResponse.json({ summary });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error generating summary" },
      { status: 500 }
    );
  }
}
