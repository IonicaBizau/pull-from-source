"use strict";

const spawn = require("spawno")
    , forkSource = require("gh-fork-source")
    , EventEmitter = require("events")
    , noop = require("noop6")
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
 * @returns {EventEmitter} An event emitter emitting the following events:
 *
 *  - `progress` (String): The progress message.
 */
module.exports = function pullFromSource (path, opts, cb) {
    let ev = new EventEmitter();
    opts.branch = opts.branch || "master";
    ev.emit("progress", "Getting repository information.");
    forkSource(path, opts, (err, sourceRepo) => {
        if (err) { return cb(err); }

        ev.emit("progress", `Pulling from ${sourceRepo.git_url}, ${opts.branch} branch`);
        opts.branch = opts.branch || sourceRepo.default_branch;
        spawn("git", ["pull", sourceRepo.git_url, opts.branch], {
            cwd: path
        }, (err, stdout, stderr) => {
            if (err) { return cb(err); }
            cb(null, stdout, stderr, sourceRepo);
        });
    });
    return ev;
};
