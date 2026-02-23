import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ rsdPrice }) => {
  const [eurPrice, setEurPrice] = useState(null);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/RSD")
      .then(res => res.json())
      .then(data => {
        const rate = data.rates.EUR;
        setEurPrice((rsdPrice * rate).toFixed(2));
      })
      .catch(err => console.error("Kurs API greška:", err));
  }, [rsdPrice]);

  return (
    <span style={{ fontSize: '0.85em', color: '#888', marginLeft: '5px' }}>
      ({eurPrice ? `${eurPrice} €` : "učitavam..."})
    </span>
  );
};

export default CurrencyConverter;