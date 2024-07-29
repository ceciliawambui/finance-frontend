import React, { useState, useEffect } from 'react';
import { fetchExpenses, createExpense, fetchCategories } from '../api/finance';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newExpense, setNewExpense] = useState({ category: '', amount: '', description: '', date: '' });

  useEffect(() => {
    const loadExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data);
    };

    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadExpenses();
    loadCategories();
  }, []);

  const handleAddExpense = async () => {
    if (newExpense.category && newExpense.amount && newExpense.description && newExpense.date) {
      const expense = await createExpense(newExpense.category, newExpense.amount, newExpense.description, newExpense.date);
      setExpenses([...expenses, expense]);
      setNewExpense({ category: '', amount: '', description: '', date: '' });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Expenses</h2>
      <div className="mb-4">
        <select
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="border p-2 ml-2"
          placeholder="Amount"
        />
        <input
          type="text"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          className="border p-2 ml-2"
          placeholder="Description"
        />
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          className="border p-2 ml-2"
        />
        <button onClick={handleAddExpense} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add Expense
        </button>
      </div>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="py-2">
            {expense.category} - {expense.amount} - {expense.description} - {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
