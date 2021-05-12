/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.jwt = exports.mysql = void 0;\nvar dotenv = __webpack_require__(/*! dotenv */ \"dotenv\");\ndotenv.config();\nexports.mysql = {\n    database: process.env.DB_SCHEMA,\n    host: process.env.DB_HOST,\n    user: process.env.DB_USER,\n    password: process.env.DB_PASS\n};\nexports.jwt = {\n    secret: process.env.JWT_SIGNATURE,\n    expiration: process.env.JWT_EXPIRY\n};\n\n\n//# sourceURL=webpack://core-api/./src/config/index.ts?");

/***/ }),

/***/ "./src/db/index.ts":
/*!*************************!*\
  !*** ./src/db/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.users = exports.Query = void 0;\nvar mysql = __webpack_require__(/*! mysql */ \"mysql\");\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nvar pool = mysql.createPool(config_1.mysql);\nvar Query = function (query, values) {\n    return new Promise(function (resolve, reject) {\n        var formattedSql = mysql.format(query, values);\n        console.log({ formattedSql: formattedSql });\n        pool.query(formattedSql, function (err, results) {\n            err ? reject(err) : resolve(results);\n        });\n    });\n};\nexports.Query = Query;\nexports.users = __webpack_require__(/*! ./queries/users */ \"./src/db/queries/users.ts\");\n\n\n//# sourceURL=webpack://core-api/./src/db/index.ts?");

/***/ }),

/***/ "./src/db/queries/users.ts":
/*!*********************************!*\
  !*** ./src/db/queries/users.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.destroy = exports.update = exports.create = exports.search_by = exports.single = exports.all = void 0;\nvar index_1 = __webpack_require__(/*! ../index */ \"./src/db/index.ts\");\nvar all = function () { return index_1.Query('SELECT * FROM Users'); };\nexports.all = all;\nvar single = function (id) { return index_1.Query('SELECT * FROM Users WHERE id=?', [id]); };\nexports.single = single;\nvar search_by = function (column, value) { return index_1.Query('SELECT * FROM Users WHERE ??=?', [column, value]); };\nexports.search_by = search_by;\nvar create = function (user) { return index_1.Query('INSERT INTO Users SET ?', [user]); };\nexports.create = create;\nvar update = function (id, user) { return index_1.Query('UPDATE Users SET ? WHERE id=?', [user, id]); };\nexports.update = update;\nvar destroy = function (id) { return index_1.Query('DELETE FROM Users WHERE id=?', [id]); };\nexports.destroy = destroy;\n\n\n//# sourceURL=webpack://core-api/./src/db/queries/users.ts?");

/***/ }),

/***/ "./src/middlewares/configure.ts":
/*!**************************************!*\
  !*** ./src/middlewares/configure.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.configure = void 0;\nvar express = __webpack_require__(/*! express */ \"express\");\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\nvar compression = __webpack_require__(/*! compression */ \"compression\");\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\n__webpack_require__(/*! ./passport-strategies */ \"./src/middlewares/passport-strategies.ts\");\nvar configure = function (app) {\n    app.use(passport.initialize());\n    app.use(express.json());\n    app.use(morgan('dev'));\n    app.use(helmet());\n    app.use(compression());\n};\nexports.configure = configure;\n\n\n//# sourceURL=webpack://core-api/./src/middlewares/configure.ts?");

/***/ }),

/***/ "./src/middlewares/global-error-handler.ts":
/*!*************************************************!*\
  !*** ./src/middlewares/global-error-handler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorHandler = void 0;\nvar errorHandler = function (err, req, res, next) {\n    console.error(\"\\n\\n\" + err.message + \"\\n\\n\");\n    res.status(err.status || 500).json({ message: \"An error occurred!\", error: err.message });\n};\nexports.errorHandler = errorHandler;\n\n\n//# sourceURL=webpack://core-api/./src/middlewares/global-error-handler.ts?");

/***/ }),

