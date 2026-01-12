import {
    Map,
    AdvancedMarker,
    useAdvancedMarkerRef,
    useMap,
    Pin,

} from '@vis.gl/react-google-maps';
import { GoogleMapProps } from '../../types'

import { CardMarker } from '..'

import './GoogleMap.css'
import { useEffect } from 'react';
import { Circle } from './circle';

const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID


const MapStyling = {
    width: "100%",
    height: "100%",
}

const getPosition = (place: google.maps.places.PlaceResult | null) =>
    place?.geometry?.location
        ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
        : { lat: 45.5089192, lng: -73.5569074 }


export const GoogleMap = (props: GoogleMapProps) => {

    const { place, events, range } = props
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <div className='w-full h-full'>
            <Map
                style={MapStyling}
                mapId={GOOGLE_MAP_ID}
                defaultCenter={getPosition(place)}
                defaultZoom={11}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                {
                    events.map((item, index) => <CardMarker key={index} price={item.price} position={item.position} />)
                }
                <AdvancedMarker ref={markerRef} position={getPosition(place)}>
                    <Pin background={'#015237'} borderColor={'#bbb'} glyphColor={'#ffde59'} />
                </AdvancedMarker>
                <Circle
                    radius={range * 1000}
                    center={getPosition(place)}
                    strokeColor={'#009966'}
                    strokeOpacity={1}
                    strokeWeight={3}
                    fillColor={'#000000'}
                    fillOpacity={0.3}
                    // editable
                    // draggable
                />
            </Map>
            <MapHandler place={place} marker={marker} />
        </div>
    )

}

interface MapHandlerProps {
    place: google.maps.places.PlaceResult | null;
    marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
    const map = useMap();

    useEffect(() => {
        if (!map || !place || !marker) return;

        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }
        marker.position = place.geometry?.location;
    }, [map, place, marker]);

    return null;
};