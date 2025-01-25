"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updatePartnerData } from "../redux/slices/partnerSlice";
const API_URL = import.meta.env.VITE_API_URL
const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "8px",
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

export default function Settings() {
  const dispatch = useDispatch();
  const { name, email, phone, address: storedAddress, latitude, longitude, token } =
    useSelector((state) => state.partner);

  const [formData, setFormData] = useState({
    name: name || "",
    email: email || "",
    phone: phone || "",
  });

  const [address, setAddress] = useState(storedAddress || "");
  const [lat, setLat] = useState(latitude || 0);
  const [lng, setLng] = useState(longitude || 0);
  const [mapError, setMapError] = useState(false);
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAvritMA-llcdIPnOpudxQ4aZ1b5WsHHUc",
    libraries,
  });

  const autocompleteRef = useRef(null);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const newLat = place.geometry.location.lat();
        const newLng = place.geometry.location.lng();

        setAddress(place.formatted_address);
        setLat(newLat);
        setLng(newLng);
        setMapError(false);

        if (map) {
          map.panTo({ lat: newLat, lng: newLng });
          map.setZoom(15);

          if (markerRef.current) {
            markerRef.current.setPosition({ lat: newLat, lng: newLng });
          } else {
            markerRef.current = new window.google.maps.Marker({
              position: { lat: newLat, lng: newLng },
              map,
            });
          }
        }
      }
    }
  }, [map]);

  const handleMapClick = useCallback(
    (e) => {
      const newLat = e.latLng.lat();
      const newLng = e.latLng.lng();

      setLat(newLat);
      setLng(newLng);

      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat: newLat, lng: newLng } },
          (results, status) => {
            if (status === "OK" && results[0]) {
              setAddress(results[0].formatted_address);
            }
          }
        );

        if (markerRef.current) {
          markerRef.current.setPosition({ lat: newLat, lng: newLng });
        } else {
          markerRef.current = new window.google.maps.Marker({
            position: { lat: newLat, lng: newLng },
            map,
          });
        }
      }
    },
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address,
      latitude: lat,
      longitude: lng,
    };

    try {
      const response = await axios.put(
        `${API_URL}/partner/update`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Changes saved successfully!");
        dispatch(updatePartnerData(response.data)); // Actualiza el estado global
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Error updating partner:", error);
      alert("Error updating partner.");
    }
  };

  if (loadError) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-white flex items-center justify-center">
        <p>Error al cargar el mapa</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-text-primary dark:text-white">
      <div className="max-w-[1200px] mx-auto py-8 px-6">
    

        <div className="bg-card dark:bg-card-dark rounded-xl border border-gray-200 dark:border-text-light/10 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-text-secondary dark:text-text-light mb-1"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-text-light/10 bg-background dark:bg-background-dark focus:outline-none focus:border-[#F15A24] focus:ring-1 focus:ring-[#F15A24] text-text-primary dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary dark:text-text-light mb-1"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-text-light/10 bg-background dark:bg-background-dark focus:outline-none focus:border-[#F15A24] focus:ring-1 focus:ring-[#F15A24] text-text-primary dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-text-secondary dark:text-text-light mb-1"
                >
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-text-light/10 bg-background dark:bg-background-dark focus:outline-none focus:border-[#F15A24] focus:ring-1 focus:ring-[#F15A24] text-text-primary dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-text-secondary dark:text-text-light mb-1"
              >
                Address:
              </label>
              <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-200 dark:border-text-light/10 bg-background dark:bg-background-dark focus:outline-none focus:border-[#F15A24] focus:ring-1 focus:ring-[#F15A24] text-text-primary dark:text-white"
                />
              </Autocomplete>
              <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                {mapError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <p className="text-text-secondary dark:text-text-light">
                      An error has occurred.
                    </p>
                  </div>
                ) : (
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={{ lat, lng }}
                    zoom={lat !== 0 && lng !== 0 ? 15 : 4}
                    onClick={handleMapClick}
                    onLoad={onMapLoad}
                    options={mapOptions}
                    onError={() => setMapError(true)}
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-[#F15A24] text-white font-medium rounded-lg hover:bg-[#d94d1f] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F15A24] focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
