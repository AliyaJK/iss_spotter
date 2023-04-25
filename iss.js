const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address from ipify.org.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
const url2 = `http://ipwho.is/${ip}`
  request(url2, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const coords = JSON.parse(body);

    if (!coords.success) {
      const message = `Success status was ${coords.success}. Server message says: ${coords.message} when fetching for IP ${coords.ip}`;
      callback(Error(message), null);
      return;
    } 

    const { latitude, longitude } = coords;

    callback(null, {latitude, longitude});
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP };
