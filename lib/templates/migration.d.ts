declare const _default: "module.exports = async () => {\n  return {\n    changelogCollectionName: 'migrations',\n    migrationsDir: 'migrations',\n    defaultTemplate: 'es6',\n    outDir: './.xmigrate',\n    typescript: true,\n    logger: {\n      folder: './migrations-log',\n      up: {\n        success: 'up.success.log',\n        error: 'up.error.log'\n      },\n      down: {\n        success: 'down.success.log',\n        error: 'down.error.log'\n      }\n    },\n    mongodb: {\n      url: 'mongodb://localhost:27017',\n      databaseName: 'test',\n      options: {\n        useNewUrlParser: true\n      }\n    },\n  };\n};\n";
export default _default;
