# Checkout System

TypeScript project showcasing the checkout system. The `Cart` class allows you to add promotional rules, scan items
and get the final amount. This is a mock system of how TIL works in stores when you do self-checkout.

### Pre-requisites:

1. [nvm](https://github.com/nvm-sh/nvm)
2. [Node.js](https://nodejs.org/en/)

### How to run the code?

1. Clone this repo and `cd` into the folder.
2. Run `nvm use` or ensure you're on Nodejs v16
3. Run `npm i` to install the dependencies
4. `npm run start:dev` will run the code with hot-reloading via nodemon.

To run the tests, you can use `npm run test:unit` command.
<br>

### Architecture

There are couple of interfaces allowing flexibility to have different types of product
and the features. Every product is unique but the most common thing across them is their
name, amount and a unique reference id. A new product type can build upon the interface and can
still perform checkout operation. Moving onto the Promotion interface is very simple and with the use of enum `PromotionType` we can easily add different types of promotion in the system supports and the class implementing the interface can implement it's own logic.

Now moving to the `models` directory, we have oru classes defined here. The most important thing for a checkout system is the ability to scan a product. So, we will first discuss about the `Product` model. This class is very simple with generic behaviour. I have implemented a setter for `amount` which prevents setting a negative amount accidentally for a product and preventing the system from behaving differently. This concept is taken forward to `Promotion` class as well and is added to most the memeber variables. This ensures an instance of promotion is valid and the checkout system isn't responsible for validating the `Promotion` model and can solely do it's own operations. By default the instance of promotion class has `NONE` promotion type. This helps us to safely disable an existing promotion add more functionalities without affecting existing cart.

The decision to have an abstract `Cart` class instead of an `interface` was to prevent the members outside the class manipulating the `gross` and `net` amount. These values must be computed by the `Cart` class based on the rules and should be read-only for other systems. By having an abstract class implement this logic, a web checkout cart doesn't have to implement this logic again. The `Cart` class has the main logic of computing gross value, applying promotions (if any) and allowins us to read the gross and net value. Currently, upon every scan ,the sytem performs the computation of promotions. This works fine for a smaller product/promotion/user base. But this doesn't scale up when we've many products in our system. If this was connected with a UI (Web/Mobile/Touch Device) a button / user action to checkout would compute the promotions and show the `net amount` which user has to pay. Prior to that the operation would be very simple, just add the amount of every product the user has scanned to the `gross amount`.

In the `Cart` class, the `basket` is implemented with `Map` datastructure. This was done because, the user can add multiple products of same productId (unique reference id in our database). If we were storing this in an Array Datastructure, then during promotions it would become tedious to identify the number of products of same type. By using `Map` we have simplified the storage and retrival process.

The logic for applying promotion based on a specific productId's quantity is straightforward and if the conditions are met, then the overall amount is subtracted from the `net`. The discount applied on the entire bill if the bill amount is above a certain value. To ensure the customers can get the maximum possible discount. The system chooses the best discount a customer will get and apply only that. The customer cannot combine multiple `PERCENTAGE` based discount as this prevents customer from using every promotion in a single transaction and bringing the customer back in future for more transactions.

Note: The amount is rounded to 2 decimal places.
