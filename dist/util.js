"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNudgedPopoverRect = exports.getNewPopoverRect = exports.popoverRectForPosition = exports.createContainer = exports.rectsAreEqual = exports.createRect = exports.EMPTY_RECT = void 0;
exports.EMPTY_RECT = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
};
var createRect = function (_a) {
    var top = _a.top, left = _a.left, width = _a.width, height = _a.height;
    return ({
        top: top,
        left: left,
        width: width,
        height: height,
        right: left + width,
        bottom: top + height,
    });
};
exports.createRect = createRect;
var rectsAreEqual = function (rectA, rectB) {
    return rectA === rectB ||
        ((rectA === null || rectA === void 0 ? void 0 : rectA.bottom) === (rectB === null || rectB === void 0 ? void 0 : rectB.bottom) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.height) === (rectB === null || rectB === void 0 ? void 0 : rectB.height) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.left) === (rectB === null || rectB === void 0 ? void 0 : rectB.left) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.right) === (rectB === null || rectB === void 0 ? void 0 : rectB.right) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.top) === (rectB === null || rectB === void 0 ? void 0 : rectB.top) &&
            (rectA === null || rectA === void 0 ? void 0 : rectA.width) === (rectB === null || rectB === void 0 ? void 0 : rectB.width));
};
exports.rectsAreEqual = rectsAreEqual;
var createContainer = function (_a) {
    var containerStyle = _a.containerStyle, containerClassName = _a.containerClassName, id = _a.id;
    var container = window.document.createElement('div');
    container.id = id;
    if (containerClassName)
        container.className = containerClassName;
    Object.assign(container.style, containerStyle);
    return container;
};
exports.createContainer = createContainer;
var popoverRectForPosition = function (position, childRect, popoverRect, padding, align) {
    var targetMidX = childRect.left + childRect.width / 2;
    var targetMidY = childRect.top + childRect.height / 2;
    var width = popoverRect.width, height = popoverRect.height;
    var top;
    var left;
    switch (position) {
        case 'left':
            top = targetMidY - height / 2;
            left = childRect.left - padding - width;
            if (align === 'start') {
                top = childRect.top;
            }
            if (align === 'end') {
                top = childRect.bottom - height;
            }
            break;
        case 'bottom':
            top = childRect.bottom + padding;
            left = targetMidX - width / 2;
            if (align === 'start') {
                left = childRect.left;
            }
            if (align === 'end') {
                left = childRect.right - width;
            }
            break;
        case 'right':
            top = targetMidY - height / 2;
            left = childRect.right + padding;
            if (align === 'start') {
                top = childRect.top;
            }
            if (align === 'end') {
                top = childRect.bottom - height;
            }
            break;
        default:
            top = childRect.top - height - padding;
            left = targetMidX - width / 2;
            if (align === 'start') {
                left = childRect.left;
            }
            if (align === 'end') {
                left = childRect.right - width;
            }
            break;
    }
    return (0, exports.createRect)({ left: left, top: top, width: width, height: height });
};
exports.popoverRectForPosition = popoverRectForPosition;
var getNewPopoverRect = function (_a, boundaryInset) {
    var position = _a.position, align = _a.align, childRect = _a.childRect, popoverRect = _a.popoverRect, boundaryRect = _a.boundaryRect, padding = _a.padding, reposition = _a.reposition;
    var rect = (0, exports.popoverRectForPosition)(position, childRect, popoverRect, padding, align);
    var boundaryViolation = reposition &&
        ((position === 'top' && rect.top < boundaryRect.top + boundaryInset) ||
            (position === 'left' && rect.left < boundaryRect.left + boundaryInset) ||
            (position === 'right' && rect.right > boundaryRect.right - boundaryInset) ||
            (position === 'bottom' && rect.bottom > boundaryRect.bottom - boundaryInset));
    return {
        rect: rect,
        boundaryViolation: boundaryViolation,
    };
};
exports.getNewPopoverRect = getNewPopoverRect;
var getNudgedPopoverRect = function (popoverRect, boundaryRect, boundaryInset) {
    var topBoundary = boundaryRect.top + boundaryInset;
    var leftBoundary = boundaryRect.left + boundaryInset;
    var rightBoundary = boundaryRect.right - boundaryInset;
    var bottomBoundary = boundaryRect.bottom - boundaryInset;
    var top = popoverRect.top < topBoundary ? topBoundary : popoverRect.top;
    top = top + popoverRect.height > bottomBoundary ? bottomBoundary - popoverRect.height : top;
    var left = popoverRect.left < leftBoundary ? leftBoundary : popoverRect.left;
    left = left + popoverRect.width > rightBoundary ? rightBoundary - popoverRect.width : left;
    return (0, exports.createRect)(__assign(__assign({}, popoverRect), { top: top, left: left }));
};
exports.getNudgedPopoverRect = getNudgedPopoverRect;
//# sourceMappingURL=util.js.map