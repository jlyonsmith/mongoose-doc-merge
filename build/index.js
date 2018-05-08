"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (schema, options) {
  schema.method("merge", function (other) {
    var _this = this;

    this.schema.eachPath(function (path) {
      if (path === "_id" || path === "_v") {
        return;
      }

      var value = other.get(path);

      if (typeof value !== "undefined") {
        _this.set(path, value);
      }
    });

    return this;
  });
};
//# sourceMappingURL=index.js.map