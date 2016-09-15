exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                         'mongodb://robbyben:connect4@ds033056.mlab.com:33056/connect-four' :
                         'mongodb://robbyben:connect4@ds033056.mlab.com:33056/connect-four');

exports.PORT = process.env.PORT || 8080;
