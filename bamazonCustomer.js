var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2hearts",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to Bamazon! Here are our available goods for today today.")
    runBamazon();
  });

  function runBamazon(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        res.forEach(e => {
            console.log(`Item ID: ${e.item_id}
Product name: ${e.product_name}
Department: ${e.department_name}
Price: $${e.price.toFixed(2)}
*******************`);
        });
    });

  }

