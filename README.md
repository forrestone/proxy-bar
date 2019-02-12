# Proxy Bar

Proxy Bar is a js proxy based on http-proxy to easily use and set mock for development purpose.
Will start a proxy server on port 5050.

## Installation

```bash
npm install
```

## Usage

Setup localhost:5050 as system proxy or application proxy.

Proxy Bar use a set of rules to determinate wich API calls to mock, these rules are set by posting proper object to `/configureMockServer/` route.

```
POST 
http://localhost:5050/configureMockServer

```
The Object consist in a `'rule'` written with REGEX pattern,
and a `'dest'` pointing to a saved json object inside the project.

```
 {"rule":".*/Item.API/*.", "dest":"Item/item.json"}
```

Other operation permitted
- POST > add passed rule to ruleset
- GET > return list of current rules 
- DELETE > delete rule with matching rule
- PURGE > delete all rules in ruleset

## Tips for saving Jsonfiles
You can save response in json file directly from postaman setting the following header : 
```
saveToFile : Item/item.json
```
on server response the proxy verify the existence of the custom header and if present write the response in a file.
