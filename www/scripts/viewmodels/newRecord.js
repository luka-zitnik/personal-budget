var newRecord = {

    containerNode: document.getElementById("add-record-view"),
    type: ko.observable("-1"),
    label: ko.observable(),
    value: ko.observable(),
    date: ko.observable(getCurrentDate()),

    open: function() {
        this.containerNode.setAttribute("aria-hidden", "false");
    },

    add: function () {
        var date = this.date(),
            label = this.label() || "",
            value = parseFloat(this.value()) * this.type(),
            month = date.substring(0, 7);

        monthlyRecords.updateMonthlyRecordsList(
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
        this.type("-1");
        this.label(undefined);
        this.value(undefined);
        this.date(getCurrentDate());
    },

    persist: function (date, label, value) {
        store.add({date: date, label: label, value: value});
    },

    close: function () {
        this.containerNode.setAttribute("aria-hidden", "true");
    }

};

function getCurrentDate() {
    var currTime = new Date(),
        month = currTime.getMonth() + 1;

    // return ISO 8601 date string
    return currTime.getFullYear()
        + "-" + (month < 10 ? "0" : "") + month
        + "-" + (currTime.getDate() < 10 ? "0" : "") + currTime.getDate();
}

newRecord.valid = ko.computed(function() {
    this.value();
    this.label();
    this.date();
    return this.containerNode.querySelector("form").checkValidity();
}.bind(newRecord));
