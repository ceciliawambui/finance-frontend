import React, { useState } from 'react';
import { fetchIncomes, fetchExpenses } from '../api/finance';

const FilterByMonth = () => {
  const [month, setMonth] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleFilter = async () => {
    const allIncomes = await fetchIncomes();
    const allExpenses = await fetchExpenses();

    const filteredIncomes = allIncomes.filter(income => new Date(income.date).getMonth() + 1 === parseInt(month));
    const filteredExpenses = allExpenses.filter(expense => new Date(expense.date).getMonth() + 1 === parseInt(month));

    setIncomes(filteredIncomes);
    setExpenses(filteredExpenses);
  };

  return (
    <div>
      <h1>Filter by Month</h1>
      <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Enter month (1-12)" />
      <button onClick={handleFilter} className="bg-blue-500 text-white py-2 px-4 rounded">Filter</button>
      <h2>Incomes</h2>
      <ul>
        {incomes.map(income => (
          <li key={income.id}>
            {income.amount} - {income.date} - {income.description}
          </li>
        ))}
      </ul>
      <h2>Expenses</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.category} - {expense.amount} - {expense.date} - {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterByMonth;
