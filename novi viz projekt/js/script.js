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
 
d3.select("#chart").append("div").attr("id", "zupanija");
 
 
function drawMap(year) {
   
d3.json("cro_regv3.json", function (error, cro) {
    var data = topojson.feature (cro, cro.objects.layer1);
    var line_data = [0];
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
                    .style("stroke", "gray")
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
                                console.log(d.properties.nezap_p_2007);
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
                    })///odavde krenio
                    .on('click', function(d){
                        d3.select("#line_chart svg").remove();
                        console.log(d.properties.name);
    	                var naslov_zupanije = d.properties.name;
                        line_data[0] = d.properties.nezap_p_2007;
                        line_data[1] = d.properties.nezap_p_2008;
                        line_data[2] = d.properties.nezap_p_2009;
                        line_data[3] = d.properties.nezap_p_2010;
                        line_data[4] = d.properties.nezap_p_2011;
                        line_data[5] = d.properties.nezap_p_2012;
                        line_data[6] = d.properties.nezap_p_2013;
                        line_data[7] = d.properties.nezap_p_2014;
                        line_data[8] = d.properties.nezap_p_2015;
                        line_data[9] = d.properties.nezap_p_2016;
                        drawChart(naslov_zupanije);
                    });
   
   

    
    
    
    
    function drawChart(naslov){
	var lg_margin = {top: 20, right: 30, bottom: 20, left: 30},
    lg_width = 300 - lg_margin.left - lg_margin.right,
    lg_height = 200 - lg_margin.top - lg_margin.bottom;
   
    var xScale = d3.scale.linear()
    .domain(d3.range(line_data.length))
    .range([0, lg_width]);

    var yScale = d3.scale.linear()
        .domain([0, 100])
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

    var svg = d3.select("#line_chart").append("svg")
        .attr("width", lg_width + lg_margin.left + lg_margin.right)
        .attr("height", lg_height + lg_margin.top + lg_margin.bottom)
        .append("g")
        .attr("transform", "translate(" + lg_margin.left + "," + lg_margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + lg_height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "middle");
    
    svg.append("g")
       .attr("class", "y axis")
       .call(yAxis);
        /* .call("y axis")
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("transform", "translate(0," + lg_height + ")")
        .style("text-anchor", "end")
        .text("Vrijednost u postotcima");*/
    

    /*svg.append("path")
       .data(line_data)
       .attr("class", "line")
       .attr("d", line);*/
    
    svg.append("text")
    .attr("x", (width2 / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .attr("dy", "0.8em")
    .style("font-size", "23px") 
    .style("font-weight", "bold")  
    .text(naslov);
    
    var valueline = d3.svg.line()
                        .x(function(d, i) { return linedata[i]; })
                        .y(function(d) { return godine[d]; });

    
    var linechart = svg.append("path")
                        .attr("class", "line")
                        .attr("d", valueline(line_data))
                        .style("stroke", "blue");

               
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
 
 
