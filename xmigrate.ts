export default async () => {
  return {
    defaultTemplate: 'typescript',
    outDir: './.xmigrate',
    typescript: true,
    builder: 'esbuild',
    // dateTimeFormat: () => new Date().toISOString(),
    mongodb: {
      url: 'mongodb://localhost:27017',
      databaseName: 'test',
      options: {
        useNewUrlParser: true,
      },
    },
  };
};
