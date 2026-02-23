import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import { beforeEach, it, expect, vi } from 'vitest';

import axios from 'axios';
vi.mock('axios');

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();

  localStorage.setItem('userRole', 'admin'); 
  localStorage.setItem('token', 'fake-token');
});

it('Renderira naslov Admin Dashboarda', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );

  const titleElement = await screen.findByText(/Upravljanje svim rezervacijama/i);
  expect(titleElement).toBeInTheDocument();
});

it('Prikazuje poruku kada je lista rezervacija prazna', async () => {
  axios.get.mockResolvedValue({ data: [] });

  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );

  const noDataElement = await screen.findByText(/Baza podataka je prazna/i);
  expect(noDataElement).toBeInTheDocument();
});