/***/ "./src/middlewares/index.ts":
/*!**********************************!*\
  !*** ./src/middlewares/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorHandler = exports.set_routes = exports.configure = void 0;\nvar configure_1 = __webpack_require__(/*! ./configure */ \"./src/middlewares/configure.ts\");\nObject.defineProperty(exports, \"configure\", ({ enumerable: true, get: function () { return configure_1.configure; } }));\nvar set_routes_1 = __webpack_require__(/*! ./set-routes */ \"./src/middlewares/set-routes.ts\");\nObject.defineProperty(exports, \"set_routes\", ({ enumerable: true, get: function () { return set_routes_1.set_routes; } }));\nvar global_error_handler_1 = __webpack_require__(/*! ./global-error-handler */ \"./src/middlewares/global-error-handler.ts\");\nObject.defineProperty(exports, \"errorHandler\", ({ enumerable: true, get: function () { return global_error_handler_1.errorHandler; } }));\n\n\n//# sourceURL=webpack://core-api/./src/middlewares/index.ts?");

/***/ }),

/***/ "./src/middlewares/passport-strategies.ts":
/*!************************************************!*\
  !*** ./src/middlewares/passport-strategies.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar PassportLocal = __webpack_require__(/*! passport-local */ \"passport-local\");\nvar PassportJWT = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\nvar db = __webpack_require__(/*! ../db */ \"./src/db/index.ts\");\nvar config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nvar security_1 = __webpack_require__(/*! ../utils/security */ \"./src/utils/security/index.ts\");\npassport.serializeUser(function (user, done) {\n    (user === null || user === void 0 ? void 0 : user.hashed) && delete user.hashed;\n    done(null, user);\n});\npassport.deserializeUser(function (user, done) { return done(null, user); });\npassport.use(new PassportLocal.Strategy({\n    usernameField: 'email',\n    session: false\n}, function (email, password, done) { return __awaiter(void 0, void 0, void 0, function () {\n    var emailRegex, isEmail, user, passwordsMatch, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 3, , 4]);\n                emailRegex = /^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n                isEmail = emailRegex.test(email.toLocaleLowerCase());\n                return [4 /*yield*/, db.users.search_by(isEmail ? 'email' : 'username', email)];\n            case 1:\n                user = (_a.sent())[0];\n                return [4 /*yield*/, security_1.passwords.verify(password, user.hashed)];\n            case 2:\n                passwordsMatch = _a.sent();\n                if (user && passwordsMatch) {\n                    delete user.hashed;\n                    done(null, user);\n                }\n                else {\n                    done(null, false);\n                }\n                return [3 /*break*/, 4];\n            case 3:\n                error_1 = _a.sent();\n                done(error_1);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); }));\npassport.use(new PassportJWT.Strategy({\n    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),\n    secretOrKey: config_1.jwt.secret\n}, function (payload, done) {\n    try {\n        done(null, payload);\n    }\n    catch (error) {\n        done(error);\n    }\n}));\n\n\n//# sourceURL=webpack://core-api/./src/middlewares/passport-strategies.ts?");

/***/ }),

/***/ "./src/middlewares/set-routes.ts":
/*!***************************************!*\
  !*** ./src/middlewares/set-routes.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.set_routes = void 0;\nvar global_error_handler_1 = __webpack_require__(/*! ./global-error-handler */ \"./src/middlewares/global-error-handler.ts\");\nvar routes_1 = __webpack_require__(/*! ../routes */ \"./src/routes/index.ts\");\nvar set_routes = function (app) {\n    app.use(routes_1.default);\n    app.use(global_error_handler_1.errorHandler);\n};\nexports.set_routes = set_routes;\n\n\n//# sourceURL=webpack://core-api/./src/middlewares/set-routes.ts?");

/***/ }),

/***/ "./src/routes/api/index.ts":
/*!*********************************!*\
  !*** ./src/routes/api/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar permissions_1 = __webpack_require__(/*! ../../utils/permissions */ \"./src/utils/permissions.ts\");\nvar router = express_1.Router();\nrouter.get('/', function (req, res) {\n    console.log(req.user);\n    res.send('api lol');\n});\nrouter.get('/status', function (q, s, n) { return permissions_1.isRole(q, s, n, 'admin'); }, function (req, res) {\n    res.status(269).send('API is responding, auth service is responding');\n});\nexports.default = router;\n\n\n//# sourceURL=webpack://core-api/./src/routes/api/index.ts?");

/***/ }),

