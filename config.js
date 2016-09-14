exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                         'mongodb://localhost/connect_four' :
                         'mongodb://localhost/connect_four');

exports.PORT = process.env.PORT || 8080;
