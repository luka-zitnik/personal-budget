var dailyList = {

    date: ko.observable(),
    expensesList: ko.observableArray(),
    containerNode: document.getElementById("daily-list-view"),

    open: function(date) {
        this.date(date);
        this.containerNode.setAttribute("aria-hidden", "false");
        store.each(this.each.bind(this));
    },

    each: function(previous, current) {
        if (current.date !== this.date()) {
            return;
        }

        console.log(current);

        this.expensesList.push(new Expense(
            current.date,
            current.amount,
            current.label
        ));
    },

    close: function() {
        this.containerNode.setAttribute("aria-hidden", "true");
        this.expensesList().length = 0;
    }

};