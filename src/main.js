const graceUnderPressureModule = require("./patterns/module-pattern.js");
const notificationContext = require("./patterns/strategy-pattern.js");
const trackObservers = require("./patterns/observer-pattern.js");

graceUnderPressureModule.init({
  observers: trackObservers,
  notificationContextModule: notificationContext,
});

graceUnderPressureModule.addTrack("Red Sector A");
graceUnderPressureModule.addTrack("Distant Early Warning");
graceUnderPressureModule.addTrack("Afterimage");
graceUnderPressureModule.addTrack("Kid Gloves");

console.log(graceUnderPressureModule.getTracks());
console.log(
  JSON.stringify(graceUnderPressureModule.getObserverInfo({ context: "first" }), null, 2)
);

graceUnderPressureModule.removeTrack("Distant Early Warning");
graceUnderPressureModule.removeObserver("observerB");

console.log(graceUnderPressureModule.getTracks());
console.log(JSON.stringify(graceUnderPressureModule.getObserverInfo({ context: "all" }), null, 2));
