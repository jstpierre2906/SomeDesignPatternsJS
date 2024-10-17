/** @typedef { "add" | "remove" } ObsNotificationAction */
/** @typedef {{ track: string; action: ObsNotificationAction; timestamp: number }} ObsNotification */
/**
 * @typedef {{
 *  getId: function(): string;
 *  setId: function(string): void;
 *  notify: function({track: string; action: ObsNotificationAction}): void;
 *  getNotifications: function(): ObsNotification[]
 * }} TrackObserver
 */

/** @type {TrackObserver[]} */
const trackObservers = {};
["observerA", "observerB", "observerC"].forEach((observerId) => {
  trackObservers[observerId] = (() => {
    /** @type {string} */
    let id;

    /** @type {ObsNotification[]} */
    const notifications = [];

    return {
      getId: () => id,
      setId: (i) => (id = i),
      notify: (a) => {
        const notification = Object.assign(a, { timestamp: new Date().valueOf() });
        notifications.push(notification);
      },
      getNotifications: () => notifications,
    };
  })();
  trackObservers[observerId].setId(observerId);
});

module.exports = trackObservers;
