import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icono personalizado para el marcador
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapViewRegistro = ({ onLocationSelect }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Hook para manejar el doble clic en el mapa y dejar un marcador
  const MapClickHandler = () => {
    useMapEvents({
      dblclick(event) {
        const { lat, lng } = event.latlng;
        setSelectedPosition([lat, lng]);

        // Pasar la ubicación seleccionada al componente padre (si es necesario)
        if (onLocationSelect) {
          onLocationSelect(lat, lng);
        }
      },
    });

    return null;
  };

  return (
    <MapContainer
      center={[-17.3895, -66.1568]} // Centro inicial (por ejemplo, Cochabamba)
      zoom={13}
      style={{ height: '500px', width: '100%' }}
      doubleClickZoom={false} // Desactivar zoom con doble clic para habilitar el evento de doble clic
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Componente para manejar clics en el mapa */}
      <MapClickHandler />

      {/* Mostrar marcador si se ha seleccionado una ubicación */}
      {selectedPosition && (
        <Marker position={selectedPosition} icon={defaultIcon}>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapViewRegistro;
