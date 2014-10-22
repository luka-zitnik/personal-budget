var currency = {

    // ISO country code standard part full name is ISO 3166-1 alpha-2
    // ISO currency code standard full name is ISO 4217
    //
    // Here are only officially assigned country code elements from the ISO standard
    //
    // For countries with multiple common currencies, the dominant is suggested
    // (e.g. GBP and USD in IO)
    // For countries with multiple unique currencies, only the dominant will be
    // available (e.g. CHE, CHF and CHW in CH)
    isoCountryToCurrencyMap: {
        "AD": "EUR", // Andorra: Euro
        "AE": "AED", // United Arab Emirates:  	United Arab Emirates dirham
        "AF": "AFN", // Afghanistan: Afghan afghani
        "AG": "XCD", // Antigua and Barbuda: East Caribbean dollar
        "AI": "XCD", // Anguilla: East Caribbean dollar
        "AL": "ALL", // Albania: Albanian lek
        "AM": "AMD", // Armenia: Armenian dram
        "AO": "AOA", // Angola: Angolan kwanza
        "AQ": "", // Antarctica
        "AR": "ARS", // Argentina: Argentine peso
        "AS": "", // American Samoa
        "AT": "EUR", // Austria: Euro
        "AU": "AUD", // Australia: Australian dollar
        "AW": "AWG", // Aruba: Aruban florin
        "AX": "", // Åland Islands
        "AZ": "AZN", // Azerbaijan; Azerbaijani manat
        "BA": "BAM", // Bosnia and Herzegovina: Bosnia and Herzegovina convertible mark
        "BB": "BBD", // Barbados: Barbados dollar
        "BD": "BDT", // Bangladesh: Bangladeshi taka
        "BE": "EUR", // Belgium: Euro
        "BF": "", // Burkina Faso
        "BG": "BGN", // Bulgaria: Bulgarian lev
        "BH": "BHD", // Bahrain: Bahraini dinar
        "BI": "BIF", // Burundi: Burundian franc
        "BJ": "", // Benin
        "BL": "EUR", // Saint Barthélemy: Euro
        "BM": "BMD", // Bermuda: Bermudian dollar
        "BN": "BND", // Brunei Darussalam: Brunei dollar
        "BO": "BOB", // Bolivia, Plurinational State of: Boliviano
        "BQ": "", // Bonaire, Sint Eustatius and Saba
        "BR": "BRL", // Brazil: Brazilian real
        "BS": "BSD", // Bahamas: Bahamian dollar
        "BT": "BTN", // Bhutan: Bhutanese ngultrum
        "BV": "", // Bouvet Island
        "BW": "BWP", // Botswana: Botswana pula
        "BY": "BYR", // Belarus: Belarusian ruble
        "BZ": "BZD", // Belize: Belize dollar
        "CA": "CAD", // Canada: Canadian dollar
        "CC": "AUD", // Cocos (Keeling) Islands: Australian dollar
        "CD": "CDF", // Congo, the Democratic Republic of the: Congolese franc
        "CF": "", // Central African Republic
        "CG": "", // Congo
        "CH": "CHF", // Switzerland: Swiss franc
        "CI": "", // Côte d'Ivoire
        "CK": "", // Cook Islands
        "CL": "CLP", // Chile: Chilean peso
        "CM": "", // Cameroon
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
        "EC": "", // Ecuador
        "EE": "EUR", // Estonia: Euro
        "EG": "EGP", // Egypt: Egyptian pound
        "EH": "", // Western Sahara
        "ER": "ERN", // Eritrea: Eritrean nakfa
        "ES": "EUR", // Spain: Euro
        "ET": "ETB", // Ethiopia: Ethiopian birr
        "FI": "EUR", // Finland: Euro
        "FJ": "FJD", // Fiji: Fiji dollar
        "FK": "FKP", // Falkland Islands (Malvinas): Falkland Islands pound
        "FM": "", // Micronesia, Federated States of
        "FO": "DKK", // Faroe Islands: Danish krone
        "FR": "EUR", // France: Euro
        "GA": "", // Gabon
        "GB": "GBP", // United Kingdom: Pound sterling
        "GD": "XCD", // Grenada: East Caribbean dollar
        "GE": "GEL", // Georgia: Georgian lari
        "GF": "", // French Guiana
        "GG": "GBP", // Guernsey: Pound sterling
        "GH": "GHS", // Ghana: Ghanaian cedi
        "GI": "GIP", // Gibraltar: Gibraltar pound
        "GL": "DKK", // Greenland: Danish krone
        "GM": "GMD", // Gambia: Gambian dalasi
        "GN": "GNF", // Guinea: Guinean franc
        "GP": "EUR", // Guadeloupe: Euro
        "GQ": "", // Equatorial Guinea
        "GR": "EUR", // Greece: Euro
        "GS": "GBP", // South Georgia and the South Sandwich Islands: Pound sterling
        "GT": "GTQ", // Guatemala: Guatemalan quetzal
        "GU": "", // Guam
        "GW": "", // Guinea-Bissau
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
        "LI": "", // Liechtenstein
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
        "MF": "", // Saint Martin (French part)
        "MG": "MGA", // Madagascar: Malagasy ariary
        "MH": "", // Marshall Islands
        "MK": "MKD", // Macedonia, the former Yugoslav Republic of: Macedonian denar
        "ML": "", // Mali
        "MM": "MMK", // Myanmar: Myanmar kyat
        "MN": "MNT", // Mongolia: Mongolian tugrik
        "MO": "MOP", // Macao: Macanese pataca
        "MP": "", // Northern Mariana Islands
        "MQ": "EUR", // Martinique: Euro
        "MR": "MRO", // Mauritania: Mauritanian ouguiya
        "MS": "XCD", // Montserrat: East Caribbean dollar
        "MT": "EUR", // Malta: Euro
        "MU": "MUR", // Mauritius: Mauritian rupee
        "MV": "MVR", // Maldives: Maldivian rufiyaa
        "MW": "MWK", // Malawi: Malawian kwacha
        "MX": "MXN", // Mexico: Mexican peso
        "MY": "MYR", // Malaysia: Malaysian ringgit
        "MZ": "", // Mozambique
        "NA": "", // Namibia
        "NC": "", // New Caledonia
        "NE": "", // Niger
        "NF": "AUD", // Norfolk Island: Australian dollar
        "NG": "", // Nigeria
        "NI": "", // Nicaragua
        "NL": "EUR", // Netherlands: Euro
        "NO": "", // Norway
        "NP": "", // Nepal
        "NR": "AUD", // Nauru: Australian dollar
        "NU": "", // Niue
        "NZ": "", // New Zealand
        "OM": "", // Oman
        "PA": "", // Panama
        "PE": "", // Peru
        "PF": "", // French Polynesia
        "PG": "", // Papua New Guinea
        "PH": "", // Philippines
        "PK": "", // Pakistan
        "PL": "", // Poland
        "PM": "EUR", // Saint Pierre and Miquelon: Euro
        "PN": "", // Pitcairn
        "PR": "", // Puerto Rico
        "PS": "ILS", // Palestine, State of: Israeli new shekel
        "PT": "EUR", // Portugal: Euro
        "PW": "", // Palau
        "PY": "", // Paraguay
        "QA": "", // Qatar
        "RE": "EUR", // Réunion: Euro
        "RO": "", // Romania
        "RS": "", // Serbia
        "RU": "", // Russian Federation
        "RW": "", // Rwanda
        "SA": "", // Saudi Arabia
        "SB": "", // Solomon Islands
        "SC": "", // Seychelles
        "SD": "", // Sudan
        "SE": "", // Sweden
        "SG": "", // Singapore
        "SH": "GBP", // Saint Helena, Ascension and Tristan da Cunha: Pound sterling
        "SI": "EUR", // Slovenia: Euro
        "SJ": "", // Svalbard and Jan Mayen
        "SK": "EUR", // Slovakia: Euro
        "SL": "", // Sierra Leone
        "SM": "EUR", // San Marino: Euro
        "SN": "", // Senegal
        "SO": "", // Somalia
        "SR": "", // Suriname
        "SS": "", // South Sudan
        "ST": "", // Sao Tome and Principe
        "SV": "", // El Salvador
        "SX": "ANG", // Sint Maarten (Dutch part): Netherlands Antillean guilder
        "SY": "", // Syrian Arab Republic
        "SZ": "", // Swaziland
        "TC": "", // Turks and Caicos Islands
        "TD": "", // Chad
        "TF": "", // French Southern Territories
        "TG": "", // Togo
        "TH": "", // Thailand
        "TJ": "", // Tajikistan
        "TK": "", // Tokelau
        "TL": "", // Timor-Leste
        "TM": "", // Turkmenistan
        "TN": "", // Tunisia
        "TO": "", // Tonga
        "TR": "TRY", // Turkey: Turkish lira
        "TT": "", // Trinidad and Tobago
        "TV": "AUD", // Tuvalu: Australian dollar
        "TW": "", // Taiwan, Province of China
        "TZ": "", // Tanzania, United Republic of
        "UA": "", // Ukraine
        "UG": "", // Uganda
        "UM": "", // United States Minor Outlying Islands
        "US": "", // United States
        "UY": "", // Uruguay
        "UZ": "", // Uzbekistan
        "VA": "EUR", // Holy See (Vatican City State): Euro
        "VC": "XCD", // Saint Vincent and the Grenadines: East Caribbean dollar
        "VE": "", // Venezuela, Bolivarian Republic of
        "VG": "", // Virgin Islands, British
        "VI": "", // Virgin Islands, U.S.
        "VN": "", // Viet Nam
        "VU": "", // Vanuatu
        "WF": "", // Wallis and Futuna
        "WS": "", // Samoa
        "YE": "", // Yemen
        "YT": "EUR", // Mayotte: Euro
        "ZA": "", // South Africa
        "ZM": "", // Zambia
        "ZW": ""  // Zimbabwe
    },

    proxyRequestForIsoCountryCode: function (latitude, longitude) {
        window.placefinder.requestIsoCountryCode(latitude, longitude, "window.currency.yqlCallback");
    },

    yqlCallback: function (data) {
        var countryCode,
            currencyCode;

        console.log(data);

        try {
            countryCode = data.query.results.Result.countrycode; // May be null
            currencyCode = this.isoCountryToCurrencyMap[countryCode];
            console.log(currencyCode);
        }
        catch(error) {
            console.error(error);
        }
    }

};