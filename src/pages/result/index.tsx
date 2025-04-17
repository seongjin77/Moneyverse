"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { Label, Pie, PieChart, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// 차트 설정 직접 문자열로 관리
const chartConfig = {
  score: {
    label: "정답률",
  },
  financial: {
    label: "금융 상품/기관 이해",
    color: "hsl(var(--chart-1))",
  },
  economicConcepts: {
    label: "경제 개념/지표 이해",
    color: "hsl(var(--chart-2))",
  },
  realEstate: {
    label: "부동산",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

// 결과 데이터 타입 정의
interface CategoryResult {
  category: string;
  name: string;
  wrongPercentage: number;
  wrongCount: number;
  totalCount: number;
  correctRate: number;
  color: string;
}

export default function Result() {
  const router = useRouter();
  const quizList = useQuizStore((state) => state.storeQuizList);
  const answerList = useQuizStore((state) => state.storeAnswerList);

  // 결과 데이터 계산
  const resultData = useMemo<CategoryResult[]>(() => {
    if (!quizList.length || !answerList.length) return [];

    // 카테고리별 오답/문제 수 카운트
    const categoryResults: Record<string, { wrong: number; total: number }> = {
      financial: { wrong: 0, total: 0 },
      economicConcepts: { wrong: 0, total: 0 },
      realEstate: { wrong: 0, total: 0 },
    };

    // 총 오답 수 계산
    let totalWrongCount = 0;

    // 각 문제별 사용자 정답 확인
    const categoryKeys = ["financial", "economicConcepts", "realEstate"] as const;

    quizList.forEach((quiz) => {
      const categoryKey = categoryKeys.find((key) => quiz.category === key);
      if (categoryKey) {
        categoryResults[categoryKey].total += 1;
      }

      // 오답인 경우
      const isWrong = answerList.find((answer) => answer.questionId === quiz.id)?.answer !== quiz.correctAnswer;

      if (isWrong) {
        categoryResults[quiz.category].wrong += 1;
        totalWrongCount += 1;
      }
    });

    // 차트 데이터 형식으로 변환 (오답 비율 기준)
    return Object.entries(categoryResults)
      .map(([category, { wrong, total }]) => {
        // 전체 오답 중 이 카테고리의 오답 비율
        const wrongPercentage = totalWrongCount > 0 && wrong > 0 ? Math.round((wrong / totalWrongCount) * 100) : 0;

        // 카테고리별 정답률 계산 (맞은 문제 / 전체 문제)
        const correctRate = total > 0 ? Math.round(((total - wrong) / total) * 100) : 0;

        // category를 chartConfig의 키 타입으로 타입 단언
        const categoryKey = category as keyof typeof chartConfig;

        return {
          category,
          name: chartConfig[categoryKey].label, // 직접 label 값을 name으로 사용
          wrongPercentage,
          wrongCount: wrong,
          totalCount: total,
          correctRate, // 카테고리별 정답률 추가
          // score 카테고리는 color 속성이 없으므로 조건부로 처리
          color: categoryKey === "score" ? "" : chartConfig[categoryKey].color || "",
        };
      })
      .filter((item) => item.totalCount > 0); // 문제가 있는 카테고리만 표시 (오답이 없어도 표시)
  }, [quizList, answerList]);

  console.log(resultData);

  const totalStats = resultData.reduce(
    (acc, curr) => {
      return {
        totalCorrect: acc.totalCorrect + (curr.totalCount - curr.wrongCount),
        totalQuestions: acc.totalQuestions + curr.totalCount,
        wrongAnswers: acc.wrongAnswers + curr.wrongCount,
      };
    },
    { totalCorrect: 0, totalQuestions: 0, wrongAnswers: 0 }
  );

  // 전체 정답률을 정확히 계산 (맞은 문제 / 전체 문제)
  const scorePercentage =
    totalStats.totalQuestions > 0 ? Math.round((totalStats.totalCorrect / totalStats.totalQuestions) * 100) : 0;

  // 약점 카테고리 분석 (정답률이 50% 미만인 카테고리 중 가장 낮은 순)
  const weakCategory = resultData.filter((cat) => cat.correctRate < 50).sort((a, b) => a.correctRate - b.correctRate);

  // 강점 카테고리 분석 (정답률이 50% 이상인 카테고리 중 가장 높은 순)
  const strongCategory = resultData
    .filter((cat) => cat.correctRate >= 50)
    .sort((a, b) => b.correctRate - a.correctRate);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold pt-10 mb-6">경제 지식 분석 결과</h2>

      {resultData.length > 0 ? (
        <>
          <div className="w-full mb-8 flex flex-col items-center">
            <div className="mb-4 text-center">
              <p className="text-lg">
                총 {totalStats.totalQuestions}문제 중 {totalStats.wrongAnswers}개 오답
              </p>
              <p className="text-2xl font-bold mt-2">전체 정답률: {scorePercentage}%</p>
            </div>

            {totalStats.wrongAnswers > 0 && (
              <div className="w-full">
                <h3 className="text-xl font-bold mb-2 text-center">오답 분포</h3>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                      data={resultData}
                      dataKey="wrongPercentage"
                      nameKey="category"
                      innerRadius={60}
                      strokeWidth={5}
                    >
                      {resultData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                  {totalStats.wrongAnswers}
                                </tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                  총 오답 수
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </div>
            )}
          </div>

          <div className="w-full">
            <h3 className="text-xl font-bold mb-4">카테고리별 분석</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {resultData.map((item) => (
                <div key={item.category} className="border rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold mb-2" style={{ color: item.color }}>
                    {item.name}
                  </h4>
                  <div className="flex justify-between items-center mb-1">
                    <span>오답 수:</span>
                    <span className="font-bold">
                      {item.wrongCount}/{item.totalCount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>전체 오답 중 비율:</span>
                    <span className="text-lg font-bold">{item.wrongPercentage}%</span>
                  </div>
                </div>
              ))}
            </div>

            {weakCategory && (
              <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">취약점 분석</h3>
                {weakCategory.map((category, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <p className="font-medium mb-2">
                      <span className="text-red-600">취약 분야 {index + 1}:</span> {category.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {category.name} 분야에서 {category.wrongCount}개의 오답이 있습니다 (정답률 {category.correctRate}
                      %). 이 분야에 대한 추가 학습이 필요합니다.
                    </p>
                  </div>
                ))}
              </div>
            )}

            {strongCategory && (
              <div className="mt-4 bg-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">강점 분석</h3>
                {strongCategory.map((category, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <p className="font-medium mb-2">
                      <span className="text-blue-600">강점 분야 {index + 1}:</span> {category.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {category.name} 분야에서 {category.totalCount - category.wrongCount}개의 문제를 맞췄습니다 (정답률{" "}
                      {category.correctRate}%). 이 분야에 대한 이해도가 높습니다.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="text-center p-10">
          <p className="text-lg text-gray-600 mb-6">퀴즈 데이터가 없습니다. 퀴즈를 먼저 풀어주세요.</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            홈으로 이동하기
          </button>
        </div>
      )}
    </div>
  );
}
