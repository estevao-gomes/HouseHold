import { useState } from 'react';
import { DateButton } from './components/DateButton';
import { Header } from './components/Header';

export function App() {
  return (
    <div className="bg-white max-w-[678px] mx-auto mt-4 p-4 min-h-[480px]">
      <Header />
      <DateButton />
    </div>
  );
}
