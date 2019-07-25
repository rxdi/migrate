export default `module.exports = async () => {
  return {
    changelogCollectionName: 'migrations',
    migrationsDir: 'migrations',
    logger: {
      folder: './migrations-log',
      up: {
        success: 'up.success.log',
        error: 'up.error.log'
      },
      down: {
        success: 'down.success.log',
        error: 'down.error.log'
      }
    },
    mongodb: {
      url: 'mongodb://localhost:27017',
      databaseName: 'test',
      options: {
        useNewUrlParser: true
      }
    },
    defaultTemplate: 'basic'
  };
};
`;