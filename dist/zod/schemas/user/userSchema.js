"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    password: zod_1.z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    CPFCNPJ: zod_1.z.string().optional(),
    CRM: zod_1.z.string().optional(),
    nationalID: zod_1.z.string().optional(),
}).strict();
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
});
