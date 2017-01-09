"use strict";
var topo = require("topojson-client");
var d3 = require("d3");
var MAP_DATA = require('data/map.json');
var Data = (function () {
    function Data() {
        var _this = this;
        /**
         * Placeholder for fetching the color of each shape on the heat map
         * @param feature
         * @returns {string} heatmap color for the given feature
         */
        this.getColor = function (feature) {
            if (!feature.properties.color) {
                // Random between 0 and 10
                var heatFactor = Math.floor(Math.random() * 10);
                feature.properties.color = _this.colorScale(heatFactor / 10);
            }
            return feature.properties.color;
        };
        /**
         * Placeholder for fetching the selection details data
         * @param feature
         * @param callback Callback for when the data has been loaded
         */
        this.fetchDetails = function (feature, callback) {
            var details = {
                sample: [
                    { name: 'A', value: Math.random() * 100 },
                    { name: 'B', value: Math.random() * 100 },
                    { name: 'C', value: Math.random() * 100 },
                    { name: 'D', value: Math.random() * 100 },
                ]
            };
            // Delay the callback return to feel like a network request is being made
            setTimeout(function () {
                callback(details);
            }, Math.random() * 1500);
        };
        this.colorScale = d3.scaleLinear()
            .domain([0, 0.5, 1])
            .range(['firebrick', 'dodgerblue', 'dodgerblue']);
    }
    Data.prototype.getFeatures = function (type, context) {
        var data = this.getData(type);
        var featureCollection = topo.feature(MAP_DATA, data);
        if (context) {
            featureCollection.features = featureCollection.features.filter(function (f) { return f.properties[context.type] === context.name; });
        }
        return featureCollection;
    };
    Data.prototype.getMesh = function (type, context) {
        var data = this.getData(type);
        if (context) {
            data = {
                geometries: data.geometries.filter(function (g) {
                    var p = g.properties;
                    return p[context.type] === context.name;
                }),
                type: data.type
            };
        }
        return topo.mesh(MAP_DATA, data, function (a, b) { return a !== b; });
    };
    Data.prototype.getData = function (type) {
        if (!MAP_DATA.objects[type]) {
            throw "Unknown layer type " + type;
        }
        return MAP_DATA.objects[type];
    };
    return Data;
}());
exports.Data = Data;
//# sourceMappingURL=data.js.map