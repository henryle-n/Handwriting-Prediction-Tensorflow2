function getLineGraph() {
  try {
    $.getJSON( "/api/lauch-history-by-country", function( data ) {
      xAxis = data.map(row => row.Country_of_Operator_Owner).slice(0,10);
      yAxis = data.map(row => row.Value_Counts).slice(0,10);
      
    const ctx = document.getElementById("HenryBarCounts")
    console.log("this is get ctx, ", ctx);
    ctx.getContext("2d");
    // if (screen.width <= 360) {
    //   myChartDom.height = 400;
    // } else {
    //   myChartDom.height = 200;
    // }
    const HenryBarCount = new Chart(ctx, {
      type: "bar",
      data: {
        labels: xAxis,
        datasets: [
          {
            label: `Satellite Counts`,
            data: yAxis,
            backgroundColor: "rgba(102, 221, 34, 0.6)",
            borderColor: "#447E23",
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
            display: true,
            text: 'Top 10 Satellite Owners/ Countries',
            fontSize : 30
        },
        legend: {
          display:false
        },
        scales: {
          yAxes: [{
            scaleLabel : {
              display: true,
              labelString: "Satellite Counts",
              fontSize: 20,
              fontColor : "#447E23"
            },
            
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [{
            scaleLabel : {
              display: true,
              labelString: "Satellite Owners/ Countries",
              fontSize: 20,
              fontColor : "#447E23"
            },
            
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
        layout: {
          padding: {
              left: 0,
              right:0,
              top: 0,
              bottom: 0
          },
        },
      },
    });
    return HenryBarCount;
    });
    
  } catch (error) {
    console.log(error);
  }
}


async function extractCountryData(countries) {
  try {
    let countryNamesData;
    await $.getJSON( "/api/lauch-history-by-country", function( data ) {
      countryNamesData = data;
    });    

    var matchedCountries = [];


    Object.values(countryNamesData).forEach( row => {

      switch (row.Country_of_Operator_Owner) {
        case "USA":
          updatedCountryName = "United States of America";
          break;
        case "UK":
          updatedCountryName = "United Kingdom";
          break;
        default:
          updatedCountryName = row.Country_of_Operator_Owner;
      }

      countries.forEach((countryObj) => {

        const { name } = (countryObj || {}).properties;
        if ((name || "").toLowerCase() === (updatedCountryName || "").toLowerCase()) {
          matchedCountries.push({...countryObj, countValue: row.Value_Counts,
          });
        }
      });
    });
    return matchedCountries;
    
  } catch (error) {
    console.log(error);
  }
}

 function getChoropleth() {
  try {
    fetch("https://unpkg.com/world-atlas/countries-50m.json")
      .then((r) => r.json())
      .then(async(data) => {
        let countries = ChartGeo.topojson.feature(data, data.objects.countries)
          .features;
        
        countries = await extractCountryData(countries);
        const chart = new Chart(
          document.getElementById("HenryChoroPleth").getContext("2d"),
          {
            type: "choropleth",
            data: {
              labels: countries.map((d) => d.properties.name),
              datasets: [
                {
                  label: "Countries",
                  data: countries.map((d) => ({
                    feature: d,
                    value: d.countValue,
                  })),
                },
              ],
            },
            options: {
              showOutline: true,
              showGraticule: true,
              legend: {
                display: false,
              },
              scale: {
                projection: "equalEarth",
              },
              geo: {
                colorScale: {
                  display: true,
                },
              },
            },
          }
        );
      });
  } catch (error) {
    console.log(error);
  }
}



function init() {
  try {
    getLineGraph();
    getChoropleth();
  } catch (error) {
    console.log(error);
  }
}

init();
