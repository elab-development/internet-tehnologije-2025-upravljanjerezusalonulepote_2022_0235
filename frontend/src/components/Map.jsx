import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import krunica from '../assets/crown.png';

const slatkicaIcon = new L.Icon({
  iconUrl: krunica, 
  iconSize: [45, 45], 
  iconAnchor: [25,25], 
  popupAnchor: [0, -25]
});

const SalonMapa = () => {
  const lat = 44.8125;
  const lng = 20.4612;
  const pozicija = [lat, lng]; 
  
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div style={{ height: '450px', borderRadius: '20px', overflow: 'hidden', border: '2px solid #ffc0cb' }}>
      <MapContainer 
        center={pozicija}
        zoom={15} 
        style={{ height: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker 
          position={pozicija} 
          icon={slatkicaIcon}
          eventHandlers={{
            click: (e) => {
              e.target._map.flyTo(pozicija, 18);
            },
          }}
        >
          <Popup>
            <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
              <h3 style={{ color: '#ff69b4', margin: 0 }}>Salon Slatkica 💖</h3>
              <p style={{ margin: '5px 0' }}>Najbolji tretmani u gradu! ✨</p>
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  color: 'white',
                  backgroundColor: '#ff69b4',
                  padding: '5px 10px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  marginTop: '5px',
                  fontSize: '12px'
                }}
              >
                Otvori u Mapama
              </a>
            </div>
          </Popup>
        </Marker>

        <Circle center={pozicija} radius={400} pathOptions={{ color: 'pink', fillColor: 'pink', fillOpacity: 0.2 }} />
      </MapContainer>
    </div>
  );
};

export default SalonMapa;