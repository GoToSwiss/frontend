export default function PreviewDataTable() {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">데이터 미리보기</h3>
      <table className="w-full table-auto border-collapse border-b border-t border-gray-100 text-center">
        <thead>
          <tr className="bg-gray-300">
            <th className="border-b border-t border-gray-300 p-2">날짜</th>
            <th className="border-b border-t border-gray-300 p-2">온도 (°C)</th>
            <th className="border-b border-t border-gray-300 p-2">습도 (%)</th>
            <th className="border-b border-t border-gray-300 p-2">미세먼지</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-t border-gray-300 p-2">2024-02-20</td>
            <td className="border-b border-t border-gray-300 p-2">23.5</td>
            <td className="border-b border-t border-gray-300 p-2">65</td>
            <td className="border-b border-t border-gray-300 p-2">45</td>
          </tr>
          <tr>
            <td className="border-b border-t border-gray-300 p-2">2024-02-21</td>
            <td className="border-b border-t border-gray-300 p-2">23.5</td>
            <td className="border-b border-t border-gray-300 p-2">65</td>
            <td className="border-b border-t border-gray-300 p-2">45</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
