function writeTestDBData() {
    var dbName = "DailyExpenses",
        dbVersion = 1;

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
