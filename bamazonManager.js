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
                "View Low inventory",
                "Add to Inventory",
                "Add New Product"
            ]
        }


    ]).then(function (name) {
        switch (name) {
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

}

function viewLowInventory() {

}

function addToInventory() {
    
}

function addNewProduct() {

}

