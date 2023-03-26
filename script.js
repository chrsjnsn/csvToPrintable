document.getElementById("upload-btn").addEventListener("click", function () {
  document.getElementById("csv-file").click();
});

document.getElementById("csv-file").addEventListener("change", function (event) {
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function () {
    let csvData = reader.result;
    let lines = csvData.split("\n");

    let records = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue;

      let fields = lines[i].split(",");
      records.push({
        lastName: fields[2],
        firstName: fields[1],
        birthDate: fields[3],
        deathDate: fields[4],
        cemeteryName: fields[10],
        cityName: fields[11],
        countyName: fields[12],
        stateName: fields[13]
      });
    }

    // Sort records alphabetically by last name, then by first name
    records.sort((a, b) => {
      if (a.lastName === b.lastName) {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return a.lastName.localeCompare(b.lastName);
      }
    });

    let content = document.getElementById("content");
    let header = records[0].cemeteryName + "<br>" + records[0].cityName + ", " + records[0].countyName + ", " + records[0].stateName;
    let list = "";
    for (let record of records) {
      let birthDate = record.birthDate === "" ? "????" : record.birthDate;
      let deathDate = record.deathDate === "" ? "????" : record.deathDate;
      list += `${record.firstName} ${record.lastName} ${birthDate}-${deathDate}<br>`;
    }

    content.innerHTML = `<h2>${header}</h2>${list}`;
  };
});
