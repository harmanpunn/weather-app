const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000
};

// Turn navigator.getCurrentPosition in a Promise
function getLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      ({ code, message }) =>
        reject(
          Object.assign(new Error(message), { name: "PositionError", code })
        ),
      options
    );
  });
}

export async function getCurrentLocation() {
  let data = {};
  try {
    data = await getLocation(options);
  } catch (err) {
    alert(
      "Error fetching current location. Please click on allow in the location popup"
    );
  }

  return data.coords;
}

export function getSavedLocations() {
  if (!localStorage.hasOwnProperty("savedLocations")) {
    return null;
  } else {
    return JSON.parse(localStorage.getItem("savedLocations"));
  }
}

export function saveLocation(id) {
  let locIds = [];
  if (!localStorage.hasOwnProperty("savedLocations")) {
    locIds.push(id);
  } else {
    locIds = getSavedLocations();
    if (!locIds.includes(id)) {
      locIds.push(id);
    }
  }
  localStorage.setItem("savedLocations", JSON.stringify(locIds));
}
