"use strict";

const spawn = require("spawno")
    , forkSource = require("gh-fork-source")
    ;

/**
 * pullFromSource
 * Pulls the changes from the source repository in the forked one.
 *
 * @name pullFromSource
 * @function
 * @param {String} path The path to the local git repository.
 * @param {Object} opts The options passed to [`gh-fork-source`](https://github.com/IonicaBiau/gh-fork-source).
 * @param {Function} cb The callback function.
 */
module.exports = function pullFromSource (path, opts, cb) {
    opts.branch = opts.branch || "master";
    forkSource(path, opts, (err, sourceRepo) => {
        if (err) { return cb(err); }
        spawn("git", ["pull", sourceRepo.git_url, opts.branch], {
            cwd: path
        }, (err, stdout, stderr) => {
            if (err) { return cb(err); }
            cb(null, stdout, stderr, sourceRepo);
        });
    });
};
