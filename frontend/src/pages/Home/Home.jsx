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
    title: "Classic Glow Facial",
    description: "Dubinski tretman čišćenja lica koji vraća koži prirodni sjaj.",
    details: "Uključuje piling, nežnu ekstrakciju, umirujuću masku i intenzivnu hidrataciju prilagođenu vašem tipu kože.",
    image: "https://i.pinimg.com/736x/6c/e7/c5/6ce7c539ed9facee7bcb68fe38b2d2d1.jpg"
  },
  {
    title: "Manikir",
    description: "Besprekoran manikir koji traje i do tri nedelje.",
    details: "Uključuje oblikovanje noktiju, obradu zanoktica i nanošenje visokokvalitetnog trajnog laka koji ne gubi sjaj.",
    image: "https://i.pinimg.com/1200x/0a/20/85/0a20857ac0cba0b62abe8809d9c599ae.jpg"
  },
  {
    title: "Relaks masaža zen",
    description: "Opuštajuća masaža celog tela toplim aromatičnim uljima.",
    details: "Masaža srednjeg intenziteta koja cilja na otklanjanje stresa i napetosti uz miris lavande i eukaliptusa.",
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Lash Lift",
    description: "Prirodno uvijanje i jačanje vaših trepavica.",
    details: "Tretman podizanja trepavica iz korena uz dodatak keratina. Vizuelno duže i gušće trepavice bez nadogradnje.",
    image: "https://i.pinimg.com/736x/1c/cf/af/1ccfaf509940b0edd0a3ba7029fa055d.jpg"
  },
  {
    title: "Maderoterapija Lica",
    description: "Prirodna tehnika masaže drvenim elementima za zatezanje lica.",
    details: "Podstiče proizvodnju elastina i kolagena, smanjuje podbradak i oblikuje konture lica.",
    image: "https://i.pinimg.com/736x/62/6c/42/626c42f4a12cc832a3016f85e2dc77b8.jpg",
  },
  {
    title: "SPA Pedikir",
    description: "Kompletna nega stopala uz piling i masažu.",
    details: "Uključuje opuštajuću kupku, uklanjanje zadebljanja, oblikovanje noktiju i masažu hranljivom kremom.",
    image: "https://images.pexels.com/photos/3997389/pexels-photo-3997389.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    title: "Dnevna šminka (Natural Look)",
    description: "Lagana i sveža šminka za svaki dan ili poslovne prilike.",
    details: "Naglašavanje prirodne lepote uz minimalnu upotrebu pudera, nežne zemljane tonove i lagani sjaj. Idealno za sastanke i dnevne izlaske.",
    image: "https://i.pinimg.com/736x/98/5b/c4/985bc444fe54b1aacb900fe1fd37394c.jpg",
  },
  {
    title: "Glamurozna večernja šminka",
    description: "Intenzivan izgled prilagođen svečanostima i noćnim izlascima.",
    details: "Uključuje konturisanje lica, 'smokey eyes' ili 'cut crease' tehniku, fiksiranje za dugotrajnost i postavljanje veštačkih trepavica po želji.",
    image: "https://i.pinimg.com/736x/9e/09/f9/9e09f95b9033d8925be6bb9d8792a58c.jpg",
  },
  {
    title: "Bridal makeup",
    description: "Specijalizovana šminka za venčanja koja izgleda savršeno na kameri.",
    details: "Vodootporna i dugotrajna šminka fokusirana na blistav ten. Prilagođena osvetljenju za fotografisanje, uz probni termin radi dogovora.",
    image: "https://i.pinimg.com/736x/45/e0/d7/45e0d74cba5c6ad4aafe106dfef40d32.jpg",
  }
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