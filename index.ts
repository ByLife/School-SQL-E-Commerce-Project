import { client } from "./src/app"

client.log()
client.database.generateAll(100)

/*

 Small Doc:
  DATABASE:
    client.database.generateAll(100) will generate 100 users, 100 products, 100 addresses, 100 invoices, 100 products rating, 100 users cart, 100 users commands, 100 users payment

    client.database.injectUsers(100) will generate 100 users
    client.database.injectProducts(100) will generate 100 products
    client.database.injectAddresses(100) will generate 100 addresses
    client.database.injectInvoices(100) will generate 100 invoices
    client.database.injectProductsRating(100) will generate 100 products rating
    client.database.injectUsersCommands(100) will generate 100 users commands
    client.database.injectUsersPayment(100) will generate 100 users payment
    client.database.injectUsersCart(100) will generate 100 users cart
    client.database.injectUsersAddress() will generate for every users 1 address

    client.database.getclient.database() will return the client.database
    client.database.selectRandomUser() will return a random user
    client.database.selectRandomProduct() will return a random product
 INFO:
    client.info.name will return the client.database name
    client.info.version will return the client.database version
    client.info.description will return the client.database description
 LOG:
    client.log() will log the client.database info
*/