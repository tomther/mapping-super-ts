"use strict";
var d3 = require("d3");
require("styles/app.scss");
var components_1 = require("components");
var data_1 = require("./data");
var App = (function () {
    function App(host) {
        var _this = this;
        this.host = host;
        this.select = function (data, shape) {
            var selection = _this.map.selection;
            if (selection && selection.data === data) {
                _this.deselect();
            }
            else {
                _this.overlay.showSidebar(data);
                _this.map.select(data, d3.select(shape));
            }
        };
        this.deselect = function () {
            var selection = _this.map.selection;
            if (selection) {
                var parent_1 = selection.layer.parent;
                if (parent_1) {
                    _this.overlay.showSidebar(parent_1.data);
                    _this.map.select(parent_1.data, parent_1.shape);
                }
                else {
                    _this.overlay.removeSidebar();
                    _this.map.clearSelection();
                }
            }
        };
        this.compare = function () {
            var selection = _this.map.selection;
            if (!selection || !_this.overlay.canCompare(selection.data)) {
                return;
            }
            _this.overlay.addToComparison(selection.data, selection.shape.node());
            setTimeout(function () {
                _this.map.clearSelection();
                _this.overlay.removeLegend();
            }, 300);
        };
        this.data = new data_1.Data();
        this.root = d3.select(this.host);
        this.root.classed('viz-container', true);
        this.map = new components_1.Map(this.root);
        this.overlay = new components_1.MapOverlay(this.root);
        this.components = [
            this.map,
            this.overlay
        ];
        window['app'] = this;
    }
    App.prototype.init = function () {
        this.components.forEach(function (c) { return c.init(); });
        this.resize();
    };
    App.prototype.resize = function () {
        var _this = this;
        this.lastRect = this.host.getBoundingClientRect();
        this.components.forEach(function (c) { return c.resize(_this.lastRect); });
    };
    App.prototype.removeComparison = function (box) {
        this.overlay.removeFromComparison(box);
        this.map.cameraRefresh();
    };
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map