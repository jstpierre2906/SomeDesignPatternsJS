/** @typedef { "add" | "remove" } ObsNotificationAction */
/** @typedef {{ track: string; action: ObsNotificationAction; timestamp: number }} ObsNotification */
/**
 * @typedef {{
 *  getId: function(): string;
 *  notify: function({track: string; action: ObsNotificationAction}): void;
 *  getNotifications: function(): ObsNotification[]
 * }} TrackObserver
 */

/** @type {TrackObserver[]} */
const trackObservers = {};
["observerA", "observerB", "observerC"].forEach((observerId) => {
  trackObservers[observerId] = ((observerId) => {
    /** @type {string} */
    const id = observerId;

    /** @type {ObsNotification[]} */
    const notifications = [];

    return {
      getId: () => id,
      notify: (a) => {
        const notification = Object.assign(a, { timestamp: new Date().valueOf() });
        notifications.push(notification);
      },
      getNotifications: () => notifications,
    };
  })(observerId);
});

module.exports = trackObservers;
