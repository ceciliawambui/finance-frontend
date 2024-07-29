import React, { useState, useEffect } from 'react';
import { fetchIncomes, createIncome } from '../api/finance';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [newIncome, setNewIncome] = useState({ amount: '', description: '', date: '' });

  useEffect(() => {
    const loadIncomes = async () => {
      const data = await fetchIncomes();
      setIncomes(data);
    };

    loadIncomes();
  }, []);

  const handleAddIncome = async () => {
    if (newIncome.amount && newIncome.description && newIncome.date) {
      const income = await createIncome(newIncome.amount, newIncome.description, newIncome.date);
      setIncomes([...incomes, income]);
      setNewIncome({ amount: '', description: '', date: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Incomes</h2>
      <div className="mb-4">
        <input
          type="number"
          value={newIncome.amount}
          onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
          className="border p-2"
          placeholder="Amount"
        />
        <input
          type="text"
          value={newIncome.description}
          onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })}
          className="border p-2 ml-2"
          placeholder="Description"
        />
        <input
          type="date"
          value={newIncome.date}
          onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
          className="border p-2 ml-2"
        />
        <button onClick={handleAddIncome} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add Income
        </button>
      </div>
      <ul>
        {incomes.map((income) => (
          <li key={income.id} className="py-2">{income.amount} - {income.description} - {income.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Incomes;
