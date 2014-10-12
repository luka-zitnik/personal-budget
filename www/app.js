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
}

function MonthlyExpenses(monthlyExpenses) {
    this.monthlyExpensesList = ko.observableArray(monthlyExpenses);
}

function writeTestDBData() {
    var dbName = "DailyExpenses",
        dbVersion = 6;

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
        dbVersion = 6;

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
            db.deleteObjectStore("daily_expenses");
        }

        objectStore = db.createObjectStore("daily_expenses", {autoIncrement: true});
        objectStore.createIndex("date", "date", {unique: false});
    };

    openDBRequest.onsuccess = function (event) {
        var db = event.target.result,
            transaction = db.transaction("daily_expenses", "readonly"),
            objectStore = transaction.objectStore("daily_expenses"),
            monthlyExpenses = [],
            dailyExpenses = [];

        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;

            if (cursor) {
                dailyExpenses.push(new DailySum(cursor.value.date, cursor.value.amount));
                cursor.continue();
            }
            else {
                // No more entries
                monthlyExpenses.push(new DailyExpenses("all together", dailyExpenses));
                ko.applyBindings(new MonthlyExpenses(monthlyExpenses));
            }
        };
    };

}());