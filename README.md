# ipstack
Node.js client for ipstack.com apis

https://ipstack.com/ provides a well documented set of 3 apis to get geolocation information from an ip address.  This package provides a node.js client/wrapper around the apis provided by ipstack.

## Installation
Installing the library with npm
```

npm i ipstackclient

```

## Usage
In order to use the client there are 2 steps first an api key must be created with with an access key from ipstack.  To register a key: https://ipstack.com/signup/free.  Then one of the ip lookup methods can be used.

### Create IpStackClient
The create method takes 2 parameters, the access token and optional ssl boolean (defaults to false). Ssl true only works with premium ipStack accounts.
```

const ipstack = require('ipstackclient');
const IpStackClient = ipstack.create('YOUR_ACCESS_TOKEN', true);

```

### IP lookup functions
The IP lookup functions all return promises.
```

IpStackClient.standardLookup('IP_ADDRESS', options)
  .then(standardLookup => console.log(standardLookup));
IpStackClient.bulkLookup(['IP_ADDRESS', 'OTHER_IP_ADDRESS'], options)
  .then(bulkLookup => console.log(bulkLookup));
IpStackClient.requesterLookup(options)
  .then(requesterLookup => console.log(requesterLookup));

```
The results will be the parsed json of the corresponding endpoints documented https://ipstack.com/documentation.

### Options Object
The options object has 4 optional parameters also documented at ipStack.  The output parameter is always undefined
```

{
  fields: Array<String>,  // defaults undefined this is an array of strings
                          // unlike the csv list from the docs
  hostName: Bool,         // defaults to false
  security: Bool,         // defaults to false
  language: String,       // defaults to 'en'
}

```
