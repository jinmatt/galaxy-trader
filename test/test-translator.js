/**
 * Tests for translator lib
 */

// Module dependencies
var chai = require('chai');
var Translator = require('../libs/translator');

var expect = chai.expect;
var translator = new Translator();

describe('Translator functions', function () {
  describe('#setSymbol()', function () {
    it('should return -1 when invalid romain numeral is set', function () {
      var invalid = translator.setSymbol('glob', 'H');
      expect(invalid).to.equal(-1);
    });

    it('should return an object when a symbol is set to a romain numeral', function () {
      var intergalacticObject = translator.setSymbol('glob', 'I');
      expect(intergalacticObject).to.be.an('object');
      expect(intergalacticObject).to.contain.all.keys({
        decimal: 1,
        romain: 'I',
        symbol: 'glob',
      });
    });
  });

  describe('#setMetalPrice()', function () {
    it('should return -1 if it is an invalid metal name', function () {
      var invalid = translator.setMetalPrice('diamond', 2, 34);
      expect(invalid).to.equal(-1);
    });

    it('should return the calculated metal price if metal price is set', function () {
      var metalPrice = translator.setMetalPrice('Silver', 2, 34);
      expect(metalPrice).to.equal(17);
    });
  });

  describe('#calculate()', function () {
    it('should return an object with `invalidSymbol` if invalid symbols are passed as input', function () {
      var invalidSymbolObj = translator.calculate(['glob', 'glob', 'clap']);
      expect(invalidSymbolObj).to.have.property('invalidSymbol', 'clap');
    });

    it('should return calculate credits on success', function () {
      var totalCredits = translator.calculate(['glob', 'glob', 'Silver']);
      expect(totalCredits).to.equal(34);
    });
  });
});
