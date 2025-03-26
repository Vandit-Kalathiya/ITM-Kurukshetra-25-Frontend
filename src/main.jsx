import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster as Sonner } from "./Component/CropAdvisoryBot/components/ui/Sonner.jsx";
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { TooltipProvider } from './Component/CropAdvisoryBot/components/ui/Tooltip.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TooltipProvider>
      <Toaster/>
      <Sonner />
      <App />
    </TooltipProvider>
  </BrowserRouter>
)
