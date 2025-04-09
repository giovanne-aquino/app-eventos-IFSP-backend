"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userRepository_1 = require("../repository/userRepository");
class UserService {
    async createUser(data) {
        return userRepository_1.userRepository.create(data);
    }
    async getUsers() {
        return userRepository_1.userRepository.findAll();
    }
    async getUser(id) {
        return userRepository_1.userRepository.findById(id);
    }
    async updateUser(id, data) {
        return userRepository_1.userRepository.update(id, data);
    }
    async deleteUser(id) {
        return userRepository_1.userRepository.delete(id);
    }
}
exports.UserService = UserService;
