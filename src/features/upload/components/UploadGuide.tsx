import mapping from '../mapping';

export default function UploadGuide({ open }: { open: boolean }) {
  return (
    <div
      className={`mt-2 overflow-hidden transition-all duration-300 ${
        open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}
      aria-hidden={!open}
    >
      <div className="relative rounded border bg-white p-4 shadow">
        <p className="mb-4">
          데이터 업로드 시, 엑셀 파일의 컬럼명은 아래의 값들이 모두 포함되어야 합니다.
          <br />
          컬럼명 순서는 자유이나, 반드시 모든 컬럼명이 정확히 일치해야 하며 누락되는 값이 없어야
          합니다.
        </p>
        <ul className="max-h-48 list-inside list-disc overflow-auto rounded border bg-gray-50 p-2 text-sm text-gray-700">
          {mapping.map((col) => (
            <li key={col}>{col}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
