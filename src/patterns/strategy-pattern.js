/**
 * @typedef {{
 *  id: string;
 *  notifications: import("./observer-pattern").ObsNotification[]
 * }} ObserverNotificationInfo
 */

/**
 * @typedef {{
 *  info: function(
 *      import("./observer-pattern").TrackObserver[]
 *  ): ObserverNotificationInfo | ObserverNotificationInfo[]
 * }} ObserverInfoStrategy
 */

/**
 * @typedef {{
 *  getInfo: function({
 *    context: "all" | "first";
 *    observers: import("./observer-pattern").TrackObserver[]}
 *  ): ObserverNotificationInfo | ObserverNotificationInfo[]
 * }} NotificationContext
 */

/** @type {ObserverInfoStrategy} */
const observerInfoAllStrategy = {
  info: (observers) => {
    return observers.map((o) => ({ id: o.getId(), notifications: o.getNotifications() }));
  },
};

/** @type {ObserverInfoStrategy} */
const observerInfoFirstStrategy = {
  info: (observers) => ({
    id: observers[0].getId(),
    notifications: observers[0].getNotifications(),
  }),
};

/** @type {NotificationContext} */
const notificationContext = (() => {
  /** @type {ObserverInfoStrategy} */
  let notificationStrategy;
  return {
    getInfo: ({ context, observers }) => {
      const strategies = {
        all: observerInfoAllStrategy,
        first: observerInfoFirstStrategy,
      };
      notificationStrategy = strategies[context];
      return notificationStrategy.info(observers);
    },
  };
})();

module.exports = notificationContext;
