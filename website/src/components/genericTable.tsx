import { ColumnConfig } from "@/types/tableConfig";
import { useState } from "react";

export type SortConfig = {
  columnIndex: number;
  direction: "asc" | "desc";
};

type GenericTableProps<T> = {
  title?: string;
  data: T[];
  columns: ColumnConfig<T>[];
};

export function GenericTable<T>({
  data,
  columns,
  title,
}: GenericTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;

    const column = columns[sortConfig.columnIndex];
    if (!column.sortFunction) return 0;

    const comparison = column.sortFunction(a, b);
    return sortConfig.direction === "asc" ? comparison : -comparison;
  });

  return (
    <>
      {title && <h1 className="text-2xl font-bold">{title}</h1>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column, index) => (
                <th key={`header-${index}`} className="px-4 py-2 border-b">
                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setSortConfig({
                        columnIndex: index,
                        direction:
                          sortConfig?.columnIndex === index &&
                          sortConfig.direction === "desc"
                            ? "asc"
                            : "desc",
                      })
                    }
                  >
                    {column.label}
                    {sortConfig?.columnIndex === index && (
                      <span>
                        {sortConfig.direction === "asc" ? "🔼" : "🔽"}
                      </span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {columns.map((column, colIndex) => (
                  <td
                    key={`row-${rowIndex}-col-${colIndex}`}
                    className="px-4 py-2 border-b text-center align-middle"
                  >
                    {column.renderFunction
                      ? column.renderFunction(row)
                      : column.valueFunction(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
