const Api = require(`./Api`);
const getIp = require(`./getIp`);

class IpStackClient {
  constructor(accessKey, ssl = false) {
    this.api = new Api(accessKey, ssl);
  }

  _lookUp(ipAddressResource, {
    fields = [],
    hostName = false,
    security = false,
    language = `en`,
  } = {}) {

    if (typeof ipAddressResource === `object` && ipAddressResource.connection && ipAddressResource.headers) {
      ipAddressResource = getIp(ipAddressResource);
    }

    const ipAddressPath = typeof ipAddressResource === `string` ? ipAddressResource : ipAddressResource.join(`,`);

    const options = {
      hostName: Number(Boolean(hostName)),
      security: Number(Boolean(security)),
      output: `json`,
      language,
    }

    if (fields.length) {
      options[`fields`] = fields.join(`,`);
    }

    return this.api.get(ipAddressPath, options);
  }

  /**
  * Standard lookup to get ip info.  Takes a single ip address.
  *
  * @param {string|ClientRequest} ipAddress - the target ip to lookup or a node ClientRequest Object
  * @param {Object} options - config options to customize the response all are optional and have defaults
  * @param {boolean} options.hostName - whether or not to return the hostname module defaults to false
  * @param {boolean} options.security - whether or not to return the security module defaults to false
  * @param {string} options.language - language to return defaults to en
  * @returns {Object} ip object from ipStack
  */
  standardLookup(ipAddress, options) {
    return this._lookUp(ipAddress, options);
  }

  /**
  * Bulk lookup to get ip info.  Takes a single ip address.
  *
  * @param {Array<string>} ipAddresses - array of target ips to lookup
  * @param {Object} options - config options to customize the response all are optional and have defaults
  * @param {boolean} options.hostName - whether or not to return the hostname module defaults to false
  * @param {boolean} options.security - whether or not to return the security module defaults to false
  * @param {string} options.language - language to return defaults to en
  * @returns {Object} ip object from ipStack
  */
  bulkLookup(ipAddresses, options) {
    return this._lookUp(ipAddresses, options);
  }

  /**
  * Check requesting ip
  *
  * @param {Object} options - config options to customize the response all are optional and have defaults
  * @param {boolean} options.hostName - whether or not to return the hostname module defaults to false
  * @param {boolean} options.security - whether or not to return the security module defaults to false
  * @param {string} options.language - language to return defaults to en
  * @returns {Object} ip object from ipStack
  */
  requesterLookup(options) {
    return this._lookUp(`check`, options);
  }
}

/**
* Create sets up the ipStack client
*
* @param {string} accessKey - required access key from IpStack
* @param {boolean} ssl - boolean for whether to use ssl defaults to false
*/
IpStackClient.create = function(accessKey, ssl = false) {
  return new IpStackClient(accessKey, ssl);
}

module.exports = IpStackClient;
