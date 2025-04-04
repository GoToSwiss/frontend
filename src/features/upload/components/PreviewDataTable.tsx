export default function PreviewDataTable() {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">데이터 미리보기</h3>
      <table className="w-full table-auto border-collapse border-b border-t border-border_color text-center">
        <thead>
          <tr className="bg-web_bg">
            <th className="border-b border-t border-border_color p-2 text-theme_secondary">날짜</th>
            <th className="border-b border-t border-border_color p-2 text-theme_secondary">
              온도 (°C)
            </th>
            <th className="border-b border-t border-border_color p-2 text-theme_secondary">
              습도 (%)
            </th>
            <th className="border-b border-t border-border_color p-2 text-theme_secondary">
              미세먼지
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">
              2024-02-20
            </td>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">23.5</td>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">65</td>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">45</td>
          </tr>
          <tr>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">
              2024-02-21
            </td>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">23.5</td>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">65</td>
            <td className="border-b border-t border-border_color p-2 text-theme_tertiary">45</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
