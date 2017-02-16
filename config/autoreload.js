/**
 *
 * @type {{active: boolean, usePolling: boolean, dirs: string[], ignored: string[]}}
 * @url https://github.com/sgress454/sails-hook-autoreload
 */
module.exports.autoreload = {
  active: true,
  usePolling: false,
  dirs: [
    "api/models",
    "api/controllers",
    "api/services",
    "config/locales"
  ],
  ignored: [
    // Ignore all files with .ts extension
    "**.ts"
  ]
};
