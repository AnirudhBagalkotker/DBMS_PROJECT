fetch("/getData/property").then(response => response.json()).then(data => {
	const property = document.getElementById("rowData");
	data.result.forEach(row => {
		const add = row.Door + ", " + row.Street + ", " + row.city + ", " + row.state;
		let start_date = row.start_date.slice(0, 10).replace('T', ' ');
		let end_date = row.end_date.slice(0, 10).replace('T', ' ');
		let constr = row.construction.slice(0, 10).replace('T', ' ');
		let av = row.Available;
		available = "NO";
		if (av == 1) {
			available = "YES";
		}
		property.innerHTML += `
		<div id="propertytablerow_${row.PID}">
			<tr>
				<th scope="col" id="ownerField_${row.PID}">${row.Owner_UID}</th>
				<th scope="col" id="availField_${row.PID}">${row.Available}</th>
				<th scope="col" id="propertyField_${row.PID}">${row.PID}</th>
				<th scope="col" id="startdateField_${row.PID}">${start_date}</th>
				<th scope="col" id="enddateField_${row.PID}">${end_date}</th>
				<th scope="col" id="rentField_${row.PID}">${row.rent}</th>
				<th scope="col" id="hikeField_${row.PID}">${row.hike}</th>
				<th scope="col" id="areaField_${row.PID}">${row.area}</th>
				<th scope="col" id="plinthField_${row.PID}">${row.plinth}</th>
				<th scope="col" id="constructionField_${row.PID}">${constr}</th>
				<th scope="col" id="typeField_${row.PID}">${row.Type}</th>
				<th scope="col" id="bhkField_${row.PID}">${row.bhk}</th>
				<th scope="col" id="floorsField_${row.PID}">${row.floors}</th>
				<th scope="col" id="addressField_${row.PID}">${add}</th>
				<th scope="col"><button class="btn btn-primary m-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample_${row.PID}" aria-expanded="false"
				aria-controls="collapseExample_${row.PID}" id="editButton_${row.PID}">
				Edit</button></th>
				<th scope="col">
				<button class="btn btn-danger m-0" type="button" aria-expanded="false" aria-controls="collapseExample" id="deleteButton_${row.PID}">
				Delete</button></th>
			</tr>
			<form action="/editData/property" method="POST">
				<tr class="collapse" id="collapseExample_${row.PID}">
					<th scope="col"><input type="number" class="form-control w-100" id="ownerField"
							name="ownerField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="availableField"
							name="availableField"></th>
					<th scope="col"><input type="text" class="form-control w-auto" id="propertyField"
							name="propertyField"></th>
					<th scope="col"><input type="date" class="form-control w-auto" id="startdateField"
							name="startdateField"></th>
					<th scope="col"><input type="date" class="form-control w-auto" id="enddateField"
							name="enddateField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="rentField"
							name="rentField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="hikeField"
							name="hikeField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="areaField"
							name="areaField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="plinthField"
							name="plinthField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="constructionField"
							name="constructionField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="floorsField"
							name="floorsField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="typeField"
							name="typeField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="bhkField"
							name="bhkField"></th>
					<th scope="col"><input type="number" class="form-control w-100" id="addressField"
							name="addressField"></th>
					<th scope="col"><button class="btn btn-primary m-0" type="submit"
							aria-expanded="false" aria-controls="collapseExample">
							Save
						</button></th>
				</tr>
			</form>
		</div>
		`
	});
})