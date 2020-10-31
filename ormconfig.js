if(process.env.NODE_ENV == 'development'){
  module.exports = {
    "type": "sqlite",
    "database": "./src/database/database.sqlite",
    "migrations": [
      "./src/database/migrations/*.ts"
    ],
    "entities": [
      "./src/models/*.ts"
    ],
    "cli": {
      "migrationsDir": "./src/database/migrations"
    }
  }
} else {
    module.exports = {
      "type": "postgres",
      "url": process.env.DATABASE_URL,
      "migrations": [
        "./src/database/migrations/*.ts"
      ],
      "entities": [
        "./src/models/*.ts"
      ],
      "cli": {
        "migrationsDir": "./src/database/migrations"
      }
    }
}