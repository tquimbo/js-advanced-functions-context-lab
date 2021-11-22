/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
 let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(array){
    return array.map(array => createEmployeeRecord(array));
}

let createTimeInEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(" ");
    let record = { 
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    };
    this.timeInEvents.push(record);
    return this;
}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(" ");
    let record = { 
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    };
    this.timeOutEvents.push(record);
    return this;
}
  
let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(record => record.date === date);
    let timeOut = this.timeOutEvents.find(record => record.date === date);
    return (timeOut.hour - timeIn.hour)/100;
}
  
let wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}
  
let findEmployeeByFirstName = function(array, name){
    return array.find(employee => employee.firstName === name);
}
  
let calculatePayroll = function(employeeArray){
    return employeeArray.reduce(function(totalPay, employee){
        return totalPay + allWagesFor.call(employee)}, 0)
}