import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const MapView = () => {
    const [farmacias, setFarmacias] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8082/farmacia/all')
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos:', data); // Log para verificar datos
                const farmaciasConCoordenadas = data.map(farmacia => ({
                    ...farmacia,
                    latitud: parseFloat(farmacia.latitud.replace(',', '.')),
                    longitud: parseFloat(farmacia.longitud.replace(',', '.'))
                }));
                setFarmacias(farmaciasConCoordenadas);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <MapContainer center={[-17.3895, -66.1568]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {farmacias.map((farmacia) => (
                <Marker key={farmacia.id} position={[farmacia.latitud, farmacia.longitud]} icon={defaultIcon}>
                    <Popup>
                        {farmacia.nombre}<br />
                        {farmacia.direccion}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapView;