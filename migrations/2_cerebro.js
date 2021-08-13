const Cerebro = artifacts.require("Cerebro");

module.exports = function (deployer) {
  deployer.deploy(Cerebro);
};
