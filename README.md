# storefront

Storefront is a Node CLI interface app simulating an online store. It has three parts, divided into a customer interface for shopping, a manager interface for inventory assessment and updates, and a supervisor segment that allows for a more complex view of sales by department. The inventory is stored in a SQL database.

## Tech/framework used

Storefront is written in JavaScript and uses Node.js runtime environment to support a command line application. The database is MySQL accessed through node using a package called mysql. Other npm packages used are Inquirer for user prompts at the command line and console.table for outputting the supervisor table nicely on the console. 

## Installation

Since this is a CLI app there is no link to a deployed project. You will need to install this on your computer. 

First clone the github repository to your computer. Then in the terminal of the root directory type:
>npm i

That will grab the information on the libraries required from the package.json and install them. Run in terminal: 
>node bamazonCustomer.js  

>node bamazonManager.js

>node bamazonSupervisor.js

depending on which application segment you wish to access. 

## How to use

**Customer**

Initially the full list of products are displayed. 

![list](https://user-images.githubusercontent.com/23327932/72213806-2ea6f600-34aa-11ea-8214-1dcfcefc8d71.jpg)


Follow the prompts to enter the item id and the quanity to purchase. The order will either be processed, or a notification will appear that the stock quanity is too low.


![buying](https://user-images.githubusercontent.com/23327932/72213815-50a07880-34aa-11ea-8c0c-0fc5cc91cd33.gif)

**Manager**

The menu for the manager view allows viewing products for sale including stock quantity and department id. 


![mgrview](https://user-images.githubusercontent.com/23327932/72213821-70d03780-34aa-11ea-9754-f24b666f30c3.gif)


There are also options for viewing low inventory items (items with less than 5 in stock), and adding inventory. 

![mgrlowstock](https://user-images.githubusercontent.com/23327932/72213822-80e81700-34aa-11ea-9520-96078b305203.gif)

To add inventory, enter the item id followed by the amount of inventory being added. Current stock total will be added automatically using the current inventory in the database and the number provided to add. 

![mgrupdateinventory](https://user-images.githubusercontent.com/23327932/72213828-9b21f500-34aa-11ea-957f-a67d7a6a098a.gif)

Adding new product is the final menu option. Follow prompts to enter required information. All fields MUST be filled to successfully add a product to the database. 

![mgraddnew](https://user-images.githubusercontent.com/23327932/72213840-bc82e100-34aa-11ea-9344-37ccdbf5a095.gif)


**Supervisor**

The supervisor menu allows creation of a new department when needed, and a view of all aggregate product sales by department. When viewing this table, a total profit field is visible showing where each department is currently after accounting for department overhead costs. 

![supercreate](https://user-images.githubusercontent.com/23327932/72213845-cdcbed80-34aa-11ea-936a-733c9b62f2fd.gif)

![superview](https://user-images.githubusercontent.com/23327932/72213847-d0c6de00-34aa-11ea-8d61-8a417f1bb768.gif)


## Motivation

My role in the development of this app was to code it and write the readme.md. I did this to learn and grow my Node and SQL skills and to improve my writing of readme files. 

## Credits 

NPM libraries: mysql, console.table, inquirer
