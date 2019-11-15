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
    button.setAttribute("style", "height:40px;width:60px;margin:5px;background:#48A8EB;font-weight:bold");
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
          "translate(" + margin.left + "," + margin.top + ")");

// Axes: 
let  x_axis = d3.scaleBand()
    .domain(pays)
    .range([ 0, width])
    .paddingInner([0.1])
	.paddingOuter([0.3])
    .align([0.5])
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

//Change data
const buttons = document.querySelectorAll("button");
[...buttons].map(button => {
    button.addEventListener("click", e =>{
        h3.innerHTML = button.innerHTML;
        let barPadding = 5;
        let ind = button.id - 2;
        let d = [];
        for (i = 0; i < arrTab_1.length; i++){
            d.push(arrTab_1[i][ind])
        }
        let barWidth = (width/d.length);
         graphe.selectAll("bar")
        .data(d)
        .enter().append("rect")
        .style("fill", "steelblue")
        .attr("x", function(d) { return x(d); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) {return height - d });
        // let barChat = graphe.selectAll("rect")
        // .data(d)
        // .enter()
        // .append("rect")
        // .attr("fill", "blue")
        // .attr("y", function(d){
        //     return height - d
        // })
        // .attr("width", barWidth - barPadding)
        // .attr("transform", function(d, i){
        //     let translate = [barWidth + i, 0];
        //     return "translate("+ translate + ")";
        // }) 
    });
});