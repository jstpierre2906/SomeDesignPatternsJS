/**
 * @type {{
 *  init: function({
 *    observers: {
 *      [key: string]: import("./observer-pattern.js").TrackObserver
 *    },
 *    notificationContextModule: import("./strategy-pattern.js").NotificationContext
 *  }): void;
 *  getObserverInfo: function({ context: "all" | "first"}): import("./observer-pattern.js").ObsNotification[];
 *  removeObserver: function(string): void;
 *  addTrack: function(string): void;
 *  removeTrack: function(string): void;
 *  getTracks: function("ASC" | "DESC"): string[]
 * }}
 */
const graceUnderPressureModule = (() => {
  /** @type {string[]} */
  let tracks = [];

  /** @type {import("./observer-pattern.js").TrackObserver[]} */
  let trackObservers = [];

  /** @type {import("./strategy-pattern.js").NotificationContext} */
  let notificationContext;

  /**
   * @param {"ASC" | "DESC"} orderType
   * @returns {string[]}
   */
  const sortTracks = (orderType) => {
    return tracks.sort((a, b) => {
      if (orderType === "ASC") {
        return a < b ? -1 : a > b ? 1 : 0;
      }
      return a < b ? 1 : a > b ? -1 : 0;
    });
  };

  /** @param {{ track: string; action: import("./observer-pattern.js").ObsNotificationAction }} */
  const notifyObservers = ({ track, action }) => {
    trackObservers.forEach((o) => o.notify({ track, action }));
  };

  return {
    init: ({ observers, notificationContextModule }) => {
      trackObservers = Object.keys(observers).map((k) => observers[k]);
      notificationContext = notificationContextModule;
    },
    getObserverInfo: ({ context }) => {
      return notificationContext.getInfo({ context, observers: trackObservers });
    },
    removeObserver: (obsId) => (trackObservers = trackObservers.filter((o) => o.getId() !== obsId)),
    addTrack: (track) => {
      tracks.push(track);
      notifyObservers({ track, action: "add" });
    },
    removeTrack: (track) => {
      tracks = tracks.filter((t) => t !== track);
      notifyObservers({ track, action: "remove" });
    },
    getTracks: (orderType = "ASC") => sortTracks(orderType),
  };
})();

module.exports = graceUnderPressureModule;