/***/ "./src/routes/auth/index.ts":
/*!**********************************!*\
  !*** ./src/routes/auth/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar login_1 = __webpack_require__(/*! ./login */ \"./src/routes/auth/login.ts\");\nvar register_1 = __webpack_require__(/*! ./register */ \"./src/routes/auth/register.ts\");\nvar router = express_1.Router();\nrouter.use('/login', login_1.default);\nrouter.use('/register', register_1.default);\nexports.default = router;\n\n\n//# sourceURL=webpack://core-api/./src/routes/auth/index.ts?");

/***/ }),

/***/ "./src/routes/auth/login.ts":
/*!**********************************!*\
  !*** ./src/routes/auth/login.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar passport_1 = __webpack_require__(/*! passport */ \"passport\");\nvar security_1 = __webpack_require__(/*! ../../utils/security */ \"./src/utils/security/index.ts\");\nvar router = express_1.Router();\nrouter.post('/', passport_1.authenticate('local'), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var token, error_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, security_1.tokens.create({ id: req.user.id, roles: req.user.roles })];\n            case 1:\n                token = _a.sent();\n                return [2 /*return*/, res.json({ message: 'logged in!', token: token })];\n            case 2:\n                error_1 = _a.sent();\n                next(error_1);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://core-api/./src/routes/auth/login.ts?");

/***/ }),

/***/ "./src/routes/auth/register.ts":
/*!*************************************!*\
  !*** ./src/routes/auth/register.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar uuid_1 = __webpack_require__(/*! uuid */ \"uuid\");\nvar hibp_1 = __webpack_require__(/*! @atlc/hibp */ \"@atlc/hibp\");\nvar security_1 = __webpack_require__(/*! ../../utils/security */ \"./src/utils/security/index.ts\");\nvar db = __webpack_require__(/*! ../../db */ \"./src/db/index.ts\");\nvar router = express_1.Router();\nrouter.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {\n    var newUser, username, email, password, _a, isPwned, breaches, _b, add, token, error_1;\n    return __generator(this, function (_c) {\n        switch (_c.label) {\n            case 0:\n                _c.trys.push([0, 9, , 10]);\n                newUser = req.body;\n                username = newUser.username, email = newUser.email, password = newUser.password;\n                if (!(username && email && password)) return [3 /*break*/, 7];\n                return [4 /*yield*/, hibp_1.validate(password)];\n            case 1:\n                _a = _c.sent(), isPwned = _a.isPwned, breaches = _a.breaches;\n                if (isPwned) {\n                    throw new Error(\"You cannot register with that password. It has been found in \" + breaches + \" public breaches per HaveIBeenPwned.com\");\n                }\n                newUser.id = uuid_1.v4();\n                _b = newUser;\n                return [4 /*yield*/, security_1.passwords.slinging_slasher(password)];\n            case 2:\n                _b.hashed = _c.sent();\n                delete newUser.password;\n                return [4 /*yield*/, db.users.create(newUser)];\n            case 3:\n                add = _c.sent();\n                if (!add.errno) return [3 /*break*/, 4];\n                throw new Error(add.sqlMessage);\n            case 4: return [4 /*yield*/, security_1.tokens.create({ id: newUser.id, roles: JSON.stringify([\"user\"]) })];\n            case 5:\n                token = _c.sent();\n                res.status(201).json({\n                    message: \"The user was successfully created!\",\n                    id: newUser.id,\n                    token: token\n                });\n                _c.label = 6;\n            case 6: return [3 /*break*/, 8];\n            case 7: throw new Error('Username, Email, and Password fields must all be completed for registration.');\n            case 8: return [3 /*break*/, 10];\n            case 9:\n                error_1 = _c.sent();\n                next(error_1);\n                return [3 /*break*/, 10];\n            case 10: return [2 /*return*/];\n        }\n    });\n}); });\nexports.default = router;\n\n\n//# sourceURL=webpack://core-api/./src/routes/auth/register.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar auth_1 = __webpack_require__(/*! ./auth */ \"./src/routes/auth/index.ts\");\nvar api_1 = __webpack_require__(/*! ./api */ \"./src/routes/api/index.ts\");\nvar router = express_1.Router();\nrouter.use('/api', api_1.default);\nrouter.use('/auth', auth_1.default);\nexports.default = router;\n\n\n//# sourceURL=webpack://core-api/./src/routes/index.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar express = __webpack_require__(/*! express */ \"express\");\nvar middlewares_1 = __webpack_require__(/*! ./middlewares */ \"./src/middlewares/index.ts\");\nvar app = express();\nmiddlewares_1.configure(app);\nmiddlewares_1.set_routes(app);\nvar port = process.env.PORT || 3000;\napp.listen(port, function () { return console.log(\"Server's up at port \" + port); });\n\n\n//# sourceURL=webpack://core-api/./src/server.ts?");

