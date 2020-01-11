var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "2hearts",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Welcome Bamazon supervisor! You are connected to the inventory database.  \n`)
    runBamazonSupervisor();
});

function runBamazonSupervisor(){
    console.log("");
    inquirer.prompt([
        {
            message: "Choose from the following options:",
            name: "supervisorTask",
            type: "list",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        }
    ]).then(function (ans) {
        switch (ans.supervisorTask) {
            case "View Product Sales by Department":
                viewSalesByDept();
                break;
            case "Create New Department":
                createDept();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });
}