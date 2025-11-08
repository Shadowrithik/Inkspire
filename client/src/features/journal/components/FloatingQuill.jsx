import React from 'react';
import { motion } from 'framer-motion';
import { PencilIcon } from '@heroicons/react/24/outline'; // Using Heroicon's Pencil

// Converted from TypeScript to JavaScript
export function FloatingQuill({ isWriting }) {
  if (!isWriting) return null;

  return (
    <motion.div
      className="fixed right-8 bottom-8 pointer-events-none z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        y: [0, -10, 0],
        rotate: [-5, 5, -5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Replaced Feather with PencilIcon and styled it */}
      <PencilIcon className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-70" />
    </motion.div>
  );
}
