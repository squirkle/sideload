# sideload

Convert nested resources to "sideloaded" resources for consumption by frameworks (like Ember.js) where sideloaded resources are expected.

## Installation
```bash
npm install sideload
```

## Usage
```javascript
var sideload = require('../lib/sideload');

var data = {
  presidents: [{
    id: 0,
    name: "Theodore Roosevelt",
    dogs: [{
      id: 0,
      name: "Pete",
      breed: "Bull Terrier"
    }, {
      id: 1,
      name: "Rollo",
      breed: "Saint Bernard"
    }]
  }, {
    id: 1,
    name: "Barack Obama",
    dogs: [{
      id: 2,
      name: "Bo",
      breed: "Portuguese Water Dog"
    }]
  }]
};

var sideloadedData = sideload(data, 'presidents.dogs');
```

This outputs:

```JSON
{
  "presidents": [
    {
      "id": 0,
      "name": "Theodore Roosevelt",
      "dogs": [
        0,
        1
      ]
    },
    {
      "id": 1,
      "name": "Barack Obama",
      "dogs": [
        2
      ]
    }
  ],
  "dogs": [
    {
      "id": 0,
      "name": "Pete",
      "breed": "Bull Terrier"
    },
    {
      "id": 1,
      "name": "Rollo",
      "breed": "Saint Bernard"
    },
    {
      "id": 2,
      "name": "Bo",
      "breed": "Portuguese Water Dog"
    }
  ]
}
```

