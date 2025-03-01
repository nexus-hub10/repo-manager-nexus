
import React, { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SwipeableProps {
  onDelete: () => void;
  children: React.ReactNode;
}

const Swipeable: React.FC<SwipeableProps> = ({ onDelete, children }) => {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const deleteThreshold = -100; // Amount of pixels to swipe before deleting

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    setIsDragging(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    currentX.current = startX.current;
    setIsDragging(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = x - startX.current;
    currentX.current = x;
    
    // Only allow left swipes (negative offset)
    if (diff <= 0) {
      setOffset(diff);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const x = e.clientX;
    const diff = x - startX.current;
    currentX.current = x;
    
    // Only allow left swipes (negative offset)
    if (diff <= 0) {
      setOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    handleSwipeEnd();
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    handleSwipeEnd();
  };

  const handleSwipeEnd = () => {
    setIsDragging(false);
    
    if (offset < deleteThreshold) {
      // Delete if swiped past threshold
      onDelete();
    }
    
    // Reset offset with animation
    setOffset(0);
  };

  const getProgressPercentage = () => {
    if (offset >= 0) return 0;
    const percentage = Math.min(Math.abs(offset) / Math.abs(deleteThreshold), 1) * 100;
    return percentage;
  };

  return (
    <div className="relative overflow-hidden rounded-lg swipe-action">
      {/* Delete indicator background */}
      <div 
        className="absolute inset-0 bg-destructive flex items-center justify-start px-4"
        style={{
          opacity: getProgressPercentage() / 100
        }}
      >
        <ArrowLeft className="text-destructive-foreground" />
        <span className="ml-2 font-medium text-destructive-foreground">Delete</span>
      </div>
      
      {/* Swipeable content */}
      <div
        className={cn(
          "relative bg-card transition-transform",
          isDragging ? "transition-none" : "transition-transform duration-300 ease-out"
        )}
        style={{ transform: `translateX(${offset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {children}
      </div>
    </div>
  );
};

export default Swipeable;
