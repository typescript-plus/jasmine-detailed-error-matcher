"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MATCHER = {
    compare: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var actual = args.shift();
        var klass = args.shift();
        var callback = args.shift();
        try {
            actual();
            return {
                message: "Expected " + actual + " to throw " + Error + ".",
                pass: false
            };
        }
        catch (err) {
            if (klass !== undefined && !(err instanceof klass)) {
                return {
                    message: "Expected " + actual + " to throw " + klass + ".",
                    pass: false
                };
            }
            callback(err);
            return {
                pass: true
            };
        }
    }
};
function toThrowDetailedError(util, customEqualityTesters) {
    return MATCHER;
}
exports.detailedErrorMatcherFactories = {
    toThrowDetailedError: toThrowDetailedError
};
//# sourceMappingURL=index.js.map