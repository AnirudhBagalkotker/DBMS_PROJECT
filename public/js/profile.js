fetch("/getData/profile")
	.then(response => response.json())
	.then(data => {
		const name = data.name;
		const age = data.age;
		const address = data.address;
		const aadhar = data.aadhar;
		const phone = data.phone;
		const role = data.roleName;
	})