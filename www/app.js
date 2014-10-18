function DailySum(date, amount) {
    this.date = date;
    this.dailySum = ko.observable(amount);
}

function DailyExpenses(month, dailyExpenses) {
    var self = this;

    this.dailyExpensesList = ko.observableArray(dailyExpenses);

    this.monthlySum = ko.computed(function () {
        var i = 0,
            sum = 0;

        for (var i = 0; i < self.dailyExpensesList().length; ++i) {
            sum += self.dailyExpensesList()[i].dailySum();
        }

        return sum;
    });

    this.month = month;

    this.updateDailyExpensesList = function (date, amount) {
        var dailySum = this.findDailySum(date);

        if ((dailySum instanceof DailySum) === false) {
            dailySum = new DailySum(date, amount);
            this.dailyExpensesList.push(dailySum);
        }
        else {
            dailySum.dailySum(dailySum.dailySum() + amount);
        }
    };

    this.findDailySum = function (date) {
        var list = this.dailyExpensesList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].date === date) {
                return list[i];
            }
        }

        return null;
    };
}

function MonthlyExpenses(monthlyExpenses) {
    this.monthlyExpensesList = ko.observableArray(monthlyExpenses);

    this.addExpense = function () {
        var form = document.getElementById("add-expense-view").querySelector("form"),
            formElements = form.elements,
            label = formElements.label.value,
            date = formElements.date.value,
            month = date.substring(0, 7),
            amount = parseFloat(formElements.amount.value);

        if (form.checkValidity() === false) {
            return;
        }

        this.closeAddExpenseView();
        this.updateMonthlyExpensesList(month, date, amount);
        this.persistIntoDB(date, label, amount);
    };

    this.updateMonthlyExpensesList = function (month, date, amount) {
        var dailyExpenses = this.findDailyExpenses(month);

        if ((dailyExpenses instanceof DailyExpenses) === false) {
            dailyExpenses = new DailyExpenses(month, []);
            this.monthlyExpensesList.push(dailyExpenses);
        }

        dailyExpenses.updateDailyExpensesList(date, amount);
    };

    this.findDailyExpenses = function (month) {
        var list = this.monthlyExpensesList(),
            i = 0;

        for (; i < list.length; ++i) {
            if (list[i].month === month) {
                return list[i];
            }
        }

        return null;
    };

    this.persistIntoDB = function (date, label, amount) {

    };

    this.openAddExpenseView = function () {
        document.getElementById("add-expense-view").setAttribute("aria-hidden", "false");
    };

    this.closeAddExpenseView = function () {
        document.getElementById("add-expense-view").setAttribute("aria-hidden", "true");
    };
}

function writeTestDBData() {
    var dbName = "DailyExpenses",
        dbVersion = 7;

    window.indexedDB.open(dbName, dbVersion).onsuccess = function (event) {

        var db = event.target.result,
            transaction = db.transaction("daily_expenses", "readwrite"),
            data = [
                {
                    date: "2014-10-10",
                    label: "lunch",
                    amount: 420.00
                },
                {
                    date: "2014-10-08",
                    label: "lunch",
                    amount: 390.00
                },
                {
                    date: "2014-10-07",
                    label: "lunch",
                    amount: 420.00
                },
                {
                    date: "2014-09-07",
                    label: "lunch",
                    amount: 1100.00
                },
                {
                    date: "2014-09-07",
                    label: "dinner",
                    amount: 77.00
                }
            ],
            objectStore = transaction.objectStore("daily_expenses"),
            request,
            i;

        for (i = 0; i < data.length; ++i) {
            request = objectStore.add(data[i]);
        }
    };
}

(function () {

    var openDBRequest,
        dbName = "DailyExpenses",
        dbVersion = 7;

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.");
        return;
    }

    openDBRequest = window.indexedDB.open(dbName, dbVersion);

    openDBRequest.onerror = function (event) {
        window.alert(event.target.error.message);
    };

    openDBRequest.onupgradeneeded = function (event) {
        var db = event.target.result,
            objectStore;

        if (event.oldVersion !== 0) {

            // It wasn't possible to work with data, so just delete
            db.deleteObjectStore("daily_expenses");
        }

        objectStore = db.createObjectStore("daily_expenses", {autoIncrement: true});
        objectStore.createIndex("date", "date", {unique: false});
    };

    openDBRequest.onsuccess = function (event) {
        var db = event.target.result,
            transaction = db.transaction("daily_expenses", "readonly"),
            objectStore = transaction.objectStore("daily_expenses"),
            dailyExpensesHash = {};

        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result,
                monthlyExpenses = [],
                dailyExpenses = [],
                month,
                date,
                amount,
                monthIndex,
                dateIndex;

            if (cursor) {
                month = cursor.value.date.substring(0, 7);
                date = cursor.value.date;
                amount = cursor.value.amount;

                dailyExpensesHash[month] || (dailyExpensesHash[month] = {});

                if (dailyExpensesHash[month][date]) {
                    dailyExpensesHash[month][date] += amount;
                }
                else {
                    dailyExpensesHash[month][date] = amount;
                }

                cursor.continue();
            }
            else {

                // No more entries
                for (monthIndex in dailyExpensesHash) {
                    dailyExpenses = [];
                    for (dateIndex in dailyExpensesHash[monthIndex]) {
                        dailyExpenses.push(new DailySum(dateIndex, dailyExpensesHash[monthIndex][dateIndex]));
                    }
                    monthlyExpenses.push(new DailyExpenses(monthIndex, dailyExpenses));
                }

                ko.applyBindings(new MonthlyExpenses(monthlyExpenses));
            }
        };
    };

}());