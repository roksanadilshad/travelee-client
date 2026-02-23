'use client';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function ActivityModal({ isOpen, onClose, onSave }) {
  const [data, setData] = useState({ time: '', task: '', cost: ''});
  useEffect(() => {
    if (isOpen) setData({ time: '', task: '', cost: ''});
  }, [isOpen]);

  if (!isOpen) return null;

 const handleAdd = () => {
  if (!data.time || !data.task) {
    Swal.fire({
      icon: 'warning',
      title: 'Incomplete Activity',
      text: 'Please fill in both time and task!',
      confirmButtonColor: '#3085d6',
    });
    return;
  }

  onSave({ ...data, cost: parseFloat(data.cost) || 0 });
  onClose();
};
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Add Activity</h2>
        <input 
          type="time" className="w-full border p-2 rounded mb-3"
          onChange={(e) => setData({...data, time: e.target.value})} 
        />
         {/* <input 
          type='date' className="w-full border p-2 rounded mb-3"
          onChange={(e) => setData({...data, startDate: e.target.value})} 
        /> */}
        
        <input 
          type="text" placeholder="What are you doing?" className="w-full border p-2 rounded mb-3"
          onChange={(e) => setData({...data, task: e.target.value})} 
        />
        <input 
          type="number" placeholder="Estimated Cost ($)" className="w-full border p-2 rounded mb-4"
          onChange={(e) => setData({...data, cost: e.target.value})} 
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>

          <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
  Add to Plan
</button>
          {/* <button 
            onClick={() => { onSave(data); onClose(); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Add to Plan
          </button> */}
        </div>
      </div>
    </div>
  );
}