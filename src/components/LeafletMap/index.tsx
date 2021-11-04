import { ReactNode } from "react";

import Leaflet from "leaflet";
import { Marker, TileLayer, MapContainer, ZoomControl } from "react-leaflet";

import { ACCESS_TOKEN_MAP_BOX } from "../../services/api";

import { PositionType } from "../../App";
import pinIcon from '../../assets/images/pinIcon.svg'

import 'leaflet/dist/leaflet.css'

const mapPinIcon = Leaflet.icon({
  iconUrl: pinIcon,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
})

type LeafletMapType = {
  children: ReactNode;
  location: { lat: number, lng: number };
  position: PositionType | null;
}

export function LeafletMap ({children, location, position}: LeafletMapType) {
  return (
    <MapContainer
      center={location}
      zoom={11}
      zoomControl={false}
      style={{width: "100vw", height: "100vh"}}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN_MAP_BOX}`}
      />

      {position && (
        <Marker
          icon={mapPinIcon}
          position={[position.latitude, position.longitude]}
        />
      )}

      {children}
    </MapContainer>
  );
}