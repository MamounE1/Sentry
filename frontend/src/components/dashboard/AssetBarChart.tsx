import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Asset } from '../../types/asset'
import type { Theme } from '../../hooks/useTheme'

interface AssetBarChartProps {
  data: Asset[]
  theme: Theme
}

export function AssetBarChart({ data, theme }: AssetBarChartProps) {
  const barColor = theme === 'dark' ? '#9FB3C8' : '#102A43'
  const gridColor = theme === 'dark' ? '#262626' : '#e5e5e5'
  const tickColor = theme === 'dark' ? '#a3a3a3' : '#737373'

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="mb-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
        Quantity by stock
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="symbol" stroke={tickColor} tickLine={false} axisLine={false} />
          <YAxis stroke={tickColor} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#171717' : '#ffffff',
              border: `1px solid ${gridColor}`,
              borderRadius: 8,
              color: theme === 'dark' ? '#f5f5f5' : '#171717',
            }}
          />
          <Bar dataKey="quantity" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
