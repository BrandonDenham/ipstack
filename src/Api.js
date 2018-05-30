const fetch = require(`node-fetch`);

const ROOT_RESOURCE_URL = `http://api.ipstack.com/`;
const ROOT_RESOURCE_URL_SECURE = `https://api.ipstack.com/`;

class Api {
  constructor(apiKey, ssl = false) {
    if (!apiKey) {
      throw new Error(`IP Stack API requires API Key`);
    }
    this.rootUrl = ssl ? ROOT_RESOURCE_URL_SECURE : ROOT_RESOURCE_URL;
    this.apiKey = apiKey;
  }

  request(path, data = {}, method, callback = () => undefined) {
    path = path.replace(/\/*$/, ``);
    method = method.toUpperCase();
    let additionalQueryData = ``;

    const fetchOptions = {
      method,
      headers: {
        'Content-Type': `application/json; charset=UTF-8`,
        'Accept': `application/json`
      },
    };

    if (method !== `GET`) {
      fetchOptions.body = JSON.stringify(data);
    } else {
      additionalQueryData = Object.entries(data)
        .map(([key, value]) => {
          return `&${key}=${value}`;
        }).join(``);
    }

    return fetch(
      `${this.rootUrl}${path}?access_key=${this.apiKey}${additionalQueryData}`,
      fetchOptions
    ).then(response => response.json()).then(response => {
      callback(response);
      return response;
    });
  }

  get(path, data, callback) {
    return this.request(path, data, `GET`, callback);
  }
}

module.exports = Api;
