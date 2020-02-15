export const get = url => {
  return fetch(url)
    .then(data => data.json())
    .then(data => data)
    .catch(() => null);
};
