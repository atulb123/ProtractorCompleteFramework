var Excel = require('exceljs');
const mysql = require('mysql');
let Sample = function () {
    this.excelInteraction = function () {
        var arr = [];
        var workbook = new Excel.Workbook();
        var wb = new Excel.Workbook();
        const con = mysql.createConnection({
            host: 'db4free.net',
            user: 'atul123',
            password: 'India123#',
            database: 'atulluta',
            port: '3306'
        });
        workbook.xlsx.readFile("./EmployeeData.xlsx")
            .then(function () {

                let rowcount = workbook.getWorksheet("employee").rowCount;
                let colcount = workbook.getWorksheet("employee").columnCount;
                for (let i = 2; i <= rowcount; i++) {
                    arr.push([i - 2])
                    for (let j = 1; j <= colcount; j++) {
                        if (workbook.getWorksheet("employee").getRow(i).getCell(j).value != null) {
                            arr[i - 2][j - 1] = workbook.getWorksheet("employee").getRow(i).getCell(j).value + '';
                        }
                    }
                }
                console.log(arr) 
            }
            );

        let worksheet = wb.addWorksheet('employee');
        worksheet.columns = [
            { header: 'empid', key: 'empid', width: 10 },
            { header: 'name', key: 'name', width: 30 },
            { header: 'age', key: 'age', width: 10, outlineLevel: 1 },
            { header: 'executedLastTime', key: 'executedLastTime', width: 10 },
            { header: 'executedDate', key: 'executedDate', width: 30 }
        ];
        con.connect((err) => {
            if (err) throw err;

            // -> Query data from MySQL
            let rcount = 0;
            con.query("SELECT * FROM employee", function (err, employee, fields) {
                console.log(employee)
                for (;rcount< arr.length; rcount++) {
                    var row = worksheet.getRow(rcount+2);
                    row.getCell(1).value = arr[rcount][0];
                    row.getCell(2).value = arr[rcount][1];
                    row.getCell(3).value = arr[rcount][2];
                    row.getCell(4).value = arr[rcount][3];
                }
                for (let i = 0; i < employee.length; i++) {
                    let flag = 0
                    for (let j = 0; j < arr.length; j++) {
                        console.log(employee[i].empid, '===', arr[j][0], employee[i].name, '===', arr[j][1], employee[i].age, '===', arr[j][2])
                        console.log(employee[i].empid === arr[j][0], employee[i].name === arr[j][1], employee[i].age.toString() === arr[j][2].toString())
                        if (employee[i].empid === arr[j][0] && employee[i].name === arr[j][1] && employee[i].age.toString() === arr[j][2].toString()) {
                            console.log("entering flag status to 1")
                            flag = 1;
                            break;
                        }
                    }
                    if (flag == 0) {
                        var row = worksheet.getRow(rcount+2);
                        row.getCell(1).value = employee[i].empid;
                        row.getCell(2).value = employee[i].name;
                        row.getCell(3).value = employee[i].age.toString();
                        row.getCell(4).value = 'NO';
                        rcount++;
                    }

                }
                // Write to File
                wb.xlsx.writeFile("./EmployeeData.xlsx")
                    .then(function () {
                        console.log("file saved!");
                    });
                // -> Close MySQL connection
                con.end(function (err) {
                    if (err) {
                        return console.log('error:' + err.message);
                    }
                    console.log('Close the database connection.');
                });

                // -> Check 'customer.csv' file in root project folder
            });
        });
    }
}
module.exports = new Sample();