import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Image from 'next/image';

const loader = new Loader({
  apiKey: 'AIzaSyBujQEhwdb_S5_oMKTOWCNPIGD-AlxsPWk', // Replace with your actual API key
  version: 'weekly',
  libraries: ['places'], // Include the 'places' library
});

const MyAutocomplete = () => {
  const inputRef = useRef(null);
  const [latLng, setLatLng] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

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
            setLatLng({ lat, lng });
            localStorage.setItem('lat',lat);
            localStorage.setItem('lng',lng);
            localStorage.setItem('address',place.formatted_address);
            // Get the formatted address
            setAddress(place.formatted_address);
            setInputValue(place.formatted_address);
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

            setState(newState);
            setCountry(newCountry);
            localStorage.setItem('state', newState);
            localStorage.setItem('country', newCountry);
          } else {
            console.log('No details available for input: ' + place.name);
          }
        });

        setAutocomplete(autocomplete);
      }
    });
    
    if(localStorage.getItem('address')){
      setInputValue(localStorage.getItem('address'));
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length >= 4 && autocomplete) {
      // Trigger the autocomplete query (fields could be adjusted based on your requirements)
      autocomplete.setFields(['address_components', 'formatted_address']);
    }
  };

  
  
    const [error, setError] = useState('');
  
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        console.log("Geolocation is supported by this browser.");
      } else {
        console.log("Geolocation is not supported by this browser.");
        setError('Geolocation is not supported by your browser.');
      }
    };
  
    const geoSuccess = async (position) => {
      const { latitude, longitude } = position.coords;
  
      // Initialize Google Maps Geocoder
      const geocoder = new google.maps.Geocoder();
  
      try {
        // Get address from coordinates using Geocoder
        const results = await new Promise((resolve, reject) => {
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === 'OK' && results[0]) {
              resolve(results[0]);
            } else {
              reject('Geocoder failed');
            }
          });
        });
  
        // Process address components
        const addressComponents = results.address_components;
        const newLocation = {
          route: '',
          city: '',
          area: '',
          state: '',
          sub_local: '',
          postalcode: '',
          country: '',
        };
  console.log(addressComponents)
        addressComponents.forEach((component) => {
          switch (component.types[0]) {
            case 'route':
              newLocation.route = component.long_name;
              break;
            case 'locality':
              newLocation.city = component.long_name;
              break;
            case 'political':
              newLocation.area = component.long_name;
              break;
            case 'administrative_area_level_1':
              newLocation.state = component.long_name;
              break;
            case 'postal_code':
              newLocation.postalcode = component.long_name;
              break;
            case 'country':
              newLocation.country = component.long_name;
              break;
            case 'sublocality_level_1':
              newLocation.sub_local = component.long_name;
              break;
            default:
              break;
          }
        });
        const formatted_address = newLocation.route + ' '+ newLocation.area + ' ' + newLocation.city + ' '+ newLocation.state + ' ' + newLocation.postalcode
        setLatLng({ latitude, longitude });
        localStorage.setItem('lat',latitude);
        localStorage.setItem('lng',longitude);
        localStorage.setItem('address',formatted_address);
        // Get the formatted address
        setAddress(formatted_address);
        setInputValue(formatted_address);
        
        setState(newLocation.state);
        setCountry(newLocation.country);
        localStorage.setItem('state', newLocation.state);
        localStorage.setItem('country', newLocation.country);
        console.log(newLocation);
        // Update state with location data
        // setLocation(newLocation);
      } catch (err) {
        console.log('Error:', err);
        setError('Unable to retrieve address. Please try again later.');
      }
    };
  
    const geoError = (error) => {
      console.log("Error occurred while retrieving geolocation:", error);
      setError('Unable to retrieve your location.');
    };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="ser text-sm form-control w-full h-10 rounded px-2 text-primary sm:w-full"
        placeholder="Enter a location"
        value={inputValue}
        onChange={handleInputChange} // Handle input change
      />
      <span className="absolute right-2 top-1">
        <Image src="/images/search.gif" onClick={getLocation} unoptimized width={30} height={30} alt="Search" />
      </span>
      {/* {latLng.lat && latLng.lng && (
        <div>
          <p>Latitude: {latLng.lat}</p>
          <p>Longitude: {latLng.lng}</p>
          <p>Address: {address}</p>
        </div>
      )} */}
    </div>
  );
};

export default MyAutocomplete;
