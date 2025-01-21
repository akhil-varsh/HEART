import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const getRiskColor = (risk) => {
  switch (risk) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#eab308';
    case 'low':
      return '#22c55e';
    default:
      return '#94a3b8';
  }
};

export default function RiskMap({ data }) {
  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {data.map((point, index) => (
          <CircleMarker
            key={index}
            center={[point.lat, point.lng]}
            radius={20}
            pathOptions={{
              fillColor: getRiskColor(point.risk),
              color: getRiskColor(point.risk),
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{point.location}</h3>
                <p>Risk Level: {point.risk}</p>
                <p>Cases: {point.cases}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}