"use strict";

const pullFromSource = require("../lib");

pullFromSource("path/to/local/fork", {
    branch: "gh-pages"
}, function (err) {
    /* ... */
});
