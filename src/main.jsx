import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Controller from './components/widgets/Controller.jsx';
import Admin from './components/admin/Admin.jsx';
import { SoundProvider } from './components/widgets/SoundProvider.jsx';
import { ContentProvider } from './data/content-context.jsx';
import './index.css';

const path = window.location.pathname.replace(/\/+$/, '');
const isController = path === '/controller';
const isAdmin = path === '/admin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isController ? (
      <Controller />
    ) : isAdmin ? (
      <Admin />
    ) : (
      <ContentProvider>
        <SoundProvider>
          <App />
        </SoundProvider>
      </ContentProvider>
    )}
  </React.StrictMode>
);
