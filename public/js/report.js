const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const pid = document.getElementById('prop').value;
    fetch('/getData/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prop: pid })
    })
        .then(response => response.json())
        .then(data => {
            const property = document.getElementById('rowData');
            property.innerHTML = ''; // clear previous rows
            data.result.forEach(row => {
                let start_date = row.Start_date.slice(0, 10).replace('T', ' ');
                let end_date = row.End_date.slice(0, 10).replace('T', ' ');
                property.innerHTML += `
			<tr>
				<th scope="col">${row.RID}</th>
				<th scope="col">${row.Tenant}</th>
				<th scope="col">${row.Property}</th>
				<th scope="col">${start_date}</th>
				<th scope="col">${end_date}</th>
				<th scope="col">₹${row.rent}</th>
				<th scope="col">${row.Hike}%</th>
				<th scope="col">${row.Commission}%</th>
			</tr>
			`
            });
        })
        .catch(error => {
            console.log(error);
        });
});
