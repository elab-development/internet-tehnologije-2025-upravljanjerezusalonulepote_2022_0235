import { render, screen } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

test('Renderuje naslov Admin Dashboarda', () => {
  localStorage.setItem('role', 'admin');
  localStorage.setItem('token', 'fake-jwt-token');
  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Upravljanje svim rezervacijama/i);
  expect(titleElement).toBeInTheDocument();
});

test('Prikazuje poruku kada je lista rezervacija prazna', () => {
  render(
    <BrowserRouter>
      <AdminDashboard />
    </BrowserRouter>
  );
  const noDataElement = screen.getByText(/Baza podataka je prazna/i);
  expect(noDataElement).toBeInTheDocument();
});