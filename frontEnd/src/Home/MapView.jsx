import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapView = ({ filter, searchTerm, onSelectFarmacia }) => {
    const [farmacias, setFarmacias] = useState([]);

    useEffect(() => {
        const fetchFarmacias = async () => {
            try {
                let url = 'http://localhost:8082/farmacia/all';

                if (filter === 'sustancias') {
                    url = 'http://localhost:8082/farmacia/farmacias-con-sustancias'; 
                }

                const response = await fetch(url);
                const data = await response.json();

                if (response.status !== 200) {
                    console.error('Error en la respuesta:', data.error);
                    return;
                }

                const farmaciasConCoordenadas = data.map(farmacia => ({
                    ...farmacia,
                    // Verificar que latitud y longitud existan y no sean nulos antes de hacer replace
                    latitud: farmacia.latitud ? parseFloat(farmacia.latitud.replace(',', '.')) : 0,
                    longitud: farmacia.longitud ? parseFloat(farmacia.longitud.replace(',', '.')) : 0
                }));

                setFarmacias(farmaciasConCoordenadas);
            } catch (error) {
                console.error('Error al obtener farmacias:', error);
            }
        };

        fetchFarmacias();
    }, [filter]);

    // Filtra las farmacias según el término de búsqueda
    const filteredFarmacias = farmacias.filter(farmacia =>
        farmacia.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cargarFarmacia = async (id) => {
        try {
            const response = await fetch(`http://localhost:8082/farmacia/cargarfarmacia/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const farmacia = await response.json();

            // Pasa el id de la farmacia seleccionada a la función proporcionada
            onSelectFarmacia(farmacia.id);

        } catch (error) {
            console.error('Error al cargar los detalles de la farmacia:', error);
        }
    };

    return (
        <div>
            <MapContainer center={[-17.3895, -66.1568]} zoom={13} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filteredFarmacias.map((farmacia) => (
                    <Marker 
                        key={farmacia.id} 
                        position={[farmacia.latitud, farmacia.longitud]} 
                        icon={defaultIcon}
                        eventHandlers={{
                            click: () => {
                                cargarFarmacia(farmacia.id); // Al hacer clic, cargar los detalles
                            },
                        }}
                    >
                        <Popup>
                            {farmacia.nombre}<br />
                            {farmacia.direccion}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapView;
