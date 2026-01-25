'use client';

import React from 'react';
import { Receipt } from 'lucide-react';
import { motion } from 'framer-motion';

interface TicketLineItem {
  label: string;
  price: string;
  highlight?: boolean;
}

interface TicketProps {
  title: string;
  items: TicketLineItem[];
  total?: string;
  icon?: React.ReactNode;
  variant?: 'restaurant' | 'transport' | 'default';
}

const variantStyles = {
  restaurant: {
    bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
    border: 'border-orange-200',
    header: 'bg-orange-100 text-orange-800',
    accent: 'text-orange-600'
  },
  transport: {
    bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    header: 'bg-blue-100 text-blue-800',
    accent: 'text-blue-600'
  },
  default: {
    bg: 'bg-gradient-to-br from-sand to-cream',
    border: 'border-navy-10',
    header: 'bg-navy-100 text-navy-800',
    accent: 'text-navy-600'
  }
};

export default function Ticket({ title, items, total, icon, variant = 'default' }: TicketProps) {
  const styles = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-3xl overflow-hidden border ${styles.border} ${styles.bg} max-w-sm mx-auto`}
    >
      {/* Ticket perforation top */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-2 flex items-center justify-between">
          <div className="w-4 h-4 rounded-full bg-cream" style={{ marginLeft: -16 }} />
          <div className="w-4 h-4 rounded-full bg-cream" style={{ marginRight: -16 }} />
        </div>
      </div>

      {/* Header */}
      <div className={`px-6 py-4 ${styles.header} flex items-center gap-3`}>
        {icon || <Receipt size={20} />}
        <span className="font-bold text-sm uppercase tracking-wider">{title}</span>
      </div>

      {/* Items */}
      <div className="px-6 py-5 space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-baseline ${item.highlight ? 'font-bold text-navy' : 'text-navy-70'}`}
          >
            <span className="text-sm">{item.label}</span>
            <span className={`font-mono text-base ${styles.accent}`}>{item.price}</span>
          </div>
        ))}

        {total && (
          <>
            <div className="border-t border-dashed border-navy-20 my-3" />
            <div className="flex justify-between items-baseline font-bold text-navy">
              <span className="text-sm">Total estimado</span>
              <span className="font-mono text-lg text-terracotta">{total}</span>
            </div>
          </>
        )}
      </div>

      {/* Ticket perforation bottom */}
      <div className="relative pb-2">
        <div className="absolute bottom-0 left-0 right-0 h-2 flex items-center justify-between">
          <div className="w-4 h-4 rounded-full bg-cream" style={{ marginLeft: -16 }} />
          <div className="w-4 h-4 rounded-full bg-cream" style={{ marginRight: -16 }} />
        </div>
      </div>
    </motion.div>
  );
}
