var App = {

    dbName: "DailyExpenses",
    dbVersion: 7,

    initialize: function () {

        var self = this,
            openDBRequest;

        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.");
            return;
        }

        openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

        openDBRequest.onerror = this.dbErrorHandler;

        openDBRequest.onupgradeneeded = this.dbUpgradeNeededHandler;

        openDBRequest.onsuccess = function (event) {
            var db = event.target.result,
                transaction = db.transaction("daily_expenses", "readonly"),
                objectStore = transaction.objectStore("daily_expenses"),
                aggregatedStoreValues = {};

            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;

                if (cursor) {
                    self.aggregateStoreValues(aggregatedStoreValues, cursor.value);
                    cursor.continue();
                }
                else {

                    // No more entries
                    self.translateStoreValuesToDailyExpenses(aggregatedStoreValues);
                }
            };
        };

    },

    aggregateStoreValues: function (aggregatedStoreValues, storeValue) {
        var month = storeValue.date.substring(0, 7),
            date = storeValue.date,
            amount = storeValue.amount;

        aggregatedStoreValues[month] || (aggregatedStoreValues[month] = {});

        if (aggregatedStoreValues[month][date]) {
            aggregatedStoreValues[month][date] += amount;
        }
        else {
            aggregatedStoreValues[month][date] = amount;
        }
    },

    translateStoreValuesToDailyExpenses: function (aggregatedStoreValues) {
        var monthlyExpenses = [],
            dailyExpenses = [],
            monthIndex,
            dateIndex;

        for (monthIndex in aggregatedStoreValues) {
            dailyExpenses = [];
            for (dateIndex in aggregatedStoreValues[monthIndex]) {
                dailyExpenses.push(new DailySum(dateIndex, aggregatedStoreValues[monthIndex][dateIndex]));
            }
            monthlyExpenses.push(new DailyExpenses(monthIndex, dailyExpenses));
        }

        ko.applyBindings(new MonthlyExpenses(monthlyExpenses));
    },

    dbErrorHandler: function (event) {
        window.alert(event.target.error.message);
    },

    dbUpgradeNeededHandler: function (event) {
        var db = event.target.result,
            objectStore;

        if (event.oldVersion !== 0) {

            // It wasn't possible to work with data, so just delete
            db.deleteObjectStore("daily_expenses");
        }

        objectStore = db.createObjectStore("daily_expenses", {autoIncrement: true});
        objectStore.createIndex("date", "date", {unique: false});
    }
};

App.initialize();