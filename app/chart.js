import * as d3 from 'd3';

class Chart {

    constructor(target) {
        this.target = target;
        this.chartCounts = null;
    }

    render() {
        var self = this;

        var padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 60,
        };

        self.chartCounts = c3.generate({
            bindto: self.target,
            padding: padding,
            data: {
                xs: {
                    'Midterm': 'x',
                    'Presidential': 'x'
                },
                columns: [
                    ['x', 1950, 1952, 1954, 1956, 1958, 1960, 1962, 1964, 1966, 1968, 1970, 1972, 1974, 1976, 1978, 1980, 1982, 1984, 1986, 1988, 1990, 1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022],
                    ['Midterm', 0.57, null, 0.61, null, 0.6, null, 0.62, null, 0.62, null, 0.62, null, 0.5, null, 0.58, null, 0.62, null, 0.48, null, 0.59, null, 0.55, null, 0.62, null, 0.65, null, 0.6, null, 0.56, null, 0.51, null, 0.642, null],
                    ['Presidential', null, 0.77, null, 0.83, null, 0.79, null, 0.76, null, 0.74, null, 0.70, null, 0.73, null, 0.72, null, 0.71, null, 0.69, null, 0.74, null, 0.67, null, 0.70, null, 0.79, null, 0.78, null, 0.76, null, 0.75, null, null, null]
                ],
                type: 'line',
                line: {
                    connectNull: true
                }
            },
            legend: {
                show: false
            },
            line: {
                connectNull: true
            },
            point: {
                show: true,
                r: function(d) {
                    if (d.id == "Presidential") {
                        return 0;
                    }

                    if (d.x == 2018) {
                        return 6;
                    } else {
                        return 2;
                    }
                }
            },
            color: {
                pattern: ['#8b62a8', "#999999"]
            },
            axis: {
                // rotated: true,
                y: {
                    max: 1,
                    min: 0,
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 0.25, 0.50, 0.75, 1],
                        format: d3.format('.0%')
                    }
                },
                x: {
                    padding: {
                        right: 0,
                        left: 0
                    },
                    tick: {
                        rotate: -75,
                        multiline: false,
                        values: [1950, 1958, 1966, 1974, 1982, 1990, 1998, 2006, 2014, 2018, 2022]
                    },
                    height: 40
                }
            },
            regions: [
                {axis: 'x', start: 2002, end: 2014, class: 'regionDown'},
            ],
            grid: {
                focus: {
                    show: false
                },
                y: {
                    lines: [{
                        value: 0.5,
                        text: '',
                        position: 'start',
                        class: 'powerline'
                    }]

                }
            }
        });

    }
}

export {
    Chart as
    default
}