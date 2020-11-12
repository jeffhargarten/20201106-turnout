import {select, selectAll, event} from 'd3-selection';
import {geoPath} from 'd3-geo';
import * as d3 from 'd3';
import {format} from 'd3-format';
import { feature } from 'topojson';
import * as topojson from "topojson";
import {annotation, annotationLabel,annotationCalloutCircle} from "d3-svg-annotation";
import map from '../sources/counties.json';
import ab from '../sources/ab_stats.json';


class StribCountyMap {

  constructor(target) {
    this.target = target;
    this.width  = $(this.target).outerWidth();
    this.height = $(this.target).outerHeight();
    this.svg = d3.select(this.target).attr("width", this.width-50).attr("height", this.height);
    // this.projection = d3.geoAlbers().scale(5037).translate([150, 1100]);
    this.land = feature(map, map.objects.counties).features;
    this.projection = d3.geoConicConformal()
    .parallels([45 + 37 / 60, 47 + 3 / 60])
    .rotate([94 + 15 / 60, 0])
    .fitSize([this.width, this.height], {type: "FeatureCollection", features: this.land});
    this.path = d3.geoPath(this.projection);
    this.data = ab.ab;
    this.m = map;
    this.colorScale = d3.scaleLinear()
    .domain([0, 0.10, 0.30, 0.50, 0.70, 1])
    .range(['#e7e7e7', '#D9D3EB', '#B6AED4', '#7D739C', '#62597D']);
  }
  
  _renderState() {
    var self = this;
      
    self.svg.append("g")
      .selectAll("path")
      .data(topojson.feature(map, this.m.objects.counties).features)
      .enter().append("path")
        .attr("d", self.path)
        .attr("class", "map-state-boundary");    
  }
  
  
  _renderCounties() {
    var self = this;

    self.svg.append("g")
      .selectAll("path")
      .data(topojson.feature(map, this.m.objects.counties).features)
      .enter().append("path")
        .attr("d", self.path)
        .attr("class", function(d) {
          for (var i=0; i < self.data.length; i++) {
            if (d.properties.COUNTYNAME == self.data[i].county) {
              return 'map-precinct-boundary ' + self.data[i].region;
            }
          }

        })
        .style("fill",function(d) {
          var change;
          
          for (var i=0; i < self.data.length; i++) {
            if (d.properties.COUNTYNAME == self.data[i].county) {
              change = self.data[i].ab_pct;
            }
          }

          return self.colorScale(change);
        });


        // var marks = [{
        //   long: -96.180690,
        //   lat: 47.802990,
        //   name: "Northwest"
        // }];
    
        // self.svg.selectAll(".map-city-label-large")
        // .data(marks)
        // .enter().append("text")
        // .attr("class", "map-city-label-large")
        // .text(function(d) { return d.name; })
        // .attr("x", function(d) {
        //     return self.projection([d.long, d.lat])[0];
        // })
        // .attr("y", function(d) {
        //     return self.projection([d.long, d.lat])[1];
        // })
  }

  render() {
    var self = this;

    self._renderState();
    self._renderCounties();


  }
}

export { StribCountyMap as default }