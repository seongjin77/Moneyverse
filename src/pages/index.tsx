export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          금융을 더 쉽고 스마트하게
        </h2>
        <p className="text-gray-600 max-w-3xl">
          Moneyverse에서 제공하는 다양한 금융 서비스를 통해 당신의 자산을
          효율적으로 관리하세요. 우리는 최신 기술과 금융 전문가의 통찰력을
          바탕으로 한 솔루션을 제공합니다.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            자산 관리
          </h3>
          <p className="text-gray-600">
            개인 맞춤형 자산 관리 서비스로 더 나은 수익을 창출하세요.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            금융 교육
          </h3>
          <p className="text-gray-600">
            금융 지식을 쌓고 더 현명한 투자 결정을 내릴 수 있습니다.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            투자 분석
          </h3>
          <p className="text-gray-600">
            데이터 기반 분석을 통해 최적의 투자 포트폴리오를 구성하세요.
          </p>
        </div>
      </section>
    </div>
  );
}
