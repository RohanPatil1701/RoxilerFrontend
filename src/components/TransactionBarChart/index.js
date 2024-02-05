import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  {category: 'X', date: '2024-02-01', items: [0, 100]},
  {category: 'Y', date: '2024-02-02', items: [101, 200]},
  {category: 'Z', date: '2024-02-01', items: [201, 300]},
  {category: 'X', date: '2024-01-01', items: [301, 400]},
  {category: 'Y', date: '2024-01-01', items: [401, 500]},
]

const TransactionBarChart = () => {
  const DataFormatter = number => {
    if (number > 0) {
      return `${(number / 100).toString()}k`
    }
    return number.toString()
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <XAxis
          dataKey="category"
          tick={{
            stroke: 'gray',
            strokeWidth: 0.5,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
            strokeHeight: 1,
          }}
          domain={[0, 100]}
        />
        <Legend
          wrapperStyle={{
            padding: 0,
          }}
        />
        <Bar dataKey="items" name="items" fill="blue" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default TransactionBarChart
