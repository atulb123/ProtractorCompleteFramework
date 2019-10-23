const mysql = require('mysql');
const excel = require('exceljs');

// Create a connection to the database
function test()
{
const con = mysql.createConnection({
    host     : 'db4free.net',
    user     : 'atul123',
    password : 'India123#',
    database : 'atulluta',
    port:'3306'
});
con.connect((err) => {
	if (err) throw err;
 
	// -> Query data from MySQL
	con.query("SELECT * FROM employee", function (err, employee, fields) {
		
		
        let workbook = new excel.Workbook(); //creating workbook
		let worksheet = workbook.addWorksheet('employee'); //creating worksheet
	 
		//  WorkSheet Header
		worksheet.columns = [
			{ header: 'empid', key: 'empid', width: 10 },
			{ header: 'name', key: 'name', width: 30 },
			{ header: 'age', key: 'age', width: 10, outlineLevel: 1}
		];
	 
      
     for(let i=0;i<employee.length;i++)
     {
         console.log("-->",employee[i].empid,employee[i].name,employee[i].age)
        var row = worksheet.getRow(i+2);
        row.getCell(1).value =employee[i].empid;
        row.getCell(2).value =employee[i].name;
        row.getCell(3).value =employee[i].age;
     }
		// Write to File
		workbook.xlsx.writeFile("./EmployeeData.xlsx")
		.then(function() {
			console.log("file saved!");
		});
		
		// -> Close MySQL connection
		con.end(function(err) {
		  if (err) {
			return console.log('error:' + err.message);
		  }
		  console.log('Close the database connection.');
		});
		
		// -> Check 'customer.csv' file in root project folder
    });
});
}
test()