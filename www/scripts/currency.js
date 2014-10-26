var currency = {

    storageKey: "currency",

    // ISO country code standard part full name is ISO 3166-1 alpha-2
    // ISO currency code standard full name is ISO 4217
    //
    // Here are only officially assigned country code elements from the ISO standard
    //
    // For countries with multiple common currencies, the dominant is suggested
    // (e.g. GBP and USD in IO)
    // For countries with multiple unique currencies, only the dominant will be
    // available (e.g. CHE, CHF and CHW in CH)
    //
    // Another irregularity is Tristan da Cunha, where it is recognized by the
    // Placefiner service as Saint Helena, but uses a different currency than the
    // actual Saint Helena, the United Kingdom issue of the pound sterling
    //
    // Another irregularity is that I removed Western Sahara as a disputed territory
    // with many currencies in use + it is recognized by the Placefiner service
    // as Morocco
    //
    // Other irregularities are listed French Southern and Antarctic Lands and
    // United States Minor Outlying Islands which are not really countries
    isoCountryToCurrencyMap: {
        "AD": "EUR", // Andorra: Euro
        "AE": "AED", // United Arab Emirates:  	United Arab Emirates dirham
        "AF": "AFN", // Afghanistan: Afghan afghani
        "AG": "XCD", // Antigua and Barbuda: East Caribbean dollar
        "AI": "XCD", // Anguilla: East Caribbean dollar
        "AL": "ALL", // Albania: Albanian lek
        "AM": "AMD", // Armenia: Armenian dram
        "AO": "AOA", // Angola: Angolan kwanza
        "AR": "ARS", // Argentina: Argentine peso
        "AS": "USD", // American Samoa: United States dollar
        "AT": "EUR", // Austria: Euro
        "AU": "AUD", // Australia: Australian dollar
        "AW": "AWG", // Aruba: Aruban florin
        "AX": "EUR", // Åland Islands: Euro
        "AZ": "AZN", // Azerbaijan; Azerbaijani manat
        "BA": "BAM", // Bosnia and Herzegovina: Bosnia and Herzegovina convertible mark
        "BB": "BBD", // Barbados: Barbados dollar
        "BD": "BDT", // Bangladesh: Bangladeshi taka
        "BE": "EUR", // Belgium: Euro
        "BF": "XOF", // Burkina Faso: CFA franc BCEAO
        "BG": "BGN", // Bulgaria: Bulgarian lev
        "BH": "BHD", // Bahrain: Bahraini dinar
        "BI": "BIF", // Burundi: Burundian franc
        "BJ": "XOF", // Benin: CFA franc BCEAO
        "BL": "EUR", // Saint Barthélemy: Euro
        "BM": "BMD", // Bermuda: Bermudian dollar
        "BN": "BND", // Brunei Darussalam: Brunei dollar
        "BO": "BOB", // Bolivia, Plurinational State of: Boliviano
        "BQ": "USD", // Bonaire, Sint Eustatius and Saba: United States dollar
        "BR": "BRL", // Brazil: Brazilian real
        "BS": "BSD", // Bahamas: Bahamian dollar
        "BT": "BTN", // Bhutan: Bhutanese ngultrum
        "BV": "NOK", // Bouvet Island: Norwegian krone
        "BW": "BWP", // Botswana: Botswana pula
        "BY": "BYR", // Belarus: Belarusian ruble
        "BZ": "BZD", // Belize: Belize dollar
        "CA": "CAD", // Canada: Canadian dollar
        "CC": "AUD", // Cocos (Keeling) Islands: Australian dollar
        "CD": "CDF", // Congo, the Democratic Republic of the: Congolese franc
        "CF": "XAF", // Central African Republic: CFA franc BEAC
        "CG": "XAF", // Congo: CFA franc BEAC
        "CH": "CHF", // Switzerland: Swiss franc
        "CI": "XOF", // Côte d'Ivoire: CFA franc BCEAO
        "CK": "NZD", // Cook Islands: New Zealand dollar
        "CL": "CLP", // Chile: Chilean peso
        "CM": "XAF", // Cameroon: CFA franc BEAC
        "CN": "CNY", // China: Chinese yuan
        "CO": "COP", // Colombia: Colombian peso
        "CR": "CRC", // Costa Rica: Costa Rican colon
        "CU": "CUP", // Cuba: Cuban peso
        "CV": "CVE", // Cabo Verde: Cape Verde escudo
        "CW": "ANG", // Curaçao: Netherlands Antillean guilder
        "CX": "AUD", // Christmas Island: Australian dollar
        "CY": "EUR", // Cyprus: Euro
        "CZ": "CZK", // Czech Republic: Czech koruna
        "DE": "EUR", // Germany: Euro
        "DJ": "DJF", // Djibouti: Djiboutian franc
        "DK": "DKK", // Denmark: Danish krone
        "DM": "XCD", // Dominica: East Caribbean dollar
        "DO": "DOP", // Dominican Republic: Dominican peso
        "DZ": "DZD", // Algeria: Algerian dinar
        "EC": "USD", // Ecuador: United States dollar
        "EE": "EUR", // Estonia: Euro
        "EG": "EGP", // Egypt: Egyptian pound
        "ER": "ERN", // Eritrea: Eritrean nakfa
        "ES": "EUR", // Spain: Euro
        "ET": "ETB", // Ethiopia: Ethiopian birr
        "FI": "EUR", // Finland: Euro
        "FJ": "FJD", // Fiji: Fiji dollar
        "FK": "FKP", // Falkland Islands (Malvinas): Falkland Islands pound
        "FM": "USD", // Micronesia, Federated States of: United States dollar
        "FO": "DKK", // Faroe Islands: Danish krone
        "FR": "EUR", // France: Euro
        "GA": "XAF", // Gabon: CFA franc BEAC
        "GB": "GBP", // United Kingdom: Pound sterling
        "GD": "XCD", // Grenada: East Caribbean dollar
        "GE": "GEL", // Georgia: Georgian lari
        "GF": "EUR", // French Guiana: Euro
        "GG": "GBP", // Guernsey: Pound sterling
        "GH": "GHS", // Ghana: Ghanaian cedi
        "GI": "GIP", // Gibraltar: Gibraltar pound
        "GL": "DKK", // Greenland: Danish krone
        "GM": "GMD", // Gambia: Gambian dalasi
        "GN": "GNF", // Guinea: Guinean franc
        "GP": "EUR", // Guadeloupe: Euro
        "GQ": "XAF", // Equatorial Guinea: CFA franc BEAC
        "GR": "EUR", // Greece: Euro
        "GS": "GBP", // South Georgia and the South Sandwich Islands: Pound sterling
        "GT": "GTQ", // Guatemala: Guatemalan quetzal
        "GU": "USD", // Guam: United States dollar
        "GW": "XOF", // Guinea-Bissau: CFA franc BCEAO
        "GY": "GYD", // Guyana: Guyanese dollar
        "HK": "HKD", // Hong Kong: Hong Kong dollar
        "HM": "AUD", // Heard Island and McDonald Islands: Australian dollar
        "HN": "HNL", // Honduras: Honduran lempira
        "HR": "HRK", // Croatia: Croatian kuna
        "HT": "HTG", // Haiti: Haitian gourde
        "HU": "HUF", // Hungary: Hungarian forint
        "ID": "IDR", // Indonesia: Indonesian rupiah
        "IE": "EUR", // Ireland: Euro
        "IL": "ILS", // Israel: Israeli new shekel
        "IM": "GBP", // Isle of Man: Pound sterling
        "IN": "INR", // India: Indian rupee
        "IO": "USD", // British Indian Ocean Territory: United States dollar
        "IQ": "IQD", // Iraq: Iraqi dinar
        "IR": "IRR", // Iran, Islamic Republic of: Iranian rial
        "IS": "ISK", // Iceland: Icelandic króna
        "IT": "EUR", // Italy: Euro
        "JE": "GBP", // Jersey: Pound sterling
        "JM": "JMD", // Jamaica: Jamaican dollar
        "JO": "JOD", // Jordan: Jordanian dinar
        "JP": "JPY", // Japan: Japanese yen
        "KE": "KES", // Kenya: Kenyan shilling
        "KG": "KGS", // Kyrgyzstan: Kyrgyzstani som
        "KH": "KHR", // Cambodia: Cambodian riel
        "KI": "AUD", // Kiribati: Australian dollar
        "KM": "KMF", // Comoros: Comoro franc
        "KN": "XCD", // Saint Kitts and Nevis: East Caribbean dollar
        "KP": "KPW", // Korea, Democratic People's Republic of: North Korean won
        "KR": "KRW", // Korea, Republic of: South Korean won
        "KW": "KWD", // Kuwait: Kuwaiti dinar
        "KY": "KYD", // Cayman Islands: Kuwaiti dinar
        "KZ": "KZT", // Kazakhstan: Kazakhstani tenge
        "LA": "LAK", // Lao People's Democratic Republic: Lao kip
        "LB": "LBP", // Lebanon: Lebanese pound
        "LC": "XCD", // Saint Lucia: East Caribbean dollar
        "LI": "CHF", // Liechtenstein: Swiss franc
        "LK": "LKR", // Sri Lanka: Sri Lankan rupee
        "LR": "LRD", // Liberia: Liberian dollar
        "LS": "LSL", // Lesotho: Lesotho loti
        "LT": "LTL", // Lithuania: Lithuanian litas
        "LU": "EUR", // Luxembourg: Euro
        "LV": "EUR", // Latvia: Euro
        "LY": "LYD", // Libya: Libyan dinar
        "MA": "MAD", // Morocco: Moroccan dirham
        "MC": "EUR", // Monaco: Euro
        "MD": "MDL", // Moldova, Republic of: Moldovan leu
        "ME": "EUR", // Montenegro: Euro
        "MF": "EUR", // Saint Martin (French part): Euro
        "MG": "MGA", // Madagascar: Malagasy ariary
        "MH": "USD", // Marshall Islands: United States dollar
        "MK": "MKD", // Macedonia, the former Yugoslav Republic of: Macedonian denar
        "ML": "XOF", // Mali: CFA franc BCEAO
        "MM": "MMK", // Myanmar: Myanmar kyat
        "MN": "MNT", // Mongolia: Mongolian tugrik
        "MO": "MOP", // Macao: Macanese pataca
        "MP": "USD", // Northern Mariana Islands: United States dollar
        "MQ": "EUR", // Martinique: Euro
        "MR": "MRO", // Mauritania: Mauritanian ouguiya
        "MS": "XCD", // Montserrat: East Caribbean dollar
        "MT": "EUR", // Malta: Euro
        "MU": "MUR", // Mauritius: Mauritian rupee
        "MV": "MVR", // Maldives: Maldivian rufiyaa
        "MW": "MWK", // Malawi: Malawian kwacha
        "MX": "MXN", // Mexico: Mexican peso
        "MY": "MYR", // Malaysia: Malaysian ringgit
        "MZ": "MZN", // Mozambique: Mozambican metical
        "NA": "NAD", // Namibia: Namibian dollar
        "NC": "XPF", // New Caledonia: CFP franc
        "NE": "XOF", // Niger: CFA franc BCEAO
        "NF": "AUD", // Norfolk Island: Australian dollar
        "NG": "NGN", // Nigeria: Namibian dollar
        "NI": "NIO", // Nicaragua: Nicaraguan córdoba
        "NL": "EUR", // Netherlands: Euro
        "NO": "NOK", // Norway: Norwegian krone
        "NP": "NPR", // Nepal: Nepalese rupee
        "NR": "AUD", // Nauru: Australian dollar
        "NU": "NZD", // Niue: New Zealand dollar
        "NZ": "NZD", // New Zealand: New Zealand dollar
        "OM": "OMR", // Oman: Omani rial
        "PA": "PAB", // Panama: Panamanian balboa
        "PE": "PEN", // Peru: Peruvian nuevo sol
        "PF": "XPF", // French Polynesia: CFP franc
        "PG": "PGK", // Papua New Guinea: Papua New Guinean kina
        "PH": "PHP", // Philippines: Philippine peso
        "PK": "PKR", // Pakistan: Pakistani rupee
        "PL": "PLN", // Poland: Polish złoty
        "PM": "EUR", // Saint Pierre and Miquelon: Euro
        "PN": "NZD", // Pitcairn: New Zealand dollar
        "PR": "USD", // Puerto Rico: United States dollar
        "PS": "ILS", // Palestine, State of: Israeli new shekel
        "PT": "EUR", // Portugal: Euro
        "PW": "USD", // Palau: United States dollar
        "PY": "PYG", // Paraguay: Paraguayan guaraní
        "QA": "QAR", // Qatar:  	Qatari riyal
        "RE": "EUR", // Réunion: Euro
        "RO": "RON", // Romania: Romanian new leu
        "RS": "RSD", // Serbia: Romanian new leu
        "RU": "RUB", // Russian Federation: Russian ruble
        "RW": "RWF", // Rwanda: Rwandan franc
        "SA": "SAR", // Saudi Arabia: Saudi riyal
        "SB": "SBD", // Solomon Islands: Solomon Islands dollar
        "SC": "SCR", // Seychelles: Seychelles rupee
        "SD": "SDG", // Sudan: Sudanese pound
        "SE": "SEK", // Sweden: Swedish krona/kronor
        "SG": "SGD", // Singapore: Singapore dollar
        "SH": "SHP", // Saint Helena, Ascension and Tristan da Cunha: Saint Helena pound
        "SI": "EUR", // Slovenia: Euro
        "SJ": "NOK", // Svalbard and Jan Mayen: Norwegian krone
        "SK": "EUR", // Slovakia: Euro
        "SL": "SLL", // Sierra Leone: Sierra Leonean leone
        "SM": "EUR", // San Marino: Euro
        "SN": "XOF", // Senegal: CFA franc BCEAO
        "SO": "SOS", // Somalia: Somali shilling
        "SR": "SRD", // Suriname: Surinamese dollar
        "SS": "SSP", // South Sudan: South Sudanese pound
        "ST": "STD", // Sao Tome and Principe: São Tomé and Príncipe dobra
        "SV": "USD", // El Salvador: United States dollar
        "SX": "ANG", // Sint Maarten (Dutch part): Netherlands Antillean guilder
        "SY": "SYP", // Syrian Arab Republic: Syrian pound
        "SZ": "SZL", // Swaziland: Swazi lilangeni
        "TC": "USD", // Turks and Caicos Islands: United States dollar
        "TD": "XAF", // Chad: CFA franc BEAC
        "TF": "EUR", // French Southern Territories: Euro
        "TG": "XOF", // Togo: CFA franc BCEAO
        "TH": "THB", // Thailand: Thai baht
        "TJ": "TJS", // Tajikistan: Tajikistani somoni
        "TK": "NZD", // Tokelau: New Zealand dollar
        "TL": "USD", // Timor-Leste: United States dollar
        "TM": "TMT", // Turkmenistan: Turkmenistani manat
        "TN": "TND", // Tunisia: Tunisian dinar
        "TO": "TOP", // Tonga: Tunisian dinar
        "TR": "TRY", // Turkey: Turkish lira
        "TT": "TTD", // Trinidad and Tobago: Trinidad and Tobago dollar
        "TV": "AUD", // Tuvalu: Australian dollar
        "TW": "TWD", // Taiwan, Province of China: New Taiwan dollar
        "TZ": "TZS", // Tanzania, United Republic of: Tanzanian shilling
        "UA": "UAH", // Ukraine: Ukrainian hryvnia
        "UG": "UGX", // Uganda: Ugandan shilling
        "UM": "USD", // United States Minor Outlying Islands: United States dollar
        "US": "USD", // United States: United States dollar
        "UY": "UYU", // Uruguay: Uruguayan peso
        "UZ": "UZS", // Uzbekistan: Uzbekistan som
        "VA": "EUR", // Holy See (Vatican City State): Euro
        "VC": "XCD", // Saint Vincent and the Grenadines: East Caribbean dollar
        "VE": "VEF", // Venezuela, Bolivarian Republic of: Venezuelan bolívar
        "VG": "USD", // Virgin Islands, British: United States dollar
        "VI": "USD", // Virgin Islands, U.S.: United States dollar
        "VN": "VND", // Viet Nam: Vietnamese dong
        "VU": "VUV", // Vanuatu: Vanuatu vatu
        "WF": "XPF", // Wallis and Futuna: CFP franc
        "WS": "WST", // Samoa: Samoan tala
        "YE": "YER", // Yemen: Yemeni rial
        "YT": "EUR", // Mayotte: Euro
        "ZA": "ZAR", // South Africa: South African rand
        "ZM": "ZMW", // Zambia: Zambian kwacha
        "ZW": "ZWD"  // Zimbabwe: Zimbabwe dollar
    },

    getChosenCurrencyCode: function() {
        var currencyCode = localStorage.getItem(this.storageKey);

        if (currencyCode === null) {
            this.requestForDeviceLocation();
        }

        return currencyCode;
    },

    setChosenCurrencyCode: function(currencyCode) {
        localStorage.setItem(this.storageKey, currencyCode);
        dispatchEvent(new CustomEvent("currencyCodeChanged", {
            detail: { newCurrencyCode: currencyCode }
        }));
    },

    requestForDeviceLocation: function() {
        var self = this;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.proxyRequestForIsoCountryCode,
                function(positionError) {
                    self.suggestCurrencySelection();
                    console.warn(positionError);
                }
            );
        }
    },

    proxyRequestForIsoCountryCode: function (position) {
        placefinder.requestIsoCountryCode(
            position.coords.latitude,
            position.coords.longitude,
            "window.currency.yqlCallback"
        );
    },

    yqlCallback: function (data) {
        var countryCode,
            currencyCode;

        try {
            countryCode = data.query.results.Result.countrycode; // May be null, even results may be null
            currencyCode = this.isoCountryToCurrencyMap[countryCode];
            currencySuggestion.open(currencyCode);
        }
        catch(error) {
            this.suggestCurrencySelection();
            console.warn(error);
        }
    },

    suggestCurrencySelection: function() {
    }

};