import { faker} from "@faker-js/faker"
import { DB_Manager } from "./class.database"
import { User, Product, User_Address, Invoices, Products_Rating, Users_Cart, Users_Commands, Users_Payment } from "./interfaces.database"

const db = new DB_Manager();

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function createRandomUser(): User{
    return {
        name: faker.name.firstName() + " " + faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        created_at: faker.date.past()
    }
}

export function createRandomProduct() : Product {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        created_at: faker.date.past()
    }
}

export function createRandomAdress(user_id: number) : User_Address {
    return {
        user_id,
        street: faker.address.street(),
        number: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        zip_code: faker.address.zipCode()
    }
}

export function createRandomInvoice(user_id: number, product_id: number): Invoices {
    return {
        user_id,
        product_id,
        quantity: getRandomInt(10),
        created_at: faker.date.past()
    }
}

export function createRandomProductRating(user_id: number, product_id: number): Products_Rating {
    return {
        user_id,
        product_id,
        rating: getRandomInt(5),
        created_at: faker.date.past()
    }
}

export function createRandomUsersCart(user_id: number, product_id: number): Users_Cart {
    return {
        user_id,
        product_id,
        quantity: getRandomInt(10)
    }
}

export function createRandomUsersCommands(user_id: number, product_id: number): Users_Commands {
    return {
        user_id,
        product_id,
        quantity: getRandomInt(10),
        created_at: faker.date.past()
    }
}

export function createRandomUsersPayment(card_name: string): Users_Payment {
    return {
        user_id: 0,
        card_number: faker.finance.creditCardNumber(),
        card_name,
        card_expiration: getRandomInt(12) + "/" + getRandomInt(30),
        card_cvv: faker.finance.creditCardCVV(),
        created_at: faker.date.past()
    }
}

export class DB_Injection extends DB_Manager{
    constructor() {
        super();
        this.createTableFromConfig();
    }

    public async selectRandomUser(): Promise<User | null> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM users ORDER BY RANDOM() LIMIT 1`, (err, row) => {
                if(err) reject(err);
                resolve(row);
            })
        })
    }

    public async selectRandomProduct(): Promise<Product | null> {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM products ORDER BY RANDOM() LIMIT 1`, (err, row) => {
                if(err) reject(err);
                resolve(row);
            })
        })
    }

    public injectUsers(amount: number): void {
        for(let i = 0; i < amount; i++) {
            let user = createRandomUser();
            this.db.exec(`INSERT INTO users (name, email, password, created_at) VALUES ("${user.name}", "${user.email}", "${user.password}", "${user.created_at}")`);
        }
    }

    public injectProducts(amount: number): void {
        for(let i = 0; i < amount; i++) {
            let product = createRandomProduct();
            this.db.exec(`INSERT INTO products (name, description, price, created_at) VALUES ("${product.name}", "${product.description}", "${product.price}", "${product.created_at}")`);
        }
    }

    public injectUsersAddress(): void {
        this.db.all("SELECT * FROM users", (err, rows) => {
            if(err) throw err;
            rows.forEach(row => {
                this.injectUsersAdrr(createRandomAdress(row.id));
            })
        })
    }

    public injectInvoices(amount: number): void {
        for(let i = 0; i < amount; i++) {
            this.selectRandomUser().then((user) => {
                this.selectRandomProduct().then((product) => {
                    if(user && product) {
                        var invoices: Invoices = createRandomInvoice(user.id as number, product.id as number);
                        this.db.exec(`INSERT INTO invoices (user_id, product_id, quantity, created_at) VALUES ("${invoices.user_id}", "${invoices.product_id}", "${invoices.quantity}", "${invoices.created_at}")`);
                    }
                })
            })
        }
    }

    public injectProductsRating(amount: number) {
        for(let i = 0; i < amount; i++) {
            this.selectRandomUser().then((user) => {
                this.selectRandomProduct().then((product) => {
                    if(user && product) {
                        var rating: Products_Rating = createRandomProductRating(user.id as number, product.id as number);
                        this.db.exec(`INSERT INTO products_rating (user_id, product_id, rating, created_at) VALUES ("${rating.user_id}", "${rating.product_id}", "${rating.rating}", "${rating.created_at}")`);
                    }
                })
            })
        }
    }

    public injectUsersCommands(amount: number) {
        for(let i = 0; i < amount; i++) {
            this.selectRandomUser().then((user) => {
                this.selectRandomProduct().then((product) => {
                    if(user && product) {
                        var command: Users_Commands = createRandomUsersCommands(user.id as number, product.id as number);
                        this.db.exec(`INSERT INTO users_commands (user_id, product_id, quantity, created_at) VALUES ("${command.user_id}", "${command.product_id}", "${command.quantity}", "${command.created_at}")`);
                    }
                })
            })
        }
    }

    public injectUsersPayment(amount: number) {
        for(let i = 0; i < amount; i++) {
            this.selectRandomUser().then((user) => {
                if(user) {
                    var payment: Users_Payment = createRandomUsersPayment(user.name);
                    this.db.exec(`INSERT INTO users_payment (user_id, card_number, card_name, card_expiration, card_cvv, created_at) VALUES ("${user.id}", "${payment.card_number}", "${payment.card_name}", "${payment.card_expiration}", "${payment.card_cvv}", "${payment.created_at}")`);
                }
            })
        }
    }

    public injectUsersCart(amount: number) {
        for(let i = 0; i < amount; i++) {
            this.selectRandomUser().then((user) => {
                this.selectRandomProduct().then((product) => {
                    if(user && product) {
                        var cart: Users_Cart = createRandomUsersCart(user.id as number, product.id as number);
                        this.db.exec(`INSERT INTO users_cart (user_id, product_id, quantity) VALUES ("${cart.user_id}", "${cart.product_id}", "${cart.quantity}")`);
                    }
                })
            })
        }
    }

    public generateAll(amount: number): void{
        this.injectUsers(amount);
        this.injectProducts(amount);
        this.injectUsersAddress();
        this.injectInvoices(amount);
        this.injectProductsRating(amount);
        this.injectUsersCommands(amount);
        this.injectUsersPayment(amount);
        this.injectUsersCart(amount);
    }
            

    public injectUsersAdrr(Data: User_Address): void {
        this.db.exec(`INSERT INTO users_adress (user_id, street, number, city, state, country, zip_code) VALUES ("${Data.id}", "${Data.street}", "${Data.number}", "${Data.city}", "${Data.state}", "${Data.country}", "${Data.zip_code}")`);
    }
}