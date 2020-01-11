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

function viewSalesByDept(){
    var query = "SELECT departments.department_id, departments.department_name, " +
    "FORMAT(departments.over_head_costs, 2) AS over_head, FORMAT(SUM(products.product_sales), 2) AS product_sales, "+
    "FORMAT((SUM(products.product_sales) - departments.over_head_costs), 2) AS total_profit FROM departments LEFT JOIN "+
    "products ON departments.department_id=products.department_id GROUP BY departments.department_id"
    connection.query(query, function(err, res){
        if (err) throw err;
        const table = cTable.getTable(res);
        
        console.log(table);
        runBamazonSupervisor();
        
    });
}

function createDept(){
    inquirer.prompt([
        {
            message: "Enter the new department name.",
            name: "deptName"
        },
        {
            message: "Enter the overhead costs associated with this department.",
            name: "overhead",
            validate: function(input){
                if (isNaN(input)){
                    throw "Please enter a number."
                }
                return true;
            }
        }
    ]).then(function(ans){
        var query = "INSERT INTO departments SET ?";
        connection.query(query, {department_name: ans.deptName, over_head_costs: ans.overhead}, function(err, res){
            if (err) throw err;
            console.log("New department added successfully.")
            runBamazonSupervisor();
        });
    });

}