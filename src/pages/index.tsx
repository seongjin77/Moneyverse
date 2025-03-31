import type { NextPage } from "next";
import Image from "next/image";

export async function getStaticProps() {
  return {
    props: {},
  };
}

const Home: NextPage = () => {
  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="flex flex-col items-center space-y-8">
        <div className="relative rounded-[30px] overflow-hidden w-48 h-48 sm:w-64 sm:h-64">
          <Image
            src="/images/moneyverse_main_optimized.png"
            alt="Moneyverse 로고"
            fill
            sizes="(max-width: 640px) 192px, 256px"
            quality={60}
            loading="eager"
            className="object-contain"
            priority
          />
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            난이도를 선택하시겠습니까?
          </h2>
          <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
            <button className="w-32 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              쉬움
            </button>
            <button className="w-32 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
              중간
            </button>
            <button className="w-32 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              어려움
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <article className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            하루 열문제
          </h3>
          <p className="text-gray-600">
            매일 10개의 금융 문제를 풀며
            <br />
            금융 상식을 키우세요.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            결과 피드백
          </h3>
          <p className="text-gray-600">
            문제 풀이 후 상세한 피드백을 통해
            <br />
            학습 효과를 높이세요.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            단계별 학습
          </h3>
          <p className="text-gray-600">
            난이도별로 구성된 문제를 통해
            <br />
            체계적으로 금융 지식을 쌓으세요.
          </p>
        </article>
      </section>
    </article>
  );
};

export default Home;
