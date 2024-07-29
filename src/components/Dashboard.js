import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Token ${token}` },
      };
      const expensesResponse = await axios.get('http://127.0.0.1:8000/api/expenses/', config);
      const incomeResponse = await axios.get('http://127.0.0.1:8000/api/incomes/', config);
      setExpenses(expensesResponse.data);
      setIncome(incomeResponse.data);
    };
    fetchData();
  }, []);

  const expenseData = {
    labels: expenses.map(expense => expense.date),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(expense => expense.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const incomeData = {
    labels: income.map(income => income.date),
    datasets: [
      {
        label: 'Income',
        data: income.map(income => income.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl mb-2">Expenses</h3>
          <Line data={expenseData} />
        </div>
        <div>
          <h3 className="text-xl mb-2">Income</h3>
          <Line data={incomeData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
