var width = 960;
var height = 700;
var projection, path, svg;
 
 
function setup(width, height) {
     projection = d3.geo.mercator()
        .center([0, 10])
        .scale(6000)
        .translate([17600, 4500])
        .rotate([-180, 0]);
 
     path = d3.geo.path()
        .projection(projection);
 
     svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "#fff")
        .attr("align", "center")
        .call(d3.behavior.zoom().scaleExtent([1, 8]))
        .append("g");
}
 
 
var color = d3.scale.linear()
            .domain([6, 40])
            .clamp(true)
            .range(['#aaeeff', '#000033']);
 
d3.select("body").append("div").attr("id", "ispis_zupanije");
 
d3.select("body").append("div")
.attr("id", "line_chart");


d3.select("body").append("div")
.attr("id", "lgnd");

d3.select("#chart").append("div").attr("id", "zupanija");
 
 
function drawMap(year) {
   
d3.json("cro_regv3.json", function (error, cro) {
    var data = topojson.feature (cro, cro.objects.layer1);
    var data1;
    var godine = ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"];
    d3.select("#map svg").remove();
    setup(width, height);
    var states = svg.selectAll("path.county")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("class", "county")
                    .attr("id", function(d) { return d.id; })
                    .attr("d", path)
                    .style("fill", function(d) {
                        switch(year) {
                            case 2007:
                                console.log(d.properties.nezap_p_2007);
                                return color(d.properties.nezap_p_2007);
                            case 2008:
                                console.log(d.properties.nezap_p_2008);
                                return color(d.properties.nezap_p_2008);
                            case 2009:
                                return color(d.properties.nezap_p_2009);
                            case 2010:
                                return color(d.properties.nezap_p_2010);
                            case 2011:
                                return color(d.properties.nezap_p_2011);
                            case 2012:
                                return color(d.properties.nezap_p_2012);
                            case 2013:
                                return color(d.properties.nezap_p_2013);
                            case 2014:
                                return color(d.properties.nezap_p_2014);
                            case 2015:
                                return color(d.properties.nezap_p_2015);
                            case 2016:
                                return color(d.properties.nezap_p_2016);
 
                        }
                    })
                    .style("stroke", "black")
                    .style("stroke-width", 1)
                    .style("stroke-opacity", 1)
                    .on("mouseover", function(d,i){
                        states.style("cursor", "pointer");
                        var currentState = this;
                        d3.select(this).style('fill', '#ff0000');
                        d3.select("#ispis_zupanije")    
                        .style("left", (d3.event.pageX) + "px")    
                        .style("top", (d3.event.pageY ) + "px")
                        .style("display", "block")        
                        .html(function(data) {
                        switch(year){
                            case 2007:
                                //console.log(d.properties.nezap_p_2007);
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2007;
                            case 2008:
                                console.log(d.properties.nezap_p_2008);
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2008;
                            case 2009:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2009;
                            case 2010:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2010;
                            case 2011:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2011;
                            case 2012:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2012;
                            case 2013:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2013;
                            case 2014:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2014;
                            case 2015:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2015;
                            case 2016:
                                return d.properties.name + "<br> Postotak nezaposlenih: "+d.properties.nezap_p_2016;
 
                        }
       
                    })
                    })
                    .on('mouseout', function(d) {
                        d3.select("#ispis_zupanije")
                          .style("display", "none");  
                        states.style("fill", function(d) {
                            switch(year){
                            case 2007:
                               
                                return color(d.properties.nezap_p_2007);
                            case 2008:
                                //console.log(d.properties.nezap_p_2008);
                                return color(d.properties.nezap_p_2008);
                            case 2009:
                                return color(d.properties.nezap_p_2009);
                            case 2010:
                                return color(d.properties.nezap_p_2010);
                            case 2011:
                                return color(d.properties.nezap_p_2011);
                            case 2012:
                                return color(d.properties.nezap_p_2012);
                            case 2013:
                                return color(d.properties.nezap_p_2013);
                            case 2014:
                                return color(d.properties.nezap_p_2014);
                            case 2015:
                                return color(d.properties.nezap_p_2015);
                            case 2016:
                                return color(d.properties.nezap_p_2016);
 
                            }
                        })
                    })///odavde krenio
                    .on('click', function(d){
                        d3.select("#line_chart svg").remove();
                        console.log(d.properties.name);
                        var naslov_zupanije = d.properties.name;
                        
                        data1 = [{
                            "line_data": d.properties.nezap_p_2007,
                            "year": "2007"
                        }, {
                            "line_data": d.properties.nezap_p_2008,
                            "year": "2008"
                        }, {
                            "line_data": d.properties.nezap_p_2009,
                            "year": "2009"
                        }, {
                            "line_data": d.properties.nezap_p_2010,
                            "year": "2010"
                        }, {
                            "line_data": d.properties.nezap_p_2011,
                            "year": "2011"
                        }, {
                            "line_data": d.properties.nezap_p_2012,
                            "year": "2012"
                         }, {
                            "line_data": d.properties.nezap_p_2013,
                            "year": "2013"
                         }, {
                            "line_data": d.properties.nezap_p_2014,
                            "year": "2014"
                         }, {
                            "line_data": d.properties.nezap_p_2015,
                            "year": "2015"
                         }, {
                            "line_data": d.properties.nezap_p_2016,
                            "year": "2016"
                        }];
 
                        
                        drawChart(naslov_zupanije);
                        
                    });
   
   
 
   
   function lines(){
       
       
   }
   
   
    function drawChart(naslov){
        
    function make_x_axis() {        
        return d3.svg.axis()
            .scale(xScale)
             .orient("bottom")
             .ticks(10)
    }

    function make_y_axis() {        
        return d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(10)
    }
        
    var lg_margin = {top: 40, right: 30, bottom: 50, left: 50},
    lg_width = 500 - lg_margin.left - lg_margin.right,
    lg_height = 400 - lg_margin.top - lg_margin.bottom;
   
    var xScale = d3.scale.linear()
    .domain([2007, 2016])
    .range([0, lg_width]);
 
    var yScale = d3.scale.linear()
        .domain([0, 50])
        .range([lg_height, 0]);
    
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        //.innerTickSize(-lg_height)
        //.outerTickSize(0)
        //.tickPadding(10)
        .tickFormat(function(d, i) { return godine[i] });
 
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        //.innerTickSize(-lg_width)
        //.outerTickSize(0)
        //.tickPadding(10)
        .ticks(10);
    
        
    
        
    var lch = d3.select("#line_chart").append("svg")
        .attr("width", lg_width + lg_margin.left + lg_margin.right)
        .attr("height", lg_height + lg_margin.top + lg_margin.bottom)
        .append("g")
        .attr("transform", "translate(" + lg_margin.left + "," + lg_margin.top + ")");
 
    lch.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + lg_height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle");
   
        
    lch.append("text")
        .attr("x", (lg_width / 2))
        .attr("y", (lg_height + (lg_margin.bottom / 2)))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Godina");

        
        
    lch.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("dy", "-2.5em")
       .attr("dx", "-17em")
       .attr("transform", "rotate(-90)")
       .text("Vrijednost u postotcima [%]");
   
        
    lch.append("g")         
        .attr("class", "grid")
        .attr("transform", "translate(0," + lg_height + ")")
        .call(make_x_axis()
            .tickSize(-lg_height, 0, 0)
            .tickFormat("")
        )

    lch.append("g")         
        .attr("class", "grid")
        .call(make_y_axis()
            .tickSize(-lg_width, 0, 0)
            .tickFormat("")
        )
 
 
    /*svg.append("path")
       .data(line_data)
       .attr("class", "line")
       .attr("d", line);*/
    
    lch.append("text")
        .attr("x", (lg_width / 2))            
        .attr("y", 0 - (lg_margin.top / 2))
        .attr("text-anchor", "middle")  
        .attr("dy", "0.2em")
        .style("font-size", "23px")
        .style("font-weight", "bold")
        .text(naslov);
   
    var valueline = d3.svg.line()
                        .x(function(d) { return xScale(d.year); })
                        .y(function(d) { return yScale(d.line_data); })
                        .interpolate("basis");
        
    
 
   
    var linechart = lch.append("path")
                        .attr("d", valueline(data1))
                        .attr("class", "line")
                        .attr('stroke-width', 2)
                        .style("stroke", "blue")
                        .attr('fill', 'none');
        
    
    
               
}
   
   
   
   
   
   
 
}
);
}
 
