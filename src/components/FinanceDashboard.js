import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchIncomes, fetchExpenses } from '../api/finance';
import Navbar from './Navbar';

// Registering components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinanceDashboard = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const loadData = async () => {
      const incomes = await fetchIncomes();
      const expenses = await fetchExpenses();

      // Example data transformation
      const labels = ['January', 'February', 'March', 'April', 'May'];
      const incomeData = incomes.map(item => item.amount); 
      const expenseData = expenses.map(item => item.amount);

      setData({
        labels: labels,
        datasets: [
          {
            label: 'Incomes',
            data: incomeData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Expenses',
            data: expenseData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    };

    loadData();
  }, []);

  return (
    <div className="p-4">
      <Navbar />
      <h2 className="text-lg font-bold">Finance Dashboard</h2>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Monthly Incomes and Expenses',
            },
          },
        }}
      />
    </div>
  );
};

export default FinanceDashboard;
