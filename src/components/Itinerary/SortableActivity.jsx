"use client"

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaClock, FaTrash, FaGripVertical } from "react-icons/fa";

export function SortableActivity({ act, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: act.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="relative flex gap-6 items-start group"
    >
      {/* The Timeline Dot & Drag Handle */}
      <div 
        {...attributes} 
        {...listeners} 
        className="z-10 bg-white border-4 border-[#F8FAFC] text-primary p-2 rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
      >
        <FaGripVertical size={16} />
      </div>

      <div className="bg-white flex-1 p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-1 rounded-md">
              {act.time}
            </span>
            <h4 className="text-lg font-bold text-gray-800 mt-2">{act.task}</h4>
          </div>
          <div className="text-right">
            <p className="text-lg font-black text-green-600">${act.cost}</p>
            <button 
              onClick={() => onDelete(act.id)} 
              className="text-red-300 hover:text-red-500 transition-all p-1"
            >
              <FaTrash size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}