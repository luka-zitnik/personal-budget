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
        var date = this.date(),
            label = this.label(),
            month = date.substring(0, 7),
            amount = parseFloat(this.amount());

        monthlyExpenses.updateMonthlyExpensesList(
            month,
            date,
            amount
        );
        this.resetForm();
        this.close();
        this.persistIntoDB(
            date,
            label,
            amount
        );
    },

    resetForm: function() {
        this.label(null);
        this.amount(null);
        this.date(null);
    },

    persistIntoDB: function (date, label, amount) {
        store.insert({date: date, label: label, amount: amount});
    },

    close: function () {
        this.containerNode.setAttribute("aria-hidden", "true");
    }

};