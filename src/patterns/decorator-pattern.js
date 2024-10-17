const graceUnderPressureModule = require("./module-pattern.js");

const graceUnderPressureModuleUpperCaseDecorator = ((standardModule) => ({
  addTrack: (track) => standardModule.addTrack(track.toUpperCase()),
}))(graceUnderPressureModule);

module.exports = graceUnderPressureModuleUpperCaseDecorator;
