'use client';

import { ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis, snapCenterToCursor } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { Option } from './vote-screen';

type CombinedRankingProps = {
  options: Option[];
  setOptions: (_options: Option[]) => void;
};

const SortableItem = ({ option, index }: { option: Option; index: number }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: option.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <div className="flex items-center space-x-2">
        <div className="w-6 text-center text-lg font-bold">{index + 1}</div>
        <Card className="grow">
          <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-4">
            <div {...attributes} {...listeners} className="cursor-move">
              <GripVertical className="size-5 text-muted-foreground" />
            </div>
            <CardTitle className="mx-2 grow text-sm sm:text-base">
              {option.title}
            </CardTitle>
            <span className="whitespace-nowrap text-xs font-medium sm:text-sm">
              {option.trustedActorSupport}% support
            </span>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <CardDescription className="text-xs sm:text-sm">
              {option.description}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DragOverlayContent = ({ option }: { option: Option }) => (
  <div className="mb-4">
    <div className="flex items-center space-x-2">
      <div className="w-6 text-center text-lg font-bold">-</div>
      <Card className="grow">
        <CardHeader className="flex flex-row items-center justify-between p-2 sm:p-4">
          <div className="cursor-move">
            <GripVertical className="size-5 text-muted-foreground" />
          </div>
          <CardTitle className="mx-2 grow text-sm sm:text-base">
            {option.title}
          </CardTitle>
          <span className="whitespace-nowrap text-xs font-medium sm:text-sm">
            {option.trustedActorSupport}% support
          </span>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <CardDescription className="text-xs sm:text-sm">
            {option.description}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  </div>
);

export function CombinedRanking({ options, setOptions }: CombinedRankingProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const oldIndex = options.findIndex((item) => item.id === active.id);
      const newIndex = options.findIndex((item) => item.id === over.id);
      setOptions(arrayMove(options, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const moveItem = (fromIndex: number, toIndex: number) =>
    setOptions(arrayMove(options, fromIndex, toIndex));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, snapCenterToCursor]}
    >
      <div className="max-h-[400px] overflow-y-auto rounded-lg bg-secondary/20 p-2 sm:p-4">
        <SortableContext items={options} strategy={verticalListSortingStrategy}>
          {options.map((option, index) => (
            <div key={option.id} className="flex items-center space-x-2">
              <SortableItem option={option} index={index} />
              <div className="flex flex-col space-y-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => index > 0 && moveItem(index, index - 1)}
                  disabled={index === 0}
                  aria-label={`Move ${option.title} up`}
                >
                  <ChevronUp className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    index < options.length - 1 && moveItem(index, index + 1)
                  }
                  disabled={index === options.length - 1}
                  aria-label={`Move ${option.title} down`}
                >
                  <ChevronDown className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeId ? (
          <DragOverlayContent
            option={options.find((o) => o.id === activeId)!}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
