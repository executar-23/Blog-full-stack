import type { ReactNode } from 'react';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-components';
import { blogTokens } from '@blog/tokens';

const useStyles = makeStyles({
  table: { borderCollapse: 'collapse', width: '100%', fontSize: blogTokens.font.body.size },
  cell: {
    borderBottomWidth: tokens.strokeWidthThin,
    borderBottomStyle: 'solid',
    borderBottomColor: blogTokens.color.border,
    paddingBlock: blogTokens.spacing.sm,
    paddingInline: blogTokens.spacing.sm,
    textAlign: 'left',
    verticalAlign: 'top',
  },
  code: { fontFamily: blogTokens.fontFamily.mono },
});

export interface TokenRow {
  name: string;
  preview?: ReactNode;
  value: string;
  status: string;
  source: string;
}

/** Catalogue table: token → preview → specified value → status → source. */
export function TokenTable({ rows, caption }: { rows: readonly TokenRow[]; caption: string }) {
  const s = useStyles();
  return (
    <table className={s.table}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          {['Token', 'Preview', 'Especificação', 'Status', 'Fonte'].map((h) => (
            <th key={h} scope="col" className={s.cell}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.name}>
            <th scope="row" className={s.cell}>
              <code className={s.code}>{r.name}</code>
            </th>
            <td className={s.cell}>{r.preview}</td>
            <td className={s.cell}>
              <code className={s.code}>{r.value}</code>
            </td>
            <td className={s.cell}>{r.status}</td>
            <td className={s.cell}>{r.source}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const sourceOf = (s: { file: string; line: number }) =>
  s.line > 0 ? `${s.file.split('/').pop()}:${s.line}` : (s.file.split('/').pop() ?? '');
