"use client"
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableActivity } from "./SortableActivity";

export function DayContent({ day, dayIdx, sensors, onDragEnd }) {
  if (!day) return null;

  return (
    <main className="flex-1 max-w-2xl">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-4xl font-black">Day {dayIdx + 1}</h2>
        {/* Add Activity Button Logic here */}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={day.activities.map(a => a.id)} strategy={verticalListSortingStrategy}>
          <div className="relative space-y-4">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200" />
            {day.activities.map((act) => (
              <SortableActivity key={act.id} act={act} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </main>
  );
}