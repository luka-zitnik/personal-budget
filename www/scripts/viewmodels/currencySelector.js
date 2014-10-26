var currencySelector = {

    visible: ko.observable(false),
    selected: ko.observable(currency.getChosenCurrencyCode()),
    currenciesList: _.uniq(_.toArray(currency.isoCountryToCurrencyMap).sort(), true),

    open: function() {
        this.visible(true);
    },

    close: function() {
        this.visible(false);
    },

    select: function(value) {
        this.selected(value);
    }

};