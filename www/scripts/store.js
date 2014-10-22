var store = {

    dbName: "DailyExpenses",
    dbVersion: 1,
    storeName: "daily_expenses",

    each: function (aggregatorCallback, doneCallback) {

        var self = this,
            openDBRequest;

        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.");
            return;
        }

        openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

        openDBRequest.onerror = this.dbErrorHandler;

        openDBRequest.onupgradeneeded = this.dbUpgradeNeededHandler.bind(this);

        openDBRequest.onsuccess = function (event) {
            var db = event.target.result,
                transaction = db.transaction(self.storeName, "readonly"),
                objectStore = transaction.objectStore(self.storeName),
                aggregatedStoreValues = {};

            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;

                if (cursor) {
                    aggregatorCallback(aggregatedStoreValues, cursor.value);
                    cursor.continue();
                }
                else {

                    // No more entries
                    doneCallback(aggregatedStoreValues);
                }
            };
        };

    },

    insert: function (storeValue) {
        var self = this,
            openDBRequest;

        openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

        openDBRequest.onerror = this.dbErrorHandler;

        openDBRequest.onsuccess = function (event) {
            var db = event.target.result,
                transaction = db.transaction(self.storeName, "readwrite"),
                objectStore = transaction.objectStore(self.storeName);

            objectStore.add(storeValue);
        };
    },

    dbErrorHandler: function (event) {
        window.alert(event.target.error.message);
    },

    dbUpgradeNeededHandler: function (event) {
        var db = event.target.result,
            objectStore;

        objectStore = db.createObjectStore(this.storeName, {autoIncrement: true});
        objectStore.createIndex("date", "date", {unique: false});
    }
};