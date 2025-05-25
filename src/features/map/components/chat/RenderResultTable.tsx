function RenderResultTable({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="mt-2 overflow-x-auto text-[9px]">
      <table className="min-w-full table-auto border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((key) => (
              <th key={key} className="border px-2 py-1">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col} className="border px-2 py-1">
                  {String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RenderResultTable;
