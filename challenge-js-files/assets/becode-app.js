/* 
// WRITE YOUR JAVASCRIPT BELOW THIS COMMENT 
Your name :     
Date :  
Contact information : 
What does this script do ? 
...
*/

// Your scripting goes here...

let div = document.createElement("div");
let h1 = document.getElementById("firstHeading");
div.setAttribute("id", "table");
h1.after(div);
let margin = {top: 10, right: 30, bottom: 30, left: 60};
let width = 700 - margin.left - margin.right;
let height = 300 - margin.top - margin.bottom;

let svg = d3.select(div)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#C5FFEA")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
          
const api = "https://inside.becode.org/api/v1/data/random.json";
let arrObj = [];
let keys = [];
let values = [];
let data = [];

 function getData(){
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
})
})
.then (function draw (){

let  x = d3.scaleLinear()
    .domain([0, d3.max(keys)])
    .range([ 0, width]);
    svg.append("g")
    .attr("transform", "translate(0," + height/2 + ")")
    .call(d3.axisBottom(x))

console.log(arrObj)

    svg.append("path")
    .datum(arrObj)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(30)
      .y(40)
      )
  
let y = d3.scaleLinear()
    .domain([-20, 20])
    .range([ height, 0 ]);
    svg.append("g")
    .call(d3.axisLeft(y));

svg.append("path")
.datum(arrObj)
.attr("fill", "none")
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
    } getData()

// let test = d3.json("https://inside.becode.org/api/v1/data/random.json");
// console.log(test)

// d3.json("https://inside.becode.org/api/v1/data/random.json")
// .then(function(data){
//     return data;
// });