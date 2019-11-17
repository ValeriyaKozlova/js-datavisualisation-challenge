/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 
Your name :     
Date :  
Contact information : 
What does this script do ? 
...
*/

// Your scripting goes here...

//AJAX
let div = document.createElement("div");
let h1 = document.getElementById("firstHeading");
div.setAttribute("id", "table");
h1.after(div);
let margin = {top: 10, right: 30, bottom: 30, left: 60};
let width = 800 - margin.left - margin.right;
let height = 400 - margin.top - margin.bottom;

let svg = d3.select(div)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#C5FFEA")
  .append("g")
    .attr("id", "svg")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
  
const api = "https://inside.becode.org/api/v1/data/random.json";

function getData() {
    let arrObj = [];
    let keys = [];
    let values = [];
    const svgEl = document.querySelector('#svg');
        svgEl.innerHTML = "";
    fetch(api)
        .then(function (data) {
            return data.json()
        })
        .then(function (data){
            data.forEach(value => {
                arrObj.push({
                    par1: value[0], par2: value[1]
                });
                keys.push(value[0]);
                values.push(value[1]);
            });
        })
        .then(function draw (){
            let  x = d3.scaleLinear()
                      .domain([0, 10])
                      .range([ 0, width]);
            svg.append("g")
              .attr("transform", "translate(0," + height/2 + ")")
              .call(d3.axisBottom(x));
            
            let y = d3.scaleLinear()
            .domain([-20, 20])
            .range([ height, 0 ]);
            svg.append("g")
            .call(d3.axisLeft(y));

            svg.append("path")
                .datum(arrObj)
                .attr("fill", "none")
                .attr("id", "path")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                                    .x(function(d) { return x(d.par1) })
                                    .y(function(d) { return y(d.par2) })
            );
        })
    setTimeout(() => {
    getData();
    }, 1000);
} // fn getData();
getData();


// Table 1
const table_1 = document.getElementById('table1');
const arrTab_1 = [];
const arr = [];
const years = [];
const pays = [];
const data = []
const tr = document.getElementById('table1').querySelectorAll("tr");
const td = document.getElementById('table1').querySelectorAll("td");
const th = document.getElementById('table1').querySelectorAll("th");

for(i = 0; i < td.length; i++){
    arr.push(td[i].innerHTML)
} 
for(let i = 0; i < arr.length; i+=12){
    let country = arr[i].split("(");
    pays.push(country[0]);
}
for(i = 0; i < th.length; i++){
    let regExp = /^[0-9]/ 
    if (regExp.test(th[i].innerHTML) == true){
        years.push(th[i].innerHTML);
    }
}
for (i = 0; i < arr.length; i++){
    let regExp = /^[a-zA-Z]/ 
    if (regExp.test(arr[i]) == false){
        let d = arr[i].replace(",", ".");
        let dat = d.replace(":", "0");
        data.push(parseFloat(dat));
    }
}

for(let i = 0; i < data.length; i+=11){
    arrTab_1.push(data.slice(i, i+11))
}

let div_2 = document.createElement("div");
let table1 = document.getElementById("table1");
div_2.setAttribute("id", "table_1");
table1.before(div_2);

//Buttons
for (i = 2; i < years.length +2; i++){
   let button = document.createElement("button");
    button.setAttribute("id", i);
    button.setAttribute("style", "height:40px;width:60px;margin:5px;background:#48A8EB;font-weight:bold; color:white");
    if (i < 10) {
        button.innerHTML = "200"+i;
    } else {button.innerHTML = "20"+i;}
    div_2.appendChild(button);
}

//Year
let h3 = document.createElement("h3");
h3.setAttribute("id", "h3");
h3.innerHTML = "Sélectionnez l'année, s'il vous plaît"
let lastbutton = document.getElementById(years.length+1);
lastbutton.after(h3);

//svg
let graphe = d3.select(div_2)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#C5FFEA")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")
    // .attr("id", "svg-chart");

// Axes: 
let  x_axis = d3.scaleBand()
    .domain(pays)
    .rangeRound([ 0, width], .05)
    .paddingInner([0.1])
	.paddingOuter([0.3])
    .align([0.5]);
graphe.append("g")
    .attr("transform", "translate(0," + (height - 90) + ")")
    .call(d3.axisBottom(x_axis))
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)" );
    
let y_axis = d3.scaleOrdinal()
    .domain([d3.min(data), d3.max(data)])
    .range([ (height-90), 0]);
graphe.append("g")
.call(d3.axisLeft(y_axis));


const grapheChart = graphe.append("g")
.attr("id", "svg-chart");


