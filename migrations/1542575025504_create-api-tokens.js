exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('api_tokens', {
    id: 'id',
    token: { type: 'varchar(50)', notNull: true },
    revoked: { type: 'boolean', default: false },
  });
};
