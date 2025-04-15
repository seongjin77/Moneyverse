import { GoogleGenAI, Type } from "@google/genai";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POST 요청만 허용
  if (req.method !== "POST") {
    return res.status(405).json({ message: "허용되지 않는 메소드입니다" });
  }

  try {
    const { difficulty } = req.body;

    // API 키는 서버 사이드에서만 접근 가능
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "API 키가 설정되지 않았습니다" });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const prompt = `넌 뛰어난 경제 선생님이고 다음 세 가지 주제에 대해 각각 3문제씩 총 9개의 경제 상식 문제를 JSON 형식으로 만들어줘. 주제는 1) 금융 상품 및 금융 기관에 대한 이해(category: financial), 2) 경제 개념 및 지표 이해(category: economicConcepts), 3) 부동산(category: realEstate)이야. 난이도는 ${
      difficulty || "보통"
    }으로 설정해줘. 각 문제에는 "question", "options" (a, b, c, d), "explanation", "correctAnswer", "category" 필드가 있어야 해. category 필드는 "financial", "economicConcepts", "realEstate" 중 하나여야 해. 한국 사람이 쉽게 이해할 수 있도록 문제를 만들어주고 한국어로 대답해줘.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: {
                type: Type.NUMBER,
                description: "문제 번호",
                nullable: false,
              },
              question: {
                type: Type.STRING,
                description: "The question",
                nullable: false,
              },
              options: {
                type: Type.OBJECT,
                properties: {
                  a: {
                    type: Type.STRING,
                    description: "Option A",
                    nullable: false,
                  },
                  b: {
                    type: Type.STRING,
                    description: "Option B",
                    nullable: false,
                  },
                  c: {
                    type: Type.STRING,
                    description: "Option C",
                    nullable: false,
                  },
                  d: {
                    type: Type.STRING,
                    description: "Option D",
                    nullable: false,
                  },
                },
                required: ["a", "b", "c", "d"],
              },
              explanation: {
                type: Type.STRING,
                description: "Explanation for the answer",
                nullable: false,
              },
              correctAnswer: {
                type: Type.STRING,
                description: "The correct answer option (a, b, c, or d)",
                nullable: false,
              },
              category: {
                type: Type.STRING,
                description: "The category of the question (financial, economicConcepts, or realEstate)",
                nullable: false,
              },
            },
            required: ["question", "options", "explanation", "correctAnswer", "category"],
          },
        },
      },
    });

    // API 응답 반환
    res.status(200).json({
      success: true,
      data: JSON.parse(response.text || "[]"),
    });
  } catch (error) {
    console.error("API 요청 오류:", error);
    res.status(500).json({
      success: false,
      message: "퀴즈 생성 중 오류가 발생했습니다",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
