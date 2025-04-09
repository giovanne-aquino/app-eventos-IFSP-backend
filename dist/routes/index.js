"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Rota GET /
router.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API Eventos IFSP 👋' });
});
exports.default = router;
