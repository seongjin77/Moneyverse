import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <header className="w-full bg-white shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0"
            >
              <Image
                src="/images/logo.png"
                alt="Moneyverse 로고"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <h1 className="ml-3 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              <Link
                href="/"
                className="hover:text-yellow-500 transition-colors"
              >
                Moneyverse
              </Link>
            </h1>
          </div>
        </div>
      </header>
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div>
              <h3 className="text-lg font-semibold mb-2">Moneyverse</h3>
              <p className="text-gray-400 text-sm">금융을 더 쉽고 스마트하게</p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>제작자: 김성진</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
