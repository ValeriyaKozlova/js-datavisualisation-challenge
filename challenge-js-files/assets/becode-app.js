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
            });
        })
        .then(function draw (){
            let  x = d3.scaleLinear()
                                    .domain([0, d3.max(keys)])
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
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                                    .x(function(d) { return x(d.par1) })
                                    .y(function(d) { return y(d.par2) })
            );
        }); // function draw
   
    setTimeout(() => {
    // getData();
    // document.querySelector("path").exit().remove()
    }, 1000);
} // fn getData();
getData();

// Table 1
const table_1 = document.getElementById('table1');
const arrTab_1 = [];
const arr = [];
const years = [];
const pays = [];
const tr = document.getElementById('table1').querySelectorAll("tr");
const td = document.getElementById('table1').querySelectorAll("td");
const th = document.getElementById('table1').querySelectorAll("th");

for(i = 0; i < td.length; i++){
    arr.push(td[i].innerHTML)
} 
for(let i = 0; i < arr.length; i+=12){
    arrTab_1.push(arr.slice(i, i+12))
    pays.push(arr[i]);
}
for(i = 0; i < th.length; i++){
    let regExp = /^[0-9]/ 
    if (regExp.test(th[i].innerHTML) == true){
        let date = new Date(th[i].innerHTML)
        let formatTime = d3.timeFormat("%Y")
        formatTime(date);   
        years.push(formatTime)
    }
}

let div_2 = document.createElement("div");
let table1 = document.getElementById("table1");
div_2.setAttribute("id", "table_1");
table1.before(div_2);

//Buttons
for (i = 2; i < years.length +2; i++){
    let button = document.createElement("button");
    button.setAttribute("id", "button"+i);
    button.setAttribute("style", "height:40px;width:60px;margin:5px;background:#48A8EB;font-weight:bold");
    button.innerHTML = "200"+i;
    div_2.appendChild(button);
}

// [...buttons].map(button => {
//     button.addEventListener("click", e =>{
//         e.preventDefault();
        
//     });
// });

//svg
let graphe = d3.select(div_2)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("background", "#C5FFEA")
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


// Axes: 
let  x_axis = d3.scaleTime()
    .domain(pays)
    .range([ 0, width]);
    graphe.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x_axis));
  
let y_axis = d3.scaleLinear()
    .domain([d3.min(years), d3.max(years)])
    .range([ height, 0]);
    graphe.append("g")
    .call(d3.axisLeft(y_axis));

    console.log(years)
// let y_axis = d3.axisLeft()
// .scale(yScale);

// let x_axis = d3.axisBottom()
// .scale(xScale);

// graphe.append("g")
// .attr("transform", "translate(50,10)")
// .call(y_axis);

// let xAxisTranslate = height - 20;

// graphe.append("g")
// .attr("tranform", "translate(50, 3 + xAxisTranslate + ")");
// .call(x_axis);

//barChat
// let barWidth = (width/arrTab_1.length);
// let barPadding = 5;

// let barChat = graphe.selectAll("rect")
// .data(arrTab_1)
// .enter()
// .append("rect")
// .attr("y", function(d){
//     return height - d
// })
// .attr("width", barWidth - barPadding)
// .attr("transform", function(d, i){
//     let translate = [barWidth + i, 0];
//     return "translate("+ translate + ")";
// });

// console.log(arrTab_1);
// console.log(years);