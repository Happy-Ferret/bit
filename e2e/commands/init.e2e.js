import chai, { expect } from 'chai';
import Helper from '../e2e-helper';

const assertArrays = require('chai-arrays');

chai.use(assertArrays);

describe('run bit init', function () {
  this.timeout(0);
  const helper = new Helper();
  after(() => {
    helper.destroyEnv();
  });
  beforeEach(() => {
    helper.reInitLocalScope();
  });
  // skip since we change the behaviour to work when running bit init twice
  it.skip('Should tell the user there is already a scope when running bit init twice', () => {
    let errorMsg;
    try {
      helper.initLocalScope();
    } catch (err) {
      errorMsg = err.message;
    }
    expect(errorMsg).to.have.string("there's already a scope");
  });
  describe('automatic bit init when .bit.map.json already exists', () => {
    before(() => {
      helper.createBitMap();
    });
    it('should not tell you there is already a scope when running "bit init"', () => {
      const init = helper.initLocalScope();
      expect(init).to.have.string('successfully initialized an empty bit scope');
    });
  });
  describe('default consumer bit.json', () => {
    it('should not contain some default properties', () => {
      const bitJson = helper.readBitJson();
      expect(bitJson).to.not.have.property('dist');
      expect(bitJson).to.not.have.property('extensions');
      expect(bitJson).to.not.have.property('dependenciesDirectory');
      expect(bitJson).to.not.have.property('saveDependenciesAsComponents');
      expect(bitJson).to.not.have.property('useWorkspaces');
      expect(bitJson).to.not.have.property('manageWorkspaces');
    });
  });
});
