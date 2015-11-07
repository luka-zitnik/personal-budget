var dailyList = {

    date: ko.observable(),
    recordsList: ko.observableArray(),
    containerNode: document.getElementById("daily-list-view"),
    state: ko.observable("list"), // "list" or "edit"

    open: function(date) {
        this.date(date);
        this.containerNode.setAttribute("aria-hidden", "false");
        store.ieach(IDBKeyRange.only(date), this.each.bind(this));
    },

    each: function(previous, current, key) {
        this.recordsList.push(new Record(
            current.date,
            current.value,
            current.label,
            key
        ));
    },

    close: function() {
        this.containerNode.setAttribute("aria-hidden", "true");
        this.recordsList().length = 0;
    },

    deleteRecords: function() {
        var i = this.recordsList().length;

        while (i--) {
            if (this.recordsList()[i].markedForDeletion() === true) {
                store.delete(this.recordsList()[i].key);
                this.recordsList.splice(i, 1);
            }
        }

        this.state("list");
        monthlyRecords.list();
    }

};
