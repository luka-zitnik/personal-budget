function writeTestDBData() {
    var dbName = "DailyExpenditures",
        dbVersion = 1;

    window.indexedDB.open(dbName, dbVersion).onsuccess = function (event) {

        var db = event.target.result,
            transaction = db.transaction("daily_expenditures", "readwrite"),
            data = [
                {
                    date: "2014-10-10",
                    label: "lunch",
                    value: 420.00
                },
                {
                    date: "2014-10-08",
                    label: "lunch",
                    value: 390.00
                },
                {
                    date: "2014-10-07",
                    label: "lunch",
                    value: 420.00
                },
                {
                    date: "2014-09-07",
                    label: "lunch",
                    value: 1100.00
                },
                {
                    date: "2014-09-07",
                    label: "dinner",
                    value: 77.00
                }
            ],
            objectStore = transaction.objectStore("daily_expenditures"),
            request,
            i;

        for (i = 0; i < data.length; ++i) {
            request = objectStore.add(data[i]);
        }
    };
}
