import { useState, useEffect, useRef } from 'react';
import { MapPinIcon } from '@heroicons/react/24/outline'
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Input } from '..'
import { PlaceAutocompleteProps } from '../../types';



export const PlaceAutocomplete = (props: PlaceAutocompleteProps) => {

  const { onPlaceSelect, width, leftLabel, label, placeholder, name, error } = props

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(0);

  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };
    
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });

  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className={`${width || "w-65"} autocomplete-container`}>
      <Input
        width="w-full"
        inputRef={inputRef} 
        label={label || "Where"}
        name={name}
        onChange={() => {}}
        leftLabel={leftLabel}
        placeholder={placeholder || 'Montreal, QC'}
        rightIcon={<MapPinIcon className="flex-none size-5 text-gray-400" />}
        error={error}
      />
    </div>
  );
};