drawMap(2007);
 
var slider = d3.slider()
    .min(2007)
    .max(2016)
    .ticks(10)
    .stepValues([2007,2008,2009,2010,2011,2012,2013,2014,2015,2016])
    .showRange(true)
    .value(2007)
    .callback(function() {
        console.log(slider.value());
        drawMap(slider.value());  
   
    });
 
// Render the slider in the div
d3.select('#slider').call(slider);

var w = 140, h = 400;

var key = d3.select("#lgnd").append("svg").attr("width", w).attr("height", h);

var legend = key.append("defs").append("svg:linearGradient").attr("id", "gradient").attr("x1", "100%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");

legend.append("stop").attr("offset", "0%").attr("stop-color", "#000033").attr("stop-opacity", 1);

legend.append("stop").attr("offset", "100%").attr("stop-color", "#aaeeff").attr("stop-opacity", 1);

key.append("rect").attr("width", w - 100).attr("height", h - 100).style("fill", "url(#gradient)").attr("transform", "translate(0,10)");

var y = d3.scale.linear().range([300, 0]).domain([0, 40]);

var yAxis = d3.svg.axis().scale(y).orient("right");

key.append("g").attr("class", "y axis").attr("transform", "translate(41,10)").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 30).attr("dy", ".71em").style("text-anchor", "end").text("[%]");
