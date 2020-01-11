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
    console.log(`Welcome Bamazon manager! You are connected to the inventory database.  \n`)
    runBamazonManager();
});

function runBamazonManager() {

    inquirer.prompt([
        {
            message: "Choose from the following options:",
            name: "managerTask",
            type: "list",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }
    ]).then(function (ans) {
        switch (ans.managerTask) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
                break;
            case "exit":
                connection.end();
                break;
        }
    });
}

function viewProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        if (err) throw err;
        res.forEach(e => {
            console.log(`*****************************
Item ID: ${e.item_id}
Product name: ${e.product_name}
Department: ${e.department_name}
Price: $${e.price.toFixed(2)}
Stock Quantity: ${e.stock_quantity}`);           
        });
       runBamazonManager();
    });
    
}

function viewLowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 3";
    connection.query(query, function(err, res){
        if (err) throw err;
        res.forEach(e => {
            console.log(`*****************************
Item ID: ${e.item_id}
Product name: ${e.product_name}
Department: ${e.department_name}
Price: $${e.price.toFixed(2)}
Stock Quantity: ${e.stock_quantity}`)
        });
        runBamazonManager();
    });
    

}

function addToInventory() {
    
    
}

function addNewProduct() {

}

