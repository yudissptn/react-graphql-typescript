import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";

const LocationPin: React.FC<{ text: string }> = ({ text }) => (
  <div className="pin">
    <Icon icon={<MdLocationOn />} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

export const Map: React.FC<{
  location: GoogleMapReact.Coords & { address: string };
  zoomLevel: number;
}> = ({ location, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Office</h2>
    {console.log(process.env.NEXT_PUBLIC_GMAP_API_KEYS)}
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GMAP_API_KEYS || "" }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
        yesIWantToUseGoogleMapApiInternals
      >
        <LocationPin text={location.address} />
      </GoogleMapReact>
    </div>
  </div>
);
