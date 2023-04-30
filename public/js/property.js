fetch("/getData/property").then(response => response.json()).then(data => {
	const property = document.getElementById("rowData");
	data.result.forEach(row => {
		const add = row.Door + ", " + row.Street + ", " + row.city + ", " + row.state;
		let start = row.start_date.slice(0, 10).replace('T', ' ');
		let end = row.end_date.slice(0, 10).replace('T', ' ');
		let av = row.Available;
		available = "NO";
		if (av == 1) {
			available = "YES";
		}
		property.innerHTML += `<th scope="row">Own</th>
		<td>${add}</td>
		<td>${available}</td>
		<td>${row.rent}</td>
		<td>${row.hike}</td>
		<td>${row.floors}</td>
		<td>${row.bhk}</td>
		<td>${start}</td>
		<td>${end}</td>
		`
	});
})