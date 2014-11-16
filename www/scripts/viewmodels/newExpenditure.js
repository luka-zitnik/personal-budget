var newExpenditure = {

    containerNode: document.getElementById("add-expenditure-view"),
    label: ko.observable(),
    value: ko.observable(),
    date: ko.observable(),

    open: function() {
        this.containerNode.setAttribute("aria-hidden", "false");
    },

    formIsValid: function() {
        return this.containerNode.querySelector("form").checkValidity();
    },

    newExpenditure: function () {
        var date = this.date(),
            label = this.label(),
            month = date.substring(0, 7),
            value = parseFloat(this.value());

        monthlyExpenditures.updateMonthlyExpendituresList(
            month,
            date,
            value
        );
        this.resetForm();
        this.close();
        this.persistIntoDB(
            date,
            label,
            value
        );
    },

    resetForm: function() {
        this.label(null);
        this.value(null);
        this.date(null);
    },

    persistIntoDB: function (date, label, value) {
        store.add({date: date, label: label, value: value});
    },

    close: function () {
        this.containerNode.setAttribute("aria-hidden", "true");
    }

};