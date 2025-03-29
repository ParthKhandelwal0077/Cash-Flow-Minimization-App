import React, { useState } from 'react';

const CashFlowModal = ({ show, onClose, onSubmit }) => {
  const [rows, setRows] = useState([
    { id: 1, person1: '', person2: '', amount: '' }
  ]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, person1: '', person2: '', amount: '' }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id, field, value) => {
    setRows(rows.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleSubmit = () => {
    const data = rows.map(row => ({
      from: row.person1,
      to: row.person2,
      amount: parseInt(row.amount)
    })).filter(row => row.from && row.to && row.amount);

    onSubmit(data);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Enter Cash Flow Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Enter the values in the form as: Person 1 needs to give some amount to Person 2
          </p>
        </div>

        <div className="mb-4">
          <button
            onClick={addRow}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add New Row
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Action</th>
                <th className="border border-gray-300 p-2">Person 1</th>
                <th className="border border-gray-300 p-2">Person 2</th>
                <th className="border border-gray-300 p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.person1}
                      onChange={(e) => updateRow(row.id, 'person1', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row.person2}
                      onChange={(e) => updateRow(row.id, 'person2', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                  <td className="border border-gray-300 p-2">
                    <input
                      type="number"
                      value={row.amount}
                      onChange={(e) => updateRow(row.id, 'amount', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashFlowModal; 