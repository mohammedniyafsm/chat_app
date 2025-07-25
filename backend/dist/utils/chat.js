"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomId = getRoomId;
function getRoomId(userId1, userId2) {
    return [userId1, userId2].sort().join("_");
}