/***/ }),

/***/ "./src/utils/permissions.ts":
/*!**********************************!*\
  !*** ./src/utils/permissions.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isUser = exports.isRole = void 0;\nvar passport = __webpack_require__(/*! passport */ \"passport\");\nvar express_1 = __webpack_require__(/*! express */ \"express\");\nvar router = express_1.Router();\nvar isRole = function (req, res, next, role_type) {\n    passport.authenticate('jwt', { session: false }, function (err, user, info) {\n        if (err)\n            return next(err);\n        if (info)\n            return res.status(401).json({ message: \"There was an unknown error while authenticating, please try again.\", error: info.message });\n        if (!user)\n            return res.status(401).json({ message: \"There was an unknown error while authenticating, please try again.\" });\n        if (!user.roles.includes(role_type)) {\n            res.status(403).json({\n                message: \"You have insufficient permissions to access this resource.\",\n                current_levels: JSON.parse(user.roles),\n                required_role: role_type\n            });\n            return;\n        }\n        req.user = user;\n        return next();\n    })(req, res, next, role_type);\n};\nexports.isRole = isRole;\nvar isUser = function (req, res, next) {\n    passport.authenticate('jwt', { session: false }, function (err, user, info) {\n        if (err)\n            return next(err);\n        if (info)\n            return res.status(401).json({ message: \"There was an unknown error while authenticating, please try again.\", error: info.message });\n        if (!user)\n            return res.status(401).json({ message: \"There was an unknown error while authenticating, please try again.\" });\n        if (user)\n            req.user = user;\n        console.log(req.user);\n        return next();\n    })(req, res, next);\n};\nexports.isUser = isUser;\n\n\n//# sourceURL=webpack://core-api/./src/utils/permissions.ts?");

/***/ }),

/***/ "./src/utils/security/index.ts":
/*!*************************************!*\
  !*** ./src/utils/security/index.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.tokens = exports.passwords = void 0;\nvar bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nvar jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nvar config_1 = __webpack_require__(/*! ../../config */ \"./src/config/index.ts\");\nvar /*hash_*/ slinging_slasher = function (password) { return __awaiter(void 0, void 0, void 0, function () {\n    var salt, hashed;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, bcrypt.genSalt(12)];\n            case 1:\n                salt = _a.sent();\n                return [4 /*yield*/, bcrypt.hash(password, salt)];\n            case 2:\n                hashed = _a.sent();\n                return [2 /*return*/, hashed];\n        }\n    });\n}); };\nvar compare = function (password, hashed) { return __awaiter(void 0, void 0, void 0, function () {\n    var check;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0: return [4 /*yield*/, bcrypt.compare(password, hashed)];\n            case 1:\n                check = _a.sent();\n                return [2 /*return*/, check];\n        }\n    });\n}); };\nvar create = function (payload) { return __awaiter(void 0, void 0, void 0, function () {\n    var token;\n    return __generator(this, function (_a) {\n        token = jwt.sign(payload, config_1.jwt.secret, { expiresIn: config_1.jwt.expiration });\n        return [2 /*return*/, token];\n    });\n}); };\nexports.passwords = {\n    slinging_slasher: slinging_slasher,\n    verify: compare\n};\nexports.tokens = {\n    create: create\n};\n\n\n//# sourceURL=webpack://core-api/./src/utils/security/index.ts?");

/***/ }),

/***/ "@atlc/hibp":
/*!*****************************!*\
  !*** external "@atlc/hibp" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("@atlc/hibp");;

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");;

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("compression");;

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");;

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");;

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");;

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("morgan");;

/***/ }),

/***/ "mysql":
/*!************************!*\
  !*** external "mysql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mysql");;

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("passport");;

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");;

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");;

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;