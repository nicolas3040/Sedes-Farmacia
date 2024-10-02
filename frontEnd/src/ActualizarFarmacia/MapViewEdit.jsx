import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icono personalizado para el marcador
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapViewRegistro = ({ onLocationSelect, initialLat, initialLng }) => {
  // Verificar si initialLat o initialLng están definidos, si no, usar coordenadas por defecto
  const defaultPosition = [-17.3895, -66.1568]; // Coordenadas de Cochabamba, como predeterminado
  const [selectedPosition, setSelectedPosition] = useState(
    initialLat && initialLng ? [initialLat, initialLng] : defaultPosition
  );

  // Hook para manejar el doble clic en el mapa y dejar un marcador
  const MapClickHandler = () => {
    useMapEvents({
      dblclick(event) {
        const { lat, lng } = event.latlng;
        setSelectedPosition([lat, lng]);

        // Pasar la ubicación seleccionada al componente padre
        if (onLocationSelect) {
          onLocationSelect(lat, lng);
        }
      },
    });

    return null;
  };

  useEffect(() => {
    // Actualizar el marcador si initialLat e initialLng cambian
    if (initialLat && initialLng) {
      setSelectedPosition([initialLat, initialLng]);
    }
  }, [initialLat, initialLng]);

  return (
    <MapContainer
      center={selectedPosition} // Usar la posición seleccionada o la posición predeterminada
      zoom={13}
      style={{ height: '500px', width: '100%' }}
      doubleClickZoom={false} // Desactivar zoom con doble clic para habilitar el evento de doble clic
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <MapClickHandler />

      {/* Mostrar el marcador si hay una posición seleccionada */}
      {selectedPosition && (
        <Marker position={selectedPosition} icon={defaultIcon} />
      )}
    </MapContainer>
  );
};

export default MapViewRegistro;
