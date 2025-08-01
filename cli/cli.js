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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
require("dotenv").config();
var inquirer = require("inquirer");
var execSync = require("child_process").execSync;
var fs = require("fs");
var FILE = process.env.LOCAL_FILE || "./data.json";
var DEST = process.env.RSYNC_DEST;
var LEVELS = ["Mood", "Energy", "Anxiety", "Depression"];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var levels, _i, LEVELS_1, name_1, value, status, tagsRaw, tags, newData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    levels = [];
                    _i = 0, LEVELS_1 = LEVELS;
                    _a.label = 1;
                case 1:
                    if (!(_i < LEVELS_1.length)) return [3 /*break*/, 4];
                    name_1 = LEVELS_1[_i];
                    return [4 /*yield*/, inquirer.prompt({
                            type: "number",
                            name: "value",
                            message: "Level for ".concat(name_1, " (0-10)"),
                            validate: function (v) {
                                return v >= 0 && v <= 10 ? true : "Please enter a number from 0 to 10";
                            },
                        })];
                case 2:
                    value = (_a.sent()).value;
                    levels.push({ name: name_1, value: value });
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, inquirer.prompt({
                        type: "input",
                        name: "status",
                        message: "How are you doing?",
                    })];
                case 5:
                    status = (_a.sent()).status;
                    return [4 /*yield*/, inquirer.prompt({
                            type: "input",
                            name: "tagsRaw",
                            message: "Enter 1-5 tags (comma separated)",
                            validate: function (input) {
                                if (typeof input !== "string")
                                    return "Invalid input";
                                var count = input.split(",").filter(Boolean).length;
                                return count >= 1 && count <= 5 ? true : "Enter between 1 and 5 tags";
                            },
                        })];
                case 6:
                    tagsRaw = (_a.sent()).tagsRaw;
                    tags = tagsRaw
                        .split(",")
                        .map(function (s) { return s.trim(); })
                        .filter(function (s) { return s.length > 0; });
                    newData = {
                        levels: levels,
                        status: status,
                        tags: tags,
                        lastUpdated: Math.floor(Date.now()),
                    };
                    fs.writeFileSync(FILE, JSON.stringify(newData, null, 2));
                    console.log("Data saved to ".concat(FILE));
                    if (DEST) {
                        try {
                            execSync("rsync -avz ".concat(FILE, " ").concat(DEST), { stdio: "inherit" });
                            console.log("Synced to remote destination");
                        }
                        catch (err) {
                            console.error("Failed to sync: ".concat(err));
                        }
                    }
                    else {
                        console.warn("No RSYNC_DEST defined. Skipping sync.");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
