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
            value = parseFloat(this.value());

        // first run the empty field is undefined, then it is set to null. I did not want to change other code
        if(typeof label=="undefined" || label==null) // user does not have to fill the label
            label="";

        // if user does not fill the date, it will be the current date
        if(typeof date=="undefined" || date==null) {
            var currTime=new Date();
            date=currTime.getFullYear();
            var month=currTime.getMonth()+1;
            date+="-"+(month<10 ? "0":"")+month;
            date+="-"+(currTime.getDate()<10 ? "0":"")+currTime.getDate();
        }

        var month = date.substring(0, 7);

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