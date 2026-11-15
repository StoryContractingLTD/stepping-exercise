// Tiny data layer. Uses Firebase when config.js is filled in, otherwise a same-browser demo store.
const Store = (function () {
  const live = !!(FIREBASE_CONFIG && FIREBASE_CONFIG.databaseURL);

  if (live) {
    firebase.initializeApp(FIREBASE_CONFIG);
    const db = firebase.database();
    return {
      live: true,
      set: (path, val) => db.ref(path).set(val),
      on: (path, cb) => db.ref(path).on("value", s => cb(s.val()))
    };
  }

  // Demo store: one JSON tree in localStorage, shared between tabs of the same browser.
  const KEY = "stepping-demo";
  const listeners = [];
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const get = (tree, path) => path.split("/").reduce((n, k) => (n == null ? null : n[k]), tree);
  const fire = () => { const t = read(); listeners.forEach(l => { const v = get(t, l.path); l.cb(v === undefined ? null : v); }); };
  window.addEventListener("storage", e => { if (e.key === KEY) fire(); });
  return {
    live: false,
    set: (path, val) => {
      const tree = read(), keys = path.split("/");
      let n = tree;
      keys.slice(0, -1).forEach(k => { if (typeof n[k] !== "object" || n[k] === null) n[k] = {}; n = n[k]; });
      if (val === null) delete n[keys[keys.length - 1]]; else n[keys[keys.length - 1]] = val;
      localStorage.setItem(KEY, JSON.stringify(tree));
      fire();
    },
    on: (path, cb) => { listeners.push({ path, cb }); const v = get(read(), path); cb(v === undefined ? null : v); }
  };
})();
