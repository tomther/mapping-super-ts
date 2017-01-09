"use strict";
require("styles/demo.scss");
var app_1 = require("./app");
var host = document.querySelector('#target');
var app = new app_1.App(host);
window.onload = function () {
    app.init();
};
window.onresize = function () {
    app.resize();
};
//# sourceMappingURL=demo.js.map