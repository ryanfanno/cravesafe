import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface NutritionChartProps {
  macros: {
    protein: number;
    fat: number;
    carbs: number;
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const NutritionChart: React.FC<NutritionChartProps> = ({ macros }) => {
  const data = [
    { name: 'Protein', value: macros.protein },
    { name: 'Fat', value: macros.fat },
    { name: 'Carbs', value: macros.carbs },
  ];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};