import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Asset } from '../../types/asset'
import type { Theme } from '../../hooks/useTheme'

interface AssetBarChartProps {
  data: Asset[]
  theme: Theme
}

export function AssetBarChart({ data, theme }: AssetBarChartProps) {
  const barColor = theme === 'dark' ? '#60A5FA' : '#2563EB'
  const gridColor = theme === 'dark' ? '#1f2937' : '#e5e7eb'
  const tickColor = theme === 'dark' ? '#9ca3af' : '#6b7280'

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
        Quantity by stock
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="symbol" stroke={tickColor} tickLine={false} axisLine={false} />
          <YAxis stroke={tickColor} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#111827' : '#ffffff',
              border: `1px solid ${gridColor}`,
              borderRadius: 8,
              color: theme === 'dark' ? '#f3f4f6' : '#111827',
            }}
          />
          <Bar dataKey="quantity" fill={barColor} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
