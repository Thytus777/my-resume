'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MELB = { lat: -37.8136, lng: 144.9631 };

function PulseMarker() {
  const map = useMap();

  useEffect(() => {
    const icon = L.divIcon({
      className: '',
      html: `
        <div class="melb-marker">
          <div class="melb-pulse-ring melb-pulse-ring--1"></div>
          <div class="melb-pulse-ring melb-pulse-ring--2"></div>
          <div class="melb-pulse-ring melb-pulse-ring--3"></div>
          <div class="melb-pin-core"></div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    const marker = L.marker([MELB.lat, MELB.lng], { icon }).addTo(map);
    return () => { marker.remove(); };
  }, [map]);

  return null;
}

function LockMap() {
  const map = useMap();
  useEffect(() => {
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  }, [map]);
  return null;
}

export default function MelbourneMap() {
  return (
    <div className="melb-map-wrapper">
      <MapContainer
        center={[MELB.lat, MELB.lng]}
        zoom={11}
        zoomControl={false}
        attributionControl={false}
        className="melb-leaflet-map"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <PulseMarker />
        <LockMap />
      </MapContainer>
      <div className="melb-map-overlay" />
      <div className="melb-map-label">
        <FaMapMarkerAlt />
        <span>Melbourne, Australia</span>
      </div>
    </div>
  );
}