// RegisterAutocomplete.js
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '@googlemaps/js-api-loader';
import { setLatLng, setAddress, setInputValue, setState, setCountry } from '../../redux/registerSlice';

const loader = new Loader({
  apiKey: 'AIzaSyBujQEhwdb_S5_oMKTOWCNPIGD-AlxsPWk', // Replace with your actual API key
  version: 'weekly',
  libraries: ['places'], // Include the 'places' library
});

const RegisterAutocomplete = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  // Get the values from Redux store
  const { latLng, address, inputValue, state, country } = useSelector((state) => state.register);

  useEffect(() => {
    loader.load().then((google) => {
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'MY' }, // Restrict to Malaysia (MY)
        });

        // Listen for when a place is selected from the autocomplete dropdown
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();

          if (place.geometry) {
            // Get lat, lng from the selected place's geometry
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            dispatch(setLatLng({ lat, lng }));

            // Get the formatted address
            dispatch(setAddress(place.formatted_address));
            dispatch(setInputValue(place.formatted_address));

            let newState = '';
            let newCountry = '';
            place.address_components.forEach((component) => {
              if (component.types.includes('administrative_area_level_1')) {
                newState = component.long_name;
              }
              if (component.types.includes('country')) {
                newCountry = component.long_name;
              }
            });

            dispatch(setState(newState));
            dispatch(setCountry(newCountry));
          } else {
            console.log('No details available for input: ' + place.name);
          }
        });
      }
    });

  }, [dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setInputValue(value));

    if (value.length >= 4) {
      // Trigger the autocomplete query (fields could be adjusted based on your requirements)
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="bg-light-gray w-full py-2 mb-5 placeholder:text-info px-4 border-none"
        placeholder="Enter a location"
        value={inputValue}
        onChange={handleInputChange} // Handle input change
      />
    </div>
  );
};

export default RegisterAutocomplete;
