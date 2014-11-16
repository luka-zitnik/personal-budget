var dailyList = {

    date: ko.observable(),
    expendituresList: ko.observableArray(),
    containerNode: document.getElementById("daily-list-view"),
    state: ko.observable("list"), // "list" or "edit"

    open: function(date) {
        this.date(date);
        this.containerNode.setAttribute("aria-hidden", "false");
        store.ieach(IDBKeyRange.only(date), this.each.bind(this));
    },

    each: function(previous, current, key) {
        this.expendituresList.push(new Expenditure(
            current.date,
            current.value,
            current.label,
            key
        ));
    },

    close: function() {
        this.containerNode.setAttribute("aria-hidden", "true");
        this.expendituresList().length = 0;
    },

    deleteExpenditures: function() {
        var i = this.expendituresList().length;

        while (i--) {
            if (this.expendituresList()[i].markedForDeletion() === true) {
                store.delete(this.expendituresList()[i].key);
                this.expendituresList.splice(i, 1);
            }
        }

        this.state("list");
        monthlyExpenditures.list();
    }

};