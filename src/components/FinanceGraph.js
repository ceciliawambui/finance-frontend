import React, { useEffect, useState } from 'react';
import { fetchIncomes, fetchExpenses } from '../api/finance';
import { Bar } from 'react-chartjs-2';

const FinanceGraph = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const incomes = await fetchIncomes();
      const expenses = await fetchExpenses();

      setIncomeData(incomes.map(income => ({
        date: income.date,
        amount: income.amount,
      })));

      setExpenseData(expenses.map(expense => ({
        date: expense.date,
        amount: expense.amount,
      })));
    };

    loadData();
  }, []);

  const data = {
    labels: [...new Set([...incomeData.map(d => d.date), ...expenseData.map(d => d.date)])],
    datasets: [
      {
        label: 'Income',
        data: incomeData.map(d => d.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expenses',
        data: expenseData.map(d => d.amount),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h1>Finance Graph</h1>
      <Bar data={data} />
    </div>
  );
};

export default FinanceGraph;
