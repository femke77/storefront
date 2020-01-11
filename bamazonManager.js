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
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res){
        if (err) throw err;
        res.forEach(e => {
            console.log(`*****************************
Item ID: ${e.item_id}
Product name: ${e.product_name}
Stock Quantity: ${e.stock_quantity}`)
        });
        runBamazonManager();
    });
    

}

function addToInventory() {
    inquirer.prompt([
        {
            message: "Enter the item id of the product for which inventory is being increased.",
            name: "itemID",
            validate: function(input) {
                if (isNaN(input)) {
                    throw "Enter a number please.";
                }
                return true;
            }
        },
        {
            message: "Enter the amount of new inventory to be added.",
            name: "newInventoryAmt",
            validate: function(input) {
                if (isNaN(input)){
                    throw "Enter a number please."
                }
                return true;
            }
        }
    ]).then(function(ans){
        var query1 = "SELECT stock_quantity FROM products WHERE ?"
        var currentStock = 0;
        connection.query(query1, {item_id: ans.itemID}, function(err, res){
            if (err) throw err;
            currentStock = res[0].stock_quantity;
            console.log(`Current stock: ${currentStock}`);
            updateStockQuant(currentStock, parseInt(ans.newInventoryAmt), parseInt(ans.itemID));           
        });       
    });    
}

function updateStockQuant(currentStock, addStock, itemID){    
    var newInventoryCount = currentStock + addStock;
    console.log(`New Inventory Amount ${newInventoryCount}`);
    var query = "UPDATE products SET ? WHERE ?"
    connection.query(query, [{stock_quantity: newInventoryCount}, {item_id: itemID}], function(err, res){
        console.log("Inventory successfully updated.")
        runBamazonManager();
    })

}


function addNewProduct() {

}

