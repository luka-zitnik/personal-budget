var newExpenditure = {

    containerNode: document.getElementById("add-expenditure-view"),
    label: ko.observable(),
    value: ko.observable(),
    date: ko.observable(),

    open: function() {
        this.containerNode.setAttribute("aria-hidden", "false");
    },

    add: function () {
        var date = this.date(),
            label = this.label(),
            month = date.substring(0, 7),
            value = parseFloat(this.value());

        monthlyExpenditures.updateMonthlyExpendituresList(
            month,
            date,
            value
        );
        this.reset();
        this.close();
        this.persist(
            date,
            label,
            value
        );
    },

    reset: function() {
        this.label(null);
        this.value(null);
        this.date(null);
    },

    persist: function (date, label, value) {
        store.add({date: date, label: label, value: value});
    },

    close: function () {
        this.containerNode.setAttribute("aria-hidden", "true");
    }

};

newExpenditure.valid = ko.computed(function() {
    this.value();
    this.label();
    this.date();
    return this.containerNode.querySelector("form").checkValidity();
}.bind(newExpenditure));