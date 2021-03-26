/* bling.js */

/*
  BLING DOM
  A tiny DOM manipulation tool inspired by jQUery
*/

// window.$ = document.querySelectorAll.bind(document);

// Node.prototype.on = window.on = function (name, fn) {
//   this.addEventListener(name, fn);
// }

// NodeList.prototype.__proto__ = Array.prototype;

// NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
//   this.forEach(function (elem, i) {
//     elem.on(name, fn);
//   });
// }

/*
  BLING FETCH
  A tiny wrapper around fetch(), borrowed from
  https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
*/

export const $fetch = async (endpoint, { body, ...customConfig } = {}) => {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (response.ok) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
};

$fetch.delete = (endpoint, body, customConfig = {}) =>
  $fetch(endpoint, { ...customConfig, method: 'DELETE', body });
$fetch.get = (endpoint, customConfig = {}) => $fetch(endpoint, { ...customConfig, method: 'GET' });
$fetch.patch = (endpoint, body, customConfig = {}) =>
  $fetch(endpoint, { ...customConfig, method: 'PATCH', body });
$fetch.post = (endpoint, body, customConfig = {}) =>
  $fetch(endpoint, { ...customConfig, method: 'POST', body });
$fetch.put = (endpoint, body, customConfig = {}) =>
  $fetch(endpoint, { ...customConfig, method: 'PUT', body });
