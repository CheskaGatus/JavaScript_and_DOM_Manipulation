// from data.js
var tableData = data;

// Variables
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");

// Create table
var tbody = d3.select("tbody");

var populate = (x) => {
    x.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });  
};

//Populate table
populate(tableData);

// Select filter button 
var filterbutton = d3.select("#filter-btn");
filterbutton.on("click", () => {
    // Prevent page from refreshing
    d3.event.preventDefault();
    // Filter by attribute
    var inputDate = inputField1.property("value").trim();
    var inputCity = inputField2.property("value").toLowerCase().trim();
    
    // Filter by field matching input value
    var filterDate = tableData.filter(data => data.datetime === inputDate);
    console.log(filterDate)
    var filterCity = tableData.filter(data => data.city === inputCity);
    console.log(filterCity)
    var filterData = tableData.filter(data => data.datetime === inputDate && data.city === inputCity);
    console.log(filterData)

  // Add filtered sighting to table
  tbody.html("");
  
   let response = {filterData, filterDate, filterCity};
  
    if (response.filterData.length !== 0) {
    populate(filterData);
  }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
      populate(filterCity) || populate(filterDate);
  
    }
    else {
      tbody.append("tr").append("td").text("No results found!"); 
    }
})

var resetbtn = d3.select("#reset-btn");
resetbtn.on("click", () => {
  tbody.html("");
  populate(tableData)
  console.log("Table reset")
})