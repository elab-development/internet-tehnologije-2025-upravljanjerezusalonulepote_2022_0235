import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter } from 'react-router-dom';
import { expect, test, beforeEach } from 'vitest';

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('role', 'admin');
  localStorage.setItem('token', 'fake-jwt-token');
  localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
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