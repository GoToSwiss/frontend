import Banner from '@/assets/home/banner.jpg';
import { Link } from 'react-router-dom';
import HomeDashBoard from './HomeDashBoard';

export default function HomeBanner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-300 text-white">
      <section
        className="flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-24 text-center"
        style={{ backgroundImage: `url(${Banner})` }}
      >
        <h1 className="mb-4 text-4xl font-bold leading-tight text-white drop-shadow md:text-5xl">
          환경 연구를 위한 스마트
          <br />한 데이터 분석 플랫폼
        </h1>
        <p className="mb-8 text-lg text-blue-100 drop-shadow">
          복잡한 대기질 데이터를 쉽고 직관적으로 분석하세요
        </p>
        <div className="flex gap-4">
          <Link to="/login" className="bg-blue-600 px-6 py-2 text-lg text-white hover:bg-blue-500">
            시작하기
          </Link>
          <Link
            to="/map"
            className="border border-white px-6 py-2 text-lg text-white hover:bg-white hover:text-blue-600"
          >
            둘러보기
          </Link>
        </div>
      </section>

      {/* 주요 기능 Section */}
      <section className="bg-white px-6 py-20 text-gray-800">
        <h2 className="mb-12 text-center text-2xl font-bold">주요 기능</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-6 text-center shadow">
            <div className="mb-4 text-4xl text-blue-500">⬆️</div>
            <h3 className="mb-2 text-lg font-semibold">데이터 업로드</h3>
            <p className="text-sm text-gray-600">
              CSV, Excel, JSON 등 다양한 형식의 파일을 손쉽게 업로드하고 관리할 수 있습니다.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 text-center shadow">
            <div className="mb-4 text-4xl text-green-500">📊</div>
            <h3 className="mb-2 text-lg font-semibold">데이터 분석</h3>
            <p className="text-sm text-gray-600">
              고급 통계 분석 도구를 활용하여 복잡한 대기질 데이터를 쉽게 분석할 수 있습니다.
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-6 text-center shadow">
            <div className="mb-4 text-4xl text-purple-500">📈</div>
            <h3 className="mb-2 text-lg font-semibold">시각화</h3>
            <p className="text-sm text-gray-600">
              직관적인 차트와 그래프를 통해 데이터를 시각화하고 인사이트를 얻을 수 있습니다.
            </p>
          </div>
        </div>
      </section>
      <HomeDashBoard />
    </div>
  );
}
