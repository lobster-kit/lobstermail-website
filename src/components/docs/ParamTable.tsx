interface Param {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

export function ParamTable({ params }: { params: Param[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border-2 border-edge">
      <table className="w-full text-left text-sm">
        <thead className="border-b-2 border-edge bg-surface-3">
          <tr>
            <th className="px-4 py-3 font-bold text-foreground">Name</th>
            <th className="px-4 py-3 font-bold text-foreground">Type</th>
            <th className="px-4 py-3 font-bold text-foreground">Required</th>
            <th className="px-4 py-3 font-bold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name}>
              <td className="border-t border-edge-subtle px-4 py-3 font-mono text-accent text-[13px]">
                {p.name}
              </td>
              <td className="border-t border-edge-subtle px-4 py-3 font-mono text-[13px] text-secondary">
                {p.type}
              </td>
              <td className="border-t border-edge-subtle px-4 py-3">
                {p.required ? (
                  <span className="inline-flex items-center rounded-md bg-accent/10 border border-accent/30 px-2 py-0.5 text-[11px] font-bold text-accent uppercase tracking-wider">
                    Required
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-md bg-surface-4 border border-edge-subtle px-2 py-0.5 text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Optional
                  </span>
                )}
              </td>
              <td className="border-t border-edge-subtle px-4 py-3 text-secondary leading-relaxed">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
