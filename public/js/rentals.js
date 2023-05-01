fetch("/getData/rentals").then(response => response.json()).then(data => {
    const property = document.getElementById("rowData");
    data.result.forEach(row => {
        const add = row.Door + ", " + row.Street + ", " + row.city + ", " + row.state;
        let start_date = row.start_date.slice(0, 10).replace('T', ' ');
        let end_date = row.end_date.slice(0, 10).replace('T', ' ');
        let constr = row.construction.slice(0, 10).replace('T', ' ');
        console.log(add);
        property.innerHTML += `
        <tr id="row_${row.PID}">
            <th scope="col" id="ownerField_${row.PID}">${row.Owner_UID}</th>
            <th scope="col" id="propertyField_${row.PID}">${row.PID}</th>
            <th scope="col" id="startdateField_${row.PID}">${start_date}</th>
            <th scope="col" id="enddateField_${row.PID}">${end_date}</th>
            <th scope="col" id="rentField_${row.PID}">₹${row.rent}</th>
            <th scope="col" id="hikeField_${row.PID}">${row.hike}%</th>
            <th scope="col" id="areaField_${row.PID}">${row.area}</th>
            <th scope="col" id="plinthField_${row.PID}">${row.plinth}</th>
            <th scope="col" id="constructionField_${row.PID}">${constr}</th>
            <th scope="col" id="addressField_${row.PID}">${add}</th>
            <th scope="col" id="typeField_${row.PID}">${row.Type}</th>
            <th scope="col" id="floorsField_${row.PID}">${row.floors}</th>
            <th scope="col" id="bhkField_${row.PID}">${row.bhk}</th>
            <th scope="col"><button class="btn btn-primary m-0" type="button" id="rentButton_${row.PID}" onclick="rentout(${row.PID})">
            Rent
            </button></th>
        </tr>
		`
    });
})

async function rentout(PID) {
    let response = await fetch('/setData/rentout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prop: PID,
        })
    })

    let withdrawResponse = await response.json();
    console.log(withdrawResponse);
}
