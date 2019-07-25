declare const _default: "\nmodule.exports = {\n  async up (db) {\n    await db\n      .collection('albums')\n      .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: true } })\n    await db\n      .collection('albums')\n      .updateOne({ artist: 'The Doors' }, { $set: { stars: 5 } })\n  },\n\n  async down (db) {\n    await db\n      .collection('albums')\n      .updateOne({ artist: 'The Doors' }, { $set: { stars: 0 } })\n    await db\n      .collection('albums')\n      .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } })\n  }\n}\n";
export default _default;
