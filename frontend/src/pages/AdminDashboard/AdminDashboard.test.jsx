import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, beforeEach, vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();

  localStorage.setItem('userRole', 'ADMIN'); 
  localStorage.setItem('token', 'fake-jwt-token');

  axios.get.mockResolvedValue({ data: [] });
});

test('Renderuje naslov Admin Dashboarda', async () => {
  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );

  const titleElement = await screen.findByText(/Upravljanje svim rezervacijama/i);
  expect(titleElement).toBeInTheDocument();
});

test('Prikazuje poruku kada je lista rezervacija prazna', async () => {
  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );

  const noDataElement = await screen.findByText(/Baza podataka je prazna/i);
  expect(noDataElement).toBeInTheDocument();
});