import React from 'react';

export type Language = 'ur' | 'en';
export type UserRole = 'admin' | 'student' | null;

export interface MenuItem {
  id: string;
  label: { ur: string; en: string };
  icon: React.ReactNode;
  roles: ('admin' | 'student')[];
}
