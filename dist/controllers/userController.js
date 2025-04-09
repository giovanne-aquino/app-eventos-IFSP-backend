"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const CreateUserRequestDTO_1 = require("../dtos/users/CreateUserRequestDTO");
const userService_1 = require("../services/userService");
const userSchema_1 = require("../zod/schemas/user/userSchema");
const validateParmsId_1 = require("../zod/schemas/common/validateParmsId");
const validateParams_1 = require("../utilis/validateParams");
const userSchema_2 = require("../zod/schemas/user/userSchema");
let UserController = class UserController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.userService = new userService_1.UserService();
    }
    async createUser(body) {
        const parsed = userSchema_2.createUserSchema.safeParse(body);
        if (!parsed.success) {
            throw new Error('Validation failed'); // ou lançar um erro com status 400
        }
        return this.userService.createUser(body);
    }
    async getUsers() {
        return this.userService.getUsers();
    }
    async getUser(id) {
        console.log("chegou aqui");
        const { id: userId } = (0, validateParams_1.validateParams)(validateParmsId_1.numericIdParamSchema, { id });
        return this.userService.getUser(userId);
    }
    async updateUser(id, body) {
        userSchema_1.updateUserSchema.parse(body);
        const { id: userId } = (0, validateParams_1.validateParams)(validateParmsId_1.numericIdParamSchema, { id });
        return this.userService.updateUser(userId, body);
    }
    async deleteUser(id) {
        const { id: userId } = (0, validateParams_1.validateParams)(validateParmsId_1.numericIdParamSchema, { id });
        await this.userService.deleteUser(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserRequestDTO_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Put)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Delete)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)('users'),
    (0, tsoa_1.Tags)('Users')
], UserController);
