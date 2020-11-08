import * as d3 from 'd3';

class regionChart { 

    constructor(target) {
      this.target = target;
      this.chartCounts = null;
    }
  
    render(tier) {
      var self = this;
  
      var states;
      var nums;

      if (tier == 1) {
      states = ["MN", "CO", "MT", "WI", "OR", "ME", "WA", "ND", "MI", "IA", "VT", "GA", "FL", "VA", "NH", "AK", "MA", "CT", "MD", "MO", "SD", "NJ", "UT", "NE", "PA", "IL"];
      nums = ["turnout", 0.642498821, 0.629542175, 0.619698807, 0.616778559, 0.615102298, 0.602059121, 0.589415421, 0.586048233, 0.577781234, 0.577059286, 0.55897547, 0.550273581, 0.549436233, 0.547703848, 0.546472961, 0.546227847, 0.54590336, 0.543939373, 0.542235641, 0.536025814, 0.53254015, 0.531314914, 0.520022242, 0.517965204, 0.514429345, 0.514040607];
      }
      else if (tier == 2){
      states = ["KS", "DE", "OH", "US", "ID", "CA", "NC", "AZ", "WY", "KY", "RI", "NV", "AL", "NM", "IN", "TX", "NY", "SC", "LA", "TN", "DC", "MS", "WV", "OK", "AR", "HI"];
      nums = ["turnout", 0.511510942, 0.510955448, 0.508719265, 0.502866261, 0.500325507, 0.495902994, 0.495680708, 0.490754269, 0.486754387, 0.485662126, 0.480512065, 0.475476395, 0.474567595, 0.473372212, 0.468865789, 0.463420097, 0.452434227, 0.452057514, 0.447639902, 0.447221757, 0.437832193, 0.427024998, 0.425543278, 0.42524534, 0.413820404, 0.393012032];
      }

      var  padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 100,
        };
      
      self.chartCounts = c3.generate({
          bindto: self.target,
          padding: padding,
          data: {
                columns: [
                    nums
                ],
            type: 'bar',
            labels: {
                format: {
                    'turnout': d3.format('.0%')
                }
            }
          },
            tooltip: {
                show: false
            },
            legend: {
              show: false
            },
            color: {
                pattern: ['#8b62a8']
            },
            axis: {
                  rotated: true,
                  y: {
                        max: 1,
                        min: 0,
                        padding: {bottom: 0, top: 0},
                        tick: {
                         count: 4,
                         values: [0,0.25,0.50,0.75,1],
                         format: d3.format('.0%')
                        }
                    },
                x: {
                  type: 'category',
                  categories: states,
                  padding: {right: 0, left: 0},
                        tick: {
                         rotate: -75,
                         multiline: false
                        },
                        height: 40
                }
            }
    });
  
    d3.selectAll(".c3-target-2016")
    .selectAll(".c3-bar, .c3-texts")
    .attr("transform", "translate(0, 5)");

    }
  }
  
  export { regionChart as default }