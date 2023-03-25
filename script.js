document.getElementById("csv-file").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function (e) {
    const contents = e.target.result;
    const formattedData = formatData(contents);
    document.getElementById("content").innerHTML = formattedData;
  };

  reader.readAsText(file);
});

function formatData(csvData) {
  const lines = csvData.split("\n");
  const headers = lines[0].split(",");

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const line = lines[i].split(",");
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = line[j];
    }
    
    data.push(obj);
  }

  const cemeteryInfo = `${data[0].cemeteryName}, ${data[0].cityName}, ${data[0].countyName}, ${data[0].stateName}\n\n`;

  const people = data.map(person => {
    const firstName = person.firstName;
    const lastName = person.lastName;
    const birthDate = person.birthDate || "????";
    const deathDate = person.deathDate || "????";
    
    return `${firstName} ${lastName} ${birthDate}-${deathDate}`;
  }).join("\n");

  return cemeteryInfo + people;
}
