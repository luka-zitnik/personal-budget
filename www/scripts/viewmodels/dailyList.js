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

    each: function(previous, current) {
        this.expensesList.push(new Expense(
            current.date,
            current.amount,
            current.label
        ));
    },

    close: function() {
        this.containerNode.setAttribute("aria-hidden", "true");
        this.expensesList().length = 0;
    },

    deleteExpenses: function() {
        for (var i = 0; i < this.expensesList().length; ++i) {
            if (this.expensesList()[i].markedForDeletion() === true) {
                this.expensesList()[i].deleteExpense();
            }
        }
    }

};