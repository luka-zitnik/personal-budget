var dailyList = {

    date: ko.observable(),
    expensesList: ko.observableArray(),
    containerNode: document.getElementById("daily-list-view"),
    state: ko.observable("list"), // "list" or "edit"

    open: function(date) {
        this.date(date);
        this.containerNode.setAttribute("aria-hidden", "false");
        store.ieach(IDBKeyRange.only(date), this.each.bind(this));
    },

    each: function(previous, current, key) {
        this.expensesList.push(new Expense(
            current.date,
            current.amount,
            current.label,
            key
        ));
    },

    close: function() {
        this.containerNode.setAttribute("aria-hidden", "true");
        this.expensesList().length = 0;
    },

    deleteExpenses: function() {
        var i = this.expensesList().length;

        while (i--) {
            if (this.expensesList()[i].markedForDeletion() === true) {
                store.delete(this.expensesList()[i].key);
                this.expensesList.splice(i, 1);
            }
        }

        this.state("list");
        monthlyExpenses.list();
    }

};