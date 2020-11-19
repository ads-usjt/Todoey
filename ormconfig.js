if(process.env.NODE_ENV == 'production') {
  module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": [
      "./src/models/*.js"
    ]
  }
} else {
  module.exports = {
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "entities": [
      "./src/models/*.ts"
    ]
  }
}