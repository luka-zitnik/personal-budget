var addExpense = {

    containerNode: document.getElementById("add-expense-view"),

    open: function() {
        this.containerNode.setAttribute("aria-hidden", "false");
    },

    addExpense: function () {
        var form = this.containerNode.querySelector("form"),
            formElements = form.elements,
            label = formElements.label.value,
            date = formElements.date.value,
            month = date.substring(0, 7),
            amount = parseFloat(formElements.amount.value);

        if (form.checkValidity() === false) {
            return;
        }

        monthlyExpenses.updateMonthlyExpensesList(month, date, amount);
        this.close();
        this.persistIntoDB(date, label, amount);
    },

    persistIntoDB: function (date, label, amount) {
        store.insert({date: date, label: label, amount: amount});
    },

    close: function () {
        this.containerNode.setAttribute("aria-hidden", "true");
    }

};