import React, { useState } from "react";
import Card from "../../components/Card";
import Modal from "../../components/Modal";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Home.css";

function Home() {
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      title: "New Arrivals",
      description: "Check out the latest beauty products.",
      details: "Discover brand new beauty products curated for you.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
      title: "Makeup Tips",
      description: "Easy looks for every day.",
      details: "Learn professional makeup tips and tricks.",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
    },
    {
      title: "Salon Services",
      description: "Manicure, pedicure, hair styling & more.",
      details: "Premium salon services with top professionals.",
      image: "https://images.unsplash.com/photo-1556228724-4b2d5b2c7f6b",
    },
    {
      title: "Skincare Routine",
      description: "Glow up your skin.",
      details: "Build your perfect skincare routine.",
      image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552",
    },
    {
      title: "Hair Trends",
      description: "Latest hairstyles & colors.",
      details: "Explore trending hairstyles and colors.",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
    },
    {
      title: "Beauty Deals",
      description: "Special offers just for you.",
      details: "Don’t miss exclusive beauty discounts.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    },
  ];

  return (
    <div className="home">
      <div className="headerContainer">
        <h1>Slatkica</h1>
        <p className="quote">~ It's good to be a Slatkica ~</p>
      </div>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        speed={700}
        effect="slide"
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        className="cards-swiper"
      >
        {cards.map((c, index) => (
          <SwiperSlide key={index}>
            <div className="card-wrapper" onClick={() => setSelectedCard(c)}>
              <Card
                title={c.title}
                description={c.description}
                image={c.image}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

<Modal isOpen={!!selectedCard} onClose={() => setSelectedCard(null)}>
        {selectedCard && (
          <div className="modal-inner">
            <img src={selectedCard.image} alt={selectedCard.title} />
            <h2>{selectedCard.title}</h2>
            <p>{selectedCard.details}</p>
          </div>
        )}
      </Modal>



      
      <div className="login-box">
        <h3>🔒 Za još bolje iskustvo, prijavite se!</h3>
        <p>
          Dobijajte personalizovane preporuke, čuvajte omiljene salone i pratite
          rezervacije.
        </p>
        <div className="login-buttons">
          <button>Prijavite se</button>
          <button className="outline">Nemate nalog?</button>
        </div>
      </div>

      <div className="map-section">
        <h2>📍 Gde se nalazimo?</h2>
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Belgrade&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>
    </div>
  );
}

export default Home;