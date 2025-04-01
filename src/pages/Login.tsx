import GoogleLogo from '@/assets/login/google.svg?react';
import logo from '@/assets/logo.png';

function Login() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center rounded-lg bg-white shadow-md">
      <img src={logo} alt="로고" className="h-[100px] w-[100px]" />
      <h2 className="mb-1 text-lg font-bold">ONAIR에 오신 것을 환영합니다</h2>
      <p className="mb-5 text-sm text-gray-600">공기 데이터를 위한 플랫폼!</p>

      <button className="flex w-[400px] items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-3 text-sm hover:bg-gray-100">
        <GoogleLogo />
        구글 계정으로 로그인
      </button>
      <p className="mt-4 text-xs text-gray-500">
        로그인 시 정보 수집에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  );
}

export default Login;
