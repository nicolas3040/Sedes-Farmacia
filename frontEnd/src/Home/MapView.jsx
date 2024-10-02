import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ filter }) => {
    const [farmacias, setFarmacias] = useState([]);

    useEffect(() => {
        const fetchFarmacias = async () => {
            try {
                let url = 'http://localhost:8082/farmacia/all'; // Ruta por defecto
                if (filter === 'sustancias') {
                    url = 'http://localhost:8082/farmacia/farmacias-con-sustancias'; // Cambia a la ruta para sustancias
                }

                const response = await fetch(url);
                const data = await response.json();

                // Si hay un error en la respuesta, manejamos el error
                if (response.status !== 200) {
                    console.error('Error en la respuesta:', data.error);
                    return;
                }

                const farmaciasConCoordenadas = data.map(farmacia => ({
                    ...farmacia,
                    latitud: parseFloat(farmacia.latitud.replace(',', '.')),
                    longitud: parseFloat(farmacia.longitud.replace(',', '.'))
                }));

                setFarmacias(farmaciasConCoordenadas);
            } catch (error) {
                console.error('Error al obtener farmacias:', error);
            }
        };

        fetchFarmacias();
    }, [filter]); // Ejecuta la función cada vez que el filtro cambia

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