//Change data
const buttons = document.getElementById("table_1").querySelectorAll("button");
[...buttons].map(button => {
    button.addEventListener("click", e =>{
        h3.innerHTML = button.innerHTML;
        let barPadding = 5;
        let ind = button.id - 2;
        let d = [];
        document.getElementById('svg-chart').innerHTML = "";
        for (let i = 0; i < arrTab_1.length; i++){
            d.push(arrTab_1[i][ind])
        }
        let barWidth = (width/d.length);
console.log(d)

grapheChart.selectAll("bar")
.data(d)
.enter().append("rect")
.style("fill", "steelblue")
.attr("transform", function(d, i) {
        let translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
    })
.attr("width", width/d.length - barPadding)
.attr("y", function(d) {
    // console.log(y_axis(d.value));
    // console.log(height);
    return y_axis(d.value) - d/d3.max(data)*y_axis(d.value); })
.attr("height", function(d) {
    console.log(d3.max(data)*100);
    console.log(d);
    return d/d3.max(data)*y_axis(d.value); });


    });
});
//Table 2
const table_2 = document.getElementById('table2');
const arrTab_2 = [];
const arr_2 = [];
const data_2 = [];
let d_2 = [];
let years_2 = [];
let arrObj_2 = [];
const td_2 = document.getElementById('table2').querySelectorAll("td");
const th_2 = document.getElementById('table2').querySelectorAll("th");

//Get data
for(i = 0; i < td_2.length; i++){
    arr_2.push(td_2[i].innerHTML)
}
for(i = 0; i < th_2.length; i++){
    d_2.push(th_2[i].innerHTML)
}
for(i = 0; i < d_2.length; i++){
    let regExp = /^[0-9-]/ 
    if(regExp.test(d_2[i]) == true){
        years_2.push((d_2[i]))
    }
}
for (let i = 0; i < arr_2.length; i++){
    let regExp = /^[a-zA-Z]/ 
    if (regExp.test(arr_2) == true){
       let x = arr_2[i].split("(");
        data_2.push(x[0]);
    } else {
        data_2.push(arr_2[i]);
    }
}
data_2.map((element, index) => {
    if (element.includes("Angleterre")){
       data_2[index] = "Angleterre et pays de Galles";
    } 
    if (element.includes("IrlandeduNord")){
        data_2[index] = "Irlande du Nord";
    }
})
for (i = 0; i < data_2.length; i+=3){
   arrTab_2.push(data_2.slice(i, i+3));
   arrTab_2.sort();
}

//Change HTML
let div_3 = document.createElement("div");
div_3.setAttribute("id", "table_2");
table2.before(div_3);

// //Buttons
for (i = 0; i < arrTab_2.length; i++){
   let button_2 = document.createElement("button");
    button_2.setAttribute("id", i);
    button_2.setAttribute("style", "width:auto;margin:5px;padding:5px 15px;background:#48A8EB;font-weight:bold;color:white");
    button_2.innerHTML = arrTab_2[i][0];
    div_3.appendChild(button_2);
}

let area = d3.select(div_3)
.append("svg")
.attr("id", "area")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.style("background", "#C5FFEA")
    radius = Math.min(width, height) / 2,
    g = area.append("g").attr("transform", "translate(" + width / 2 + "," + height / 1.83 + ")").attr("padding-top", 10)

let color = d3.scaleOrdinal(['#4daf4a','#377eb8']);

// Generate the pie
let pie = d3.pie();

//legend
let legend = area.selectAll(".legend")
.data(pie(years_2))
.enter().append("g")
.attr("transform", function(d,i){
return "translate(" + (width - 110) + "," + (i * 15 + 20) + ")";
})
.attr("class", "legend");   

legend.append("rect")
.attr("width", 20)
.attr("height", 20)
.attr("fill", function(d, i) {
return color(i);
});

legend.append("text")
.text(function(d){
    return d.data;
   })
//   .text(years_2)
.style("font-size", 20)
.attr("y", 15)
.attr("x", 25);

let h3_2 = document.createElement("h3");
h3_2.setAttribute("id", "h3_2");
h3_2.innerHTML = "Sélectionnez le pays, s'il vous plaît"
let lb_2 = document.getElementById("area");
lb_2.before(h3_2);

const buttons_country = document.getElementById("table_2").querySelectorAll("button");
[...buttons_country].map(button => {
    button.addEventListener("click", e =>{
        h3_2.innerHTML = button.innerHTML + ", population carcérale, moyenne par an, (pour 100 000 habitants)";
        let d = [];
        let i = button.id;
        d.push(arrTab_2[i][1])
        d.push(arrTab_2[i][2])

// Generate the arcs
    let arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

//Generate groups
    let arcs = g.selectAll("arc")
                .data(pie(d))
                .enter()
                .append("g")
                .attr("class", "arc")

//Draw arc paths
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", arc);

    let labelArc = d3.arc()
        .outerRadius(radius - 60)
        .innerRadius(radius - 100);

    arcs.append("text")
        .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
        .text(function(d){return d.value})
        .style("fill", "#fff");
    });
});