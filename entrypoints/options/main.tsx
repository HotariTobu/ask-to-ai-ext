import '@/index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Options } from './components/options';
import { Toaster } from '@/components/ui/sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Options />
    <Toaster />
  </React.StrictMode>,
);
