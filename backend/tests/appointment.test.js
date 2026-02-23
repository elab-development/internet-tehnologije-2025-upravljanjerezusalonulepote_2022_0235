const request = require('supertest');
const app = require('../app'); 

describe('Appointment API rutu testiranje', () => {
  
  it('treba da vrati 401 Unauthorized ako korisnik nije ulogovan', async () => {
    const res = await request(app)
      .get('/api/appointments');
    
    expect(res.statusCode).toEqual(401);
  });

  it('treba da ima definisanu rutu za appointments', async () => {
    const res = await request(app).get('/api/appointments');
    expect(res.statusCode).not.toEqual(404);
  });
});