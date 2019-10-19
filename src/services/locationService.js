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
    alert("issues");
  }

  return data.coords;
}

export function getSavedLocations() {
  if (!localStorage.hasOwnProperty("savedLocations")) {
    const locIds = [];
    locIds.push(1267911);
    locIds.push(1259229);
    localStorage.setItem("savedLocations", JSON.stringify(locIds));
    return null;
  } else {
    return localStorage.getItem("savedLocations");
  }
}
