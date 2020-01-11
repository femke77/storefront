var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2hearts",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Welcome to Bamazon! Here are our available goods for today.  \n`)
    runBamazon();
});

function runBamazon() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        res.forEach(e => {
            console.log(`Item ID: ${e.item_id}
Product name: ${e.product_name}
Price: $${e.price.toFixed(2)}
*******************`)
        });
        inquire();
    });
}

function inquire() {
    inquirer.prompt([
        {
            message: "Enter the item number of the product you wish to purchase.",
            name: "itemID",
            validate: function (name) {
                if (isNaN(name) || name < 1 || name > 10) {
                    throw "Enter a number between 1 and 10 please.";
                }
                return true;
            }
        },
        {
            message: "Enter the amount you wish to buy.",
            name: "quantity",
            validate: function(name){
                if (isNaN(name)){
                    throw "Enter a number please."
                }
                return true;
            }
        }
    ]).then(function(ans) {
        processOrder(ans);
    })
}

function processOrder(ans){

    var query = "SELECT stock_quantity, price FROM products WHERE ?"
    connection.query(query, {item_id: ans.itemID}, function(err, res){
        if (err) throw err;
        if (ans.quantity > res[0].stock_quantity){
            console.log("Insufficient quantity available to process order.")
        } else {
            var remaining = res[0].stock_quantity - parseInt(ans.quantity);
            var total = res[0].price * parseInt(ans.quantity);
            query = "UPDATE products SET ? WHERE ?"
            connection.query(query, [{stock_quantity: remaining},{item_id: ans.itemID}], function(err, res){
                if (err) throw err;
                console.log(`Your order is processed and the total charged to your card is $${total.toFixed(2)}`)
            });
        }
    });
}

