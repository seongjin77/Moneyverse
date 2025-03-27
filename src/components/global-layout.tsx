import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-white shadow-sm">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            {/* 로고 컨테이너 (왼쪽) */}
            <div className="flex items-center">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14">
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt="Moneyverse 로고"
                    fill
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>

              {/* 제목 (h1) */}
              <h1 className="ml-3 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                <Link
                  href="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  Moneyverse
                </Link>
              </h1>
            </div>

            {/* 여기에 필요한 경우 네비게이션 메뉴 추가 */}
            <nav className="hidden sm:block">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    홈
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    소개
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    서비스
                  </Link>
                </li>
              </ul>
            </nav>

            {/* 모바일 메뉴 버튼 (선택 사항) */}
            <div className="sm:hidden">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold mb-2">Moneyverse</h3>
              <p className="text-gray-400 text-sm">금융을 더 쉽고 스마트하게</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12">
              <div>
                <h4 className="text-md font-medium mb-2">링크</h4>
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      홈
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      소개
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      서비스
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium mb-2">문의</h4>
                <ul className="space-y-1">
                  <li className="text-gray-400 text-sm">
                    이메일: contact@moneyverse.com
                  </li>
                  <li className="text-gray-400 text-sm">전화: 02-123-4567</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center sm:text-left text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Moneyverse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
