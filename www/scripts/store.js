var store = {

    dbName: "Personal Budget",
    dbVersion: 1,
    storeName: "records",

    checkSupport: function() {
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.");
            return false;
        }

        return true;
    },

    each: function (aggregatorCallback, doneCallback) {

        var self = this,
            openDBRequest;

        if (this.checkSupport() === false) {
            return;
        }

        openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

        openDBRequest.onerror = this.dbErrorHandler;

        openDBRequest.onupgradeneeded = function (event) {
            self.dbUpgradeNeededHandler(event, this);
        };

        openDBRequest.onsuccess = function (event) {
            var db = event.target.result,
                transaction = db.transaction(self.storeName, "readonly"),
                objectStore = transaction.objectStore(self.storeName),
                aggregatedStoreValues = {};

            objectStore.openCursor().onsuccess = function (event) {
                var cursor = event.target.result;

                if (cursor) {
                    aggregatorCallback(aggregatedStoreValues, cursor.value, cursor.primaryKey);
                    cursor.continue();
                }
                else {
                    if (doneCallback === undefined) {
                        return;
                    }

                    doneCallback(aggregatedStoreValues);
                }
            };
        };

    },

    ieach: function(range, aggregatorCallback, doneCallback) {
        var self = this,
            openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

        openDBRequest.onerror = this.dbErrorHandler;

        openDBRequest.onsuccess = function(event) {
            var db = event.target.result,
                transaction = db.transaction(self.storeName),
                objectStore = transaction.objectStore(self.storeName),
                index = objectStore.index("date"), // There's only one index for now
                aggregatedStoreValues = {};

            index.openCursor(range).onsuccess = function(event) {
                var cursor = event.target.result;

                if (cursor) {
                    aggregatorCallback(aggregatedStoreValues, cursor.value, cursor.primaryKey);
                    cursor.continue();
                }
                else {
                    if (doneCallback === undefined) {
                        return;
                    }

                    doneCallback(aggregatedStoreValues);
                }
            };
        };
    },

    delete: function(storeKey) {
        var self = this,
            openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

        openDBRequest.onerror = this.dbErrorHandler;

        openDBRequest.onsuccess = function(event) {
            var db = event.target.result,
                transaction = db.transaction(self.storeName, "readwrite"),
                objectStore = transaction.objectStore(self.storeName);

            objectStore.delete(storeKey);
        };
    },

    add: function (storeValues, doneCallback) {
        var self = this,
            openDBRequest;

        if (this.checkSupport() === false) {
            return;
        }

        openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

        openDBRequest.onerror = this.dbErrorHandler;

        openDBRequest.onsuccess = function (event) {
            var db = event.target.result,
                transaction = db.transaction(self.storeName, "readwrite"),
                objectStore = transaction.objectStore(self.storeName),
                i = 0,
                limit;

            if (storeValues instanceof Array === false) {
                storeValues = [storeValues];
            }

            limit = storeValues.length;

            for (; i < limit; ++i) {
                objectStore.add(storeValues[i]);
            }

            doneCallback();
        };
    },

    dbErrorHandler: function (event) {
        window.alert(event.target.error.message);
    },

    dbUpgradeNeededHandler: function (event, originalRequest) {
        var self = this,
            db = event.target.result,
            successHandler = originalRequest.onsuccess,
            objectStore;

        originalRequest.onsuccess = null;

        function exportOldExpendituresStore (doneCallback) {
            var openDBRequest = window.indexedDB.open("Expenditures", 1);

            openDBRequest.onerror = self.dbErrorHandler;

            openDBRequest.onsuccess = function (event) {
                var db = event.target.result,
                    transaction,
                    objectStore,
                    aggregatedStoreValues;

                if (db.objectStoreNames.length === 0) {
                    return;
                }

                transaction = db.transaction("expenditures", "readonly");
                objectStore = transaction.objectStore("expenditures");
                aggregatedStoreValues = [];

                objectStore.openCursor().onsuccess = function (event) {
                    var cursor = event.target.result;

                    if (cursor) {
                        cursor.value.value *= -1;
                        aggregatedStoreValues.push(cursor.value);
                        cursor.continue();
                    }
                    else {
                        doneCallback(aggregatedStoreValues);
                    }
                };
            };
        }

        function completeAction () {
            var openDBRequest = window.indexedDB.open(self.dbName, self.dbVersion);
            openDBRequest.onerror = self.dbErrorHandler;
            openDBRequest.onsuccess = successHandler;
        }

        objectStore = db.createObjectStore(self.storeName, {autoIncrement: true});
        objectStore.createIndex("date", "date", {unique: false});
        objectStore.transaction.oncomplete = function () {
            exportOldExpendituresStore(function (storeValues) {
                self.add(storeValues, function () {
                    completeAction();
                    window.indexedDB.deleteDatabase("Expenditures");
                });
            });
        };

    },

	clear: function () {
		if(confirm("Are you sure you really want to delete all records?")) {
			var self = this,
				openDBRequest = window.indexedDB.open(this.dbName, this.dbVersion);

			openDBRequest.onerror = this.dbErrorHandler;

			openDBRequest.onsuccess = function(event) {
				var db = event.target.result,
					transaction = db.transaction(self.storeName, "readwrite"),
					objectStore = transaction.objectStore(self.storeName);

				objectStore.clear();
			};
		}
	}
};
