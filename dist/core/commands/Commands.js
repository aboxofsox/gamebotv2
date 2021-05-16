"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Embedder_1 = __importDefault(require("../embedder/Embedder"));
var API_module_1 = __importDefault(require("../api/API.module"));
var TopRated_1 = __importDefault(require("../top-rated/TopRated"));
var CommandData_1 = require("./CommandData");
var Commands = /** @class */ (function () {
    function Commands() {
    }
    Commands.__init = function (client) {
        Commands.client = client;
        CommandData_1.CommandData.map(function (cmd) { return client.application.commands.create(cmd); });
        // Verify
        this.verify();
    };
    Commands.delete = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            var commands;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commands = Commands.client.application.commands.fetch().then(function (cmd) { return cmd; });
                        return [4 /*yield*/, commands];
                    case 1:
                        (_a.sent()).map(function (cmd) {
                            if (cmd.name === command) {
                                Commands.client.application.commands.delete(cmd.id);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Commands.verify = function () {
        this.client.application.commands.fetch().then(function (cmd) { return console.log(cmd); });
    };
    Commands.onCommand = function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, _b, top_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!interaction.isCommand())
                            return [2 /*return*/];
                        _a = interaction.commandName;
                        switch (_a) {
                            case 'search': return [3 /*break*/, 1];
                            case 'top': return [3 /*break*/, 7];
                            case 'twitch': return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 10];
                    case 1: return [4 /*yield*/, API_module_1.default.search(interaction.options[0].value.toString())];
                    case 2:
                        data = _c.sent();
                        if (!data.redirect) return [3 /*break*/, 4];
                        return [4 /*yield*/, API_module_1.default.redirect(data.slug)];
                    case 3:
                        _b = _c.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, API_module_1.default.search(interaction.options[0].value.toString())];
                    case 5:
                        _b = _c.sent();
                        _c.label = 6;
                    case 6:
                        data = _b;
                        Embedder_1.default.search(data, interaction);
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, TopRated_1.default.go(interaction.options[0].value.toString())];
                    case 8:
                        top_1 = _c.sent();
                        Embedder_1.default.top(top_1, interaction.options[0].value.toString(), interaction);
                        return [3 /*break*/, 10];
                    case 9: return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return Commands;
}());
exports.default = Commands;
