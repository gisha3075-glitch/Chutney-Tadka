export async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({
    format: 'jsonv2',
    lat: String(latitude),
    lon: String(longitude),
    zoom: '18',
    addressdetails: '1',
  });

  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Could not find location name');
  }

  const data = await response.json();
  const address = data.address || {};
  const area = address.neighbourhood || address.suburb || address.city_district || address.village || address.town || address.city;
  const city = address.city || address.town || address.village || address.county || '';
  const state = address.state || '';
  const pincode = address.postcode || '';
  const displayName = data.display_name || [area, city, state].filter(Boolean).join(', ');

  return {
    displayName,
    area: area || city || 'Current Location',
    city,
    state,
    pincode,
  };
}
