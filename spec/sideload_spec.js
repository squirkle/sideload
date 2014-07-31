var sideload = require('../lib/sideload');
var _ = require('lodash');

var inputData = {
  presidents: [{
    id: 0,
    name: "Theodore Roosevelt",
    spouse: {
      id: 0,
      name: "Edith Roosevelt"
    },
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
    spouse: {
      id: 1,
      name: "Michelle Obama"
    },
    dogs: [{
      id: 2,
      name: "Bo",
      breed: "Portuguese Water Dog"
    }]
  }]
};
var backup = _.cloneDeep(inputData);

describe('sideload()', function () {
  describe('operating on a "has one" relationship', function () {
    var data = sideload(inputData, 'presidents.spouse');

    it('should create a top level plural-named array', function () {
      expect(_.isArray(data.spouses)).toBe(true);
    });

    it('should create a top level array with the correct number of elements', function () {
      expect(data.spouses.length).toBe(2);
    });

    it('should propogate the correct data to a top level key', function () {
      expect(data.spouses[0]).toEqual(inputData.presidents[0].spouse);
    });

    it('should not modify the input object', function () {
      expect(inputData).toEqual(backup);
    });
  });

  describe('operating on a "has many" relationship', function () {
    var data = sideload(inputData, 'presidents.dogs');

    it('should create a top level plural-named array', function () {
      expect(_.isArray(data.dogs)).toBe(true);
    });

    it('should create a top level array with the correct number of elements', function () {
      expect(data.dogs.length).toBe(3);
    });

    it('should propogate the correct data to a top level key', function () {
      expect(data.dogs[1]).toEqual(inputData.presidents[0].dogs[1]);
    });

    it('should not modify the input object', function () {
      expect(inputData).toEqual(backup);
    });
  });
});
