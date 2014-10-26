var addExpense = {

    containerNode: document.getElementById("add-expense-view"),
    label: ko.observable(),
    amount: ko.observable(),
    date: ko.observable(),

    open: function() {
        this.containerNode.setAttribute("aria-hidden", "false");
    },

    formIsValid: function() {
        return this.containerNode.querySelector("form").checkValidity();
    },

    addExpense: function () {
        var month = this.date().substring(0, 7),
            amount = parseFloat(this.amount());

        monthlyExpenses.updateMonthlyExpensesList(
            month,
            this.date(),
            amount
        );
        this.close();
        this.persistIntoDB(
            this.date(),
            this.label(),
            amount
        );
    },

    persistIntoDB: function (date, label, amount) {
        store.insert({date: date, label: label, amount: amount});
    },

    close: function () {
        this.containerNode.setAttribute("aria-hidden", "true");
    }

};