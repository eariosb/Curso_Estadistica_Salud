interface Props {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  caption?: string;
}

export default function DataTable({ headers, rows, caption }: Props) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ borderBottom: "2px solid var(--border)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className="text-left px-4 py-3 font-semibold text-[0.75rem] uppercase tracking-wide"
                style={{ color: "var(--fg-muted)", background: "var(--muted)" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="transition-colors"
              style={{ borderBottom: ri < rows.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-4 py-3 leading-relaxed"
                  style={{ color: "var(--fg)" }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className="px-4 py-2 text-xs text-center" style={{ color: "var(--fg-subtle)", borderTop: "1px solid var(--border)" }}>
          {caption}
        </p>
      )}
    </div>
  );
}
