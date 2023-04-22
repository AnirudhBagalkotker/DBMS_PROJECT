function createNav() {
	document.getElementById('nav').innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="#">PRA</a>
		<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
			aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarNav">
			<ul class="navbar-nav">
				<li class="nav-item profile">
					<a class="nav-link" aria-current="page" href="/profile">Home</a>
				</li>
				<li class="nav-item property">
					<a class="nav-link" href="/property">Add Property</a>
				</li>
				<li class="nav-item rental">
					<a class="nav-link" href="/rentals">Rentals</a>
				</li>
				<li class="nav-item report">
					<a class="nav-link" href="/report">Report</a>
				</li>
				<li class="nav-item report">
					<a class="nav-link" href="/adduser">Add User</a>
				</li>
				<li class="nav-item logout">
					<a class="nav-link" href="/logout">Logout</a>
				</li>
			</ul>
		</div>
	</div>
</nav>`
}

createNav();