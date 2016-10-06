/**
 * Created by Abdelkader on 2015-02-09.
 */

stockApp.Company = DS.Model.extend({    //Company data
    name: DS.attr(),
    openPrice: DS.attr(),
    currentPrice: DS.attr(),
    changeValue: DS.attr(),
    changeDir: DS.attr(),
    changePerc: DS.attr(),
    volume: DS.attr(),
    symbol: DS.attr(),
    logo: DS.attr(),
    buyOrders: DS.hasMany('buyOrder'),
    sellOrders: DS.hasMany('sellOrder')
});

// This is a Fixture data to be used by DS.FixtureAdapter
stockApp.Company.FIXTURES =
    [
        {
            id: 1,
            name: "Microsoft Corporation (MSFT)",
            openPrice: 42.59,
            currentPrice: 42.59,
            changeValue: 0,
            changeDir: "images/noChange.png",
            changePerc: 0,
            volume: 0,
            symbol: "MSFT",
            logo: "images/microsoft.png"
        },
        {
            id: 2,
            name: "Apple Inc. (AAPL)",
            openPrice: 121.62,
            currentPrice: 121.62,
            changeValue: 0,
            changeDir: "images/noChange.png",
            changePerc: 0,
            volume: 0,
            symbol: 'AAPL',
            logo: "images/apple.png"
        },
        {
            id: 3,
            name: "Facebook, Inc. (FB)",
            openPrice: 74.98,
            currentPrice: 74.98,
            changeValue: 0,
            changeDir: "images/noChange.png",
            changePerc: 0,
            volume: 0,
            symbol: 'FB',
            logo: "images/facebook.png"
        },
        {
            id: 4,
            name: "Cisco Systems, Inc.",
            openPrice: 27.41,
            currentPrice: 27.41,
            changeValue: 0,
            changeDir: "images/noChange.png",
            changePerc: 0,
            volume: 0,
            symbol: "CSCO",
            logo: "images/cisco.png"
        },
        {
            id: 5,
            name: "Intel Corporation",
            openPrice: 0.55,
            currentPrice: 0.55,
            changeValue: 0,
            changeDir: "images/noChange.png",
            changePerc: 0,
            volume: 0,
            symbol: 'INTC',
            logo: "images/intel.png"
        }
    ];
