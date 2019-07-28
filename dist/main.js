#!/usr/bin/env node
parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"injection.tokens.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("@rxdi/core");exports.LoggerConfig=new e.InjectionToken("logger-config"),exports.Config=new e.InjectionToken("migrations-config"),exports.CommandInjector=new e.InjectionToken("CommandInjector");
},{}],"helpers/log-factory.ts":[function(require,module,exports) {
"use strict";var e,t=this&&this.__decorate||function(e,t,r,o){var s,g=arguments.length,i=g<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,o);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(i=(g<3?s(i):g>3?s(t,r,i):s(t,r))||i);return g>3&&i&&Object.defineProperty(t,r,i),i},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},o=this&&this.__param||function(e,t){return function(r,o){t(r,o,e)}};Object.defineProperty(exports,"__esModule",{value:!0});const s=require("@rxdi/core"),g=require("../injection.tokens"),i=require("fs");class c{constructor(e,t){this.successLogger=i.createWriteStream(e,{flags:"a"}),this.errorLogger=i.createWriteStream(t,{flags:"a"})}log(e){this.successLogger.write(this.getLogTemplate(e,"🚀"))}error(e){this.errorLogger.write(this.getLogTemplate(e,"🔥"))}close(){this.successLogger.close(),this.errorLogger.close(),this.successLogger.end(),this.errorLogger.end()}getLogTemplate(e,t){return`\n${t} ********* ${new Date} *********\n\n${JSON.stringify(e,null,2)}\n`}}exports.Logger=c;let n=class{constructor(e){this.config=e,this.loggers=new Map}getDownLogger(){return this.create("down",this.getConfig("down"))}getUpLogger(){return this.create("up",this.getConfig("up"))}getConfig(e){return{successPath:`${this.config.folder}/${this.config[e].success}`,errorPath:`${this.config.folder}/${this.config[e].error}`}}closeConnections(){[...this.loggers.values()].forEach(e=>e.close())}create(e,{successPath:t,errorPath:r}){return this.has(e)?this.get(e):(this.loggers.set(e,new c(t,r)),this.get(e))}has(e){return this.loggers.has(e)}get(e){return this.loggers.get(e)}};n=t([s.Injectable(),o(0,s.Inject(g.LoggerConfig)),r("design:paramtypes",["function"==typeof(e=void 0!==g.LoggerConfig&&g.LoggerConfig)?e:Object])],n),exports.LogFactory=n;
},{"../injection.tokens":"injection.tokens.ts"}],"default.config.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_CONFIG={changelogCollectionName:"migrations",migrationsDir:"migrations",defaultTemplate:"es6",typescript:!0,outDir:"./.xmigrate",logger:{folder:"./migrations-log",up:{success:"up.success.log",error:"up.error.log"},down:{success:"down.success.log",error:"down.error.log"}},mongodb:{url:"mongodb://localhost:27017",databaseName:"test",options:{useNewUrlParser:!0}}};
},{}],"helpers/typescript-builder.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("child_process");exports.TranspileTypescript=((r,s)=>new Promise(o=>{const t=e.spawn("npx",["gapi","build","--glob",`${r.toString()}`,"--outDir",s]);t.stderr.pipe(process.stderr),t.on("close",e=>{if(0!==e)throw new Error;o()})}));
},{}],"services/config/config.service.ts":[function(require,module,exports) {
"use strict";var e=this&&this.__decorate||function(e,t,r,i){var n,c=arguments.length,o=c<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(o=(c<3?n(o):c>3?n(t,r,o):n(t,r))||o);return c>3&&o&&Object.defineProperty(t,r,o),o},t=this&&this.__awaiter||function(e,t,r,i){return new(r||(r=Promise))(function(n,c){function o(e){try{u(i.next(e))}catch(t){c(t)}}function s(e){try{u(i.throw(e))}catch(t){c(t)}}function u(e){e.done?n(e.value):new r(function(t){t(e.value)}).then(o,s)}u((i=i.apply(e,t||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const r=require("@rxdi/core"),i=require("../../default.config"),n=require("util"),c=require("fs"),o=require("path"),s=require("../../helpers/typescript-builder");let u=class{constructor(){this.config=i.DEFAULT_CONFIG}set(e){Object.assign(this.config,e)}get(){return this.config}getTypescriptSettings(e,r){return t(this,void 0,void 0,function*(){return(yield n.promisify(c.exists)(`./${e}/${r}.js`))||(yield s.TranspileTypescript([`/${r}.ts`],e)),require("esm")(module)(o.join(process.cwd(),`./${e}`,`${r}.js`))})}getES6(e){return require("esm")(module)(`./${e}.js`)}};u=e([r.Injectable()],u),exports.ConfigService=u;
},{"../../default.config":"default.config.ts","../../helpers/typescript-builder":"helpers/typescript-builder.ts"}],"services/database/database.service.ts":[function(require,module,exports) {
"use strict";var e,t=this&&this.__decorate||function(e,t,o,n){var i,c=arguments.length,r=c<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(r=(c<3?i(r):c>3?i(t,o,r):i(t,o))||r);return c>3&&r&&Object.defineProperty(t,o,r),r},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))(function(i,c){function r(e){try{f(n.next(e))}catch(t){c(t)}}function s(e){try{f(n.throw(e))}catch(t){c(t)}}function f(e){e.done?i(e.value):new o(function(t){t(e.value)}).then(r,s)}f((n=n.apply(e,t||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const i=require("@rxdi/core"),c=require("mongodb"),r=require("mongoose"),s=require("../config/config.service");let f=class{constructor(e){this.configService=e,this.connections=new Map}connect(){return n(this,void 0,void 0,function*(){const e=this.configService.config.mongodb.url,t=this.configService.config.mongodb.databaseName;if(!e)throw new Error("No `url` defined in config file!");if(!t)throw new Error("No `databaseName` defined in config file! This is required since migrate-mongo v3. See https://github.com/seppevs/migrate-mongo#initialize-a-new-project");const o=yield this.getMongoClient().connect(e,this.configService.config.mongodb.options),n=o.db.bind(o);return o.db=(e=>n(e||t)),this.connections.set(e,o),o})}getMongoClient(){return c.MongoClient}close(){return n(this,void 0,void 0,function*(){yield Promise.all([...this.connections.values()].map(e=>e.close(!0)))})}mongooseConnect(){return r.connect(`${this.configService.config.mongodb.url}/${this.configService.config.mongodb.databaseName}`,this.configService.config.mongodb.options)}};f=t([i.Injectable(),o("design:paramtypes",["function"==typeof(e=void 0!==s.ConfigService&&s.ConfigService)?e:Object])],f),exports.DatabaseService=f;
},{"../config/config.service":"services/config/config.service.ts"}],"helpers/date.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("date-fns");exports.now=((e=Date.now())=>{const t=new Date(e);return new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),t.getUTCMilliseconds())}),exports.nowAsString=(()=>e.format(exports.now(),"YYYYMMDDHHmmss"));
},{}],"templates/native.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nexport async function up (client) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: true } })\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 5 } })\n},\n\nexport async function down (client) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 0 } })\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } })\n}\n";
},{}],"templates/es5.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nmodule.exports = {\n  async up (client) {\n    return ['Up']\n  },\n\n  async down (client) {\n    return ['Down']\n  }\n}\n";
},{}],"templates/es6.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nexport async function up(client) {\n  return ['Up'];\n}\nexport async function down(client) {\n  return ['Down'];\n}\n";
},{}],"templates/typescript.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nimport { MongoClient } from 'mongodb';\n\nexport async function up(client: MongoClient) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: true } });\n\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 5 } });\n}\nexport async function down(client: MongoClient) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 0 } });\n\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } });\n}\n\n";
},{}],"templates/migration.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="module.exports = async () => {\n  return {\n    changelogCollectionName: 'migrations',\n    migrationsDir: 'migrations',\n    defaultTemplate: 'es6',\n    outDir: './.xmigrate',\n    typescript: true,\n    logger: {\n      folder: './migrations-log',\n      up: {\n        success: 'up.success.log',\n        error: 'up.error.log'\n      },\n      down: {\n        success: 'down.success.log',\n        error: 'down.error.log'\n      }\n    },\n    mongodb: {\n      url: 'mongodb://localhost:27017',\n      databaseName: 'test',\n      options: {\n        useNewUrlParser: true\n      }\n    },\n  };\n};\n";
},{}],"templates/index.ts":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("./native"));exports.native=t.default;const r=e(require("./es5"));exports.es5=r.default;const s=e(require("./es6"));exports.es6=s.default;const i=e(require("./typescript"));exports.typescript=i.default;const o=e(require("./migration"));exports.migration=o.default;
},{"./native":"templates/native.ts","./es5":"templates/es5.ts","./es6":"templates/es6.ts","./typescript":"templates/typescript.ts","./migration":"templates/migration.ts"}],"services/migrations-resolver/migrations-resolver.service.ts":[function(require,module,exports) {
"use strict";var e,t=this&&this.__decorate||function(e,t,i,r){var n,o=arguments.length,s=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(o<3?n(s):o>3?n(t,i,s):n(t,i))||s);return o>3&&s&&Object.defineProperty(t,i,s),s},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(n,o){function s(e){try{a(r.next(e))}catch(t){o(t)}}function c(e){try{a(r.throw(e))}catch(t){o(t)}}function a(e){e.done?n(e.value):new i(function(t){t(e.value)}).then(s,c)}a((r=r.apply(e,t||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const n=require("@rxdi/core"),o=require("fs"),s=require("path"),c=require("util"),a=require("../config/config.service"),l=require("../../helpers/typescript-builder");let u=class{constructor(e){this.configService=e}getFileNames(){return r(this,void 0,void 0,function*(){return(yield c.promisify(o.readdir)(this.configService.config.migrationsDir)).filter(e=>".js"===s.extname(e)||this.isTypescript(e))})}readDir(){return c.promisify(o.readdir)(this.configService.config.outDir)}getDistFileNames(){return r(this,void 0,void 0,function*(){return(yield this.readDir()).filter(e=>".js"===s.extname(e)).map(e=>this.getTsCompiledFilePath(e))})}isTypescript(e){return".ts"===s.extname(e)&&this.configService.config.typescript}loadMigration(e,t){return r(this,void 0,void 0,function*(){let t;return t=this.isTypescript(e)?yield this.loadTsMigration(e):require("esm")(module)(this.getFilePath(e))})}getFilePath(e){return s.join(process.cwd(),this.configService.config.migrationsDir,e)}getRelativePath(e){return this.getFilePath(e).replace(process.cwd(),"")}clean(e){return r(this,void 0,void 0,function*(){return e=e||(yield this.getFileNames()),yield Promise.all(e.map(e=>this.deleteArtefacts(e))),!0})}deleteArtefacts(e){return r(this,void 0,void 0,function*(){yield this.delete(this.getTsCompiledFilePath(e)),yield this.delete(this.getTsCompiledFilePath(`${e}.map`))})}delete(e){return r(this,void 0,void 0,function*(){return new Promise(t=>o.unlink(e,()=>t(!0)))})}loadTsMigration(e){return r(this,void 0,void 0,function*(){return require(this.getTsCompiledFilePath(e))})}transpileMigrations(e){return r(this,void 0,void 0,function*(){yield l.TranspileTypescript(e.map(e=>this.getRelativePath(e)),this.configService.config.outDir)})}getTsCompiledFilePath(e){return s.join(process.cwd(),this.configService.config.outDir,this.replaceFilenameJsWithTs(e))}replaceFilenameJsWithTs(e){return e.replace("ts","js")}};u=t([n.Injectable(),i("design:paramtypes",["function"==typeof(e=void 0!==a.ConfigService&&a.ConfigService)?e:Object])],u),exports.MigrationsResolver=u;
},{"../config/config.service":"services/config/config.service.ts","../../helpers/typescript-builder":"helpers/typescript-builder.ts"}],"helpers/error.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e extends Error{}exports.ErrorMap=e;
},{}],"services/migration/migration.service.ts":[function(require,module,exports) {
"use strict";var e,t,i,r,n=this&&this.__decorate||function(e,t,i,r){var n,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var s=e.length-1;s>=0;s--)(n=e[s])&&(a=(o<3?n(a):o>3?n(t,i,a):n(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(n,o){function a(e){try{l(r.next(e))}catch(t){o(t)}}function s(e){try{l(r.throw(e))}catch(t){o(t)}}function l(e){e.done?n(e.value):new i(function(t){t(e.value)}).then(a,s)}l((r=r.apply(e,t||[])).next())})},s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const c=require("../database/database.service"),d=require("@rxdi/core"),f=require("util"),u=require("fs"),g=require("../../helpers/date"),h=s(require("../../templates/index")),p=require("../migrations-resolver/migrations-resolver.service"),m=l(require("chalk")),v=require("path"),y=require("../../helpers/log-factory"),N=require("../../helpers/error"),w=require("../config/config.service");let b=class{constructor(e,t,i,r){this.configService=e,this.database=t,this.migrationsResolver=i,this.logger=r}connect(){return a(this,void 0,void 0,function*(){return yield this.database.mongooseConnect(),this.database.connect()})}up(){return a(this,void 0,void 0,function*(){const e=(yield this.statusInternal()).filter(e=>"PENDING"===e.appliedAt),t=[],i=yield this.connect(),r=this.logger.getUpLogger(),n=e.filter(e=>this.migrationsResolver.isTypescript(e.fileName)).map(e=>e.fileName);n.length&&(yield this.migrationsResolver.transpileMigrations(n));const o=e=>a(this,void 0,void 0,function*(){let n;try{const o=yield this.migrationsResolver.loadMigration(e.fileName);n=yield o.up(i)}catch(c){const i=new N.ErrorMap(c.message);throw i.fileName=e.fileName,i.migrated=t,r.error({migrated:t,errorMessage:i.message,fileName:e.fileName}),i}const o=i.db().collection(this.configService.config.changelogCollectionName),{fileName:a}=e,s=new Date;try{yield o.insertOne({fileName:a,appliedAt:s})}catch(c){throw r.error({migrated:t,errorMessage:c.message,fileName:e.fileName}),new Error(`Could not update changelog: ${c.message}`)}const l={fileName:e.fileName,appliedAt:s,result:n};return r.log(l),t.push(l),yield!0});for(const a of e)yield o(a);return yield this.migrationsResolver.clean(n),this.printStatus(t),t})}down(){return a(this,void 0,void 0,function*(){const e=[],t=(yield this.statusInternal()).filter(e=>"PENDING"!==e.appliedAt),i=t[t.length-1];if(!i)return;const r=this.migrationsResolver.isTypescript(i.fileName);let n;if(t.length&&i){const t=this.logger.getDownLogger(),a=yield this.connect();r&&(yield this.migrationsResolver.transpileMigrations([i.fileName]));try{const r=yield this.migrationsResolver.loadMigration(i.fileName);n=yield r.down(a)}catch(o){const r=new N.ErrorMap(o.message);throw r.fileName=i.fileName,r.downgraded=e,t.error({downgraded:e,errorMessage:o.message,fileName:i.fileName}),r}const s=a.db().collection(this.configService.config.changelogCollectionName);try{yield s.deleteOne({fileName:i.fileName});const r={fileName:i.fileName,appliedAt:new Date,result:n};t.log(r),e.push(r)}catch(o){throw t.error({downgraded:e,errorMessage:o.message,fileName:i.fileName}),new Error(`Could not update changelog: ${o.message}`)}}return i&&(yield this.migrationsResolver.clean([i.fileName])),this.printStatus(e),e})}createWithTemplate(e,t,i={raw:!1,typescript:!1}){return a(this,void 0,void 0,function*(){let r=h[e];if(i.raw)r=e;else if(!r)throw new Error(`🔥  *** Missing template ${e} ***`);const n=i.typescript||"typescript"===e,o=v.normalize(`./${this.configService.config.migrationsDir}/${g.nowAsString()}-${t}.${n?"ts":"js"}`);return yield f.promisify(u.writeFile)(o,r,{encoding:"utf-8"}),"/"+o})}writeConfig(){return a(this,void 0,void 0,function*(){yield f.promisify(u.writeFile)("./xmigrate.js",h.migration,{encoding:"utf-8"})})}init(){return a(this,void 0,void 0,function*(){const e=yield f.promisify(u.readFile)("./.gitignore",{encoding:"utf-8"}),t=u.createWriteStream("./.gitignore",{flags:"a"});e.includes(".cache")||t.write("\n.cache"),e.includes("dist")||t.write("\ndist"),t.end(),yield this.writeConfig()})}create({name:e,template:t}){return a(this,void 0,void 0,function*(){const i=t||this.configService.config.defaultTemplate,r=yield this.createWithTemplate(i,e);console.log(`\n\n🚀  ${m.default.bold("Template:")} "${m.default.blue(i)}"!\n\n💾  ${m.default.bold("File:")} ${m.default.blue(v.normalize(`${process.cwd()}//${r}`))}\n\n🚀  ${m.default.green.bold("Migration template created!")}\n`),process.exit(0)})}statusInternal(){return a(this,void 0,void 0,function*(){const e=yield this.migrationsResolver.getFileNames(),t=(yield this.connect()).db().collection(this.configService.config.changelogCollectionName),i=yield t.find({}).toArray();return e.map(e=>{const t=i.find(t=>t.fileName===e),r=t?t.appliedAt.toJSON():"PENDING";return{fileName:e,appliedAt:r,result:null}})})}status(){return a(this,void 0,void 0,function*(){const e=yield this.statusInternal();return this.printStatus(e,"table"),{status:!0,result:e.filter(e=>"PENDING"===e.appliedAt)}})}printStatus(e,t){if("table"===t&&e.length)return console.table(e,["fileName","appliedAt"]);e.forEach((e,t)=>console.log(`\n#️⃣  ${m.default.white.bold(String(t+1))}\n${m.default.blue("-".repeat(process.stdout.columns))}\n📁  ${m.default.bold("Filename:")} ${m.default.green(e.fileName)}\n⏱️  ${m.default.bold("Applied at:")} ${m.default.green(String(e.appliedAt))}\n${m.default.blue("-".repeat(process.stdout.columns))}\n    `))}};b=n([d.Injectable(),o("design:paramtypes",["function"==typeof(e=void 0!==w.ConfigService&&w.ConfigService)?e:Object,"function"==typeof(t=void 0!==c.DatabaseService&&c.DatabaseService)?t:Object,"function"==typeof(i=void 0!==p.MigrationsResolver&&p.MigrationsResolver)?i:Object,"function"==typeof(r=void 0!==y.LogFactory&&y.LogFactory)?r:Object])],b),exports.MigrationService=b;
},{"../database/database.service":"services/database/database.service.ts","../../helpers/date":"helpers/date.ts","../../templates/index":"templates/index.ts","../migrations-resolver/migrations-resolver.service":"services/migrations-resolver/migrations-resolver.service.ts","../../helpers/log-factory":"helpers/log-factory.ts","../../helpers/error":"helpers/error.ts","../config/config.service":"services/config/config.service.ts"}],"services/generic-runner/generic-runner.service.ts":[function(require,module,exports) {
"use strict";var e,t,i,o,r=this&&this.__decorate||function(e,t,i,o){var r,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var l=e.length-1;l>=0;l--)(r=e[l])&&(s=(n<3?r(s):n>3?r(t,i,s):r(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s},n=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},s=this&&this.__awaiter||function(e,t,i,o){return new(i||(i=Promise))(function(r,n){function s(e){try{a(o.next(e))}catch(t){n(t)}}function l(e){try{a(o.throw(e))}catch(t){n(t)}}function a(e){e.done?r(e.value):new i(function(t){t(e.value)}).then(s,l)}a((o=o.apply(e,t||[])).next())})},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const a=require("path"),c=l(require("chalk")),u=require("../../helpers/log-factory"),d=require("@rxdi/core"),g=require("../migration/migration.service"),f=require("../config/config.service"),h=require("../migrations-resolver/migrations-resolver.service"),b=require("util"),m=require("fs");let p=class{constructor(e,t,i,o){this.logger=e,this.configService=t,this.resolver=i,this.migrationService=o,this.tasks=new Map}setTasks(e){this.tasks=new Map(e)}run(e,t){return s(this,void 0,void 0,function*(){if(yield this.logEnvironment(e),!this.tasks.has(e))throw new Error("\n🔥  Missing command");try{const r=yield this.tasks.get(e)(t);r&&r.status&&r.result.length?console.log(`\n          \n🔥  There are ${c.default.red(r.result.length)} migration with status '${c.default.red("PENDING")}' run '${c.default.green("xmigrate up")}' command!\n          `):console.log(`\n        \n🚀  ${c.default.green.bold(r&&r.length?`Success! Runned ${r.length} migrations.`:"Already up to date")}\n        `),setTimeout(()=>process.exit(0),0)}catch(i){if(console.error(`\n      \n🔥  ${c.default.bold("Status: Operation executed with error")}\n🧨  ${c.default.bold("Error: "+JSON.stringify(i))}\n📨  ${c.default.bold("Message: "+i.message)}\n      `),t&&t.rollback)try{yield this.rollback(i.fileName)}catch(o){console.log("\n🔥  Migration rollback exited with error  ",o),this.logger.getDownLogger().error({errorMessage:o.message,fileName:i.fileName})}setTimeout(()=>process.exit(1),0)}try{yield b.promisify(m.rmdir)(a.join(process.cwd(),this.configService.config.outDir))}catch(i){}})}rollback(e){return s(this,void 0,void 0,function*(){const t={fileName:e,appliedAt:new Date},i=this.logger.getDownLogger(),{migrationsDir:o}=this.configService.config,r=a.normalize(`${process.cwd()}/${o}/${e}`);let n;return console.log(`\n\n🙏  ${c.default.bold("Status: Executing rallback operation")} ${c.default.red("xmigrate down")}\n📁  ${c.default.bold("Migration:")} ${r}\n      `),n=this.resolver.isTypescript(e)?yield this.resolver.loadTsMigration(e):require(r),t.result=yield n.down(yield this.migrationService.connect()),t.appliedAt=new Date,console.log(`\n🚀  ${c.default.green("Rallback operation success, nothing changed if written correctly!")}`),i.log(t),t})}bind(e){return Array.from(this.tasks.keys()).map(t=>this.tasks.set(t,this.tasks.get(t).bind(e))),this}logEnvironment(e){return s(this,void 0,void 0,function*(){const{mongodb:{databaseName:t},migrationsDir:i,logger:{folder:o},changelogCollectionName:r}=this.configService.config;console.log(`\n    \n🖥️  ${c.default.bold("Database:")} ${c.default.blue.bold(t)}\n    \n💿  ${c.default.bold("DBCollection:")} ${c.default.blue.bold(r)}\n    \n🗄️  ${c.default.bold("LoggerDir:")} ${c.default.blue.bold(o)}\n    \n📁  ${c.default.bold("MigrationsDir:")} ${c.default.blue.bold(i)}\n    \n👷  ${c.default.bold("Script:")} ${c.default.blue.bold(`xmigrate ${e}`)}\n    `)})}};p=r([d.Injectable(),n("design:paramtypes",["function"==typeof(e=void 0!==u.LogFactory&&u.LogFactory)?e:Object,"function"==typeof(t=void 0!==f.ConfigService&&f.ConfigService)?t:Object,"function"==typeof(i=void 0!==h.MigrationsResolver&&h.MigrationsResolver)?i:Object,"function"==typeof(o=void 0!==g.MigrationService&&g.MigrationService)?o:Object])],p),exports.GenericRunner=p;
},{"../../helpers/log-factory":"helpers/log-factory.ts","../migration/migration.service":"services/migration/migration.service.ts","../config/config.service":"services/config/config.service.ts","../migrations-resolver/migrations-resolver.service":"services/migrations-resolver/migrations-resolver.service.ts"}],"helpers/args-extractors.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.includes=(e=>process.argv.toString().includes(e)),exports.nextOrDefault=((e,r=!0,s=(e=>e))=>{if(process.argv.toString().includes(e)){const t=process.argv[process.argv.indexOf(e)+1];return t?t.includes("--")?r:s(t):r}return r});
},{}],"helpers/ensure-folder.ts":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))(function(r,o){function u(t){try{s(n.next(t))}catch(e){o(e)}}function c(t){try{s(n.throw(t))}catch(e){o(e)}}function s(t){t.done?r(t.value):new i(function(e){e(t.value)}).then(u,c)}s((n=n.apply(t,e||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const e=require("util"),i=require("fs");function n(n){return t(this,void 0,void 0,function*(){try{yield e.promisify(i.mkdir)(n,{recursive:!0})}catch(t){if("EEXIST"!==t.code)throw t}})}exports.ensureDir=n;
},{}],"helpers/index.ts":[function(require,module,exports) {
"use strict";function r(r){for(var e in r)exports.hasOwnProperty(e)||(exports[e]=r[e])}Object.defineProperty(exports,"__esModule",{value:!0}),r(require("./args-extractors")),r(require("./date")),r(require("./ensure-folder")),r(require("./error")),r(require("./log-factory"));
},{"./args-extractors":"helpers/args-extractors.ts","./date":"helpers/date.ts","./ensure-folder":"helpers/ensure-folder.ts","./error":"helpers/error.ts","./log-factory":"helpers/log-factory.ts"}],"migrations.module.ts":[function(require,module,exports) {
"use strict";var e,r=this&&this.__decorate||function(e,r,i,t){var o,n=arguments.length,s=n<3?r:null===t?t=Object.getOwnPropertyDescriptor(r,i):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,r,i,t);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(s=(n<3?o(s):n>3?o(r,i,s):o(r,i))||s);return n>3&&s&&Object.defineProperty(r,i,s),s},i=this&&this.__awaiter||function(e,r,i,t){return new(i||(i=Promise))(function(o,n){function s(e){try{u(t.next(e))}catch(r){n(r)}}function c(e){try{u(t.throw(e))}catch(r){n(r)}}function u(e){e.done?o(e.value):new i(function(r){r(e.value)}).then(s,c)}u((t=t.apply(e,r||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@rxdi/core"),o=require("./services/generic-runner/generic-runner.service"),n=require("./helpers/log-factory"),s=require("./injection.tokens"),c=require("./services/migration/migration.service"),u=require("./helpers/args-extractors"),a=require("./default.config"),l=require("./services/config/config.service"),d=require("./helpers"),f=require("util"),p=require("fs"),g=require("./helpers/typescript-builder"),v=require("path"),y=require("./services/migrations-resolver/migrations-resolver.service");let m=e=class{static forRoot(r=a.DEFAULT_CONFIG){return{module:e,providers:[o.GenericRunner,n.LogFactory,l.ConfigService,y.MigrationsResolver,{provide:s.Config,useValue:r},{provide:s.LoggerConfig,useValue:r.logger},{provide:"set-tasks",deps:[o.GenericRunner,c.MigrationService],useFactory:(e,r)=>i(this,void 0,void 0,function*(){const i=[["up",r.up],["down",r.down],["status",r.status],["create",r.create],["init",r.init]];return e.setTasks(i),e.bind(r),i})},{provide:s.CommandInjector,useFactory:()=>{const[,,...e]=process.argv;return{command:e[0],argv:e}}},{provide:"start",deps:[s.CommandInjector,o.GenericRunner,l.ConfigService],useFactory:({command:e,argv:t},o,n)=>i(this,void 0,void 0,function*(){try{let e;const t="xmigrate";(yield f.promisify(p.exists)(`./${t}.ts`))?(yield g.TranspileTypescript([`/${t}.ts`],r.outDir),e=require(v.join(process.cwd(),`./${r.outDir}`,`${t}.js`)),yield f.promisify(p.unlink)(v.join("./",r.outDir,"xmigrate.js")),yield f.promisify(p.unlink)(v.join("./",r.outDir,"xmigrate.js.map"))):e=require("esm")(module)(`./${t}.js`),e=e.default?yield e.default():yield e(),n.set(e)}catch(i){}return yield d.ensureDir(n.config.logger.folder),yield d.ensureDir(n.config.migrationsDir),"create"===e?o.run(e,{name:t[1],template:u.nextOrDefault("--template",null)}):"up"===e?o.run(e,{rollback:u.includes("--rollback")}):void(yield o.run(e))})}]}}};m=e=r([t.Module()],m),exports.MigrationsModule=m;
},{"./services/generic-runner/generic-runner.service":"services/generic-runner/generic-runner.service.ts","./helpers/log-factory":"helpers/log-factory.ts","./injection.tokens":"injection.tokens.ts","./services/migration/migration.service":"services/migration/migration.service.ts","./helpers/args-extractors":"helpers/args-extractors.ts","./default.config":"default.config.ts","./services/config/config.service":"services/config/config.service.ts","./helpers":"helpers/index.ts","./helpers/typescript-builder":"helpers/typescript-builder.ts","./services/migrations-resolver/migrations-resolver.service":"services/migrations-resolver/migrations-resolver.service.ts"}],"app.module.ts":[function(require,module,exports) {
"use strict";var e=this&&this.__decorate||function(e,t,r,o){var c,i=arguments.length,l=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(c=e[s])&&(l=(i<3?c(l):i>3?c(t,r,l):c(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@rxdi/core"),r=require("./migrations.module");let o=class{};o=e([t.Module({imports:[r.MigrationsModule.forRoot()]})],o),exports.AppModule=o;
},{"./migrations.module":"migrations.module.ts"}],"main.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("@rxdi/core"),r=require("./app.module");e.Bootstrap(r.AppModule).subscribe(()=>{},console.error.bind(console));
},{"./app.module":"app.module.ts"}]},{},["main.ts"], null)
//# sourceMappingURL=/main.js.map