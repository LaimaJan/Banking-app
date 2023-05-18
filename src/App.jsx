import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [firstName, setFirstName] = useState([]);
	const [lastName, setLastName] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = localStorage.getItem('users') || JSON.stringify([]);
		setUsers(JSON.parse(getUsers));
	}, ['']);

	const handleChangeFirstName = (e) => {
		setFirstName(e.target.value);
	};

	const handleChangeLastName = (e) => {
		setLastName(e.target.value);
	};

	const addUser = () => {
		const info = {
			id: users.length,
			name: firstName,
			surname: lastName,
			moneyAmount: 0,
		};

		localStorage.setItem('users', JSON.stringify([...users, info]));
		setUsers((current) => [...current, info]);

		console.log(users);
	};

	return (
		<div className="App">
			<div className="create-new-person">
				<h3>Sukurti nauja saskaita</h3>
				<form onSubmit={(e) => e.preventDefault()}>
					<label htmlFor="fname">Vardas:</label>
					<input
						type="text"
						name="name"
						value={firstName}
						onChange={handleChangeFirstName}
					/>
					<label htmlFor="lname">Pavarde:</label>
					<input
						type="text"
						name="lastname"
						value={lastName}
						onChange={handleChangeLastName}
					/>
					<input type="submit" value="Sukurti" onClick={addUser} />
				</form>
			</div>

			<div className="banking-list">
				<h2>SASKAITOS</h2>
				<table>
					<thead>
						<tr>
							<th>Vardas</th>
							<th>Pavarde</th>
							<th>Suma</th>
							<th></th>
							<th>Irasyti verte</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((person, index) => {
							return (
								<tr key={index}>
									<td>{person.name}</td>
									<td>{person.surname}</td>
									<td>{person.moneyAmount}</td>
									<td>
										<button>Istrinti</button>
									</td>
									<td>
										<input type="text">{}</input>
									</td>
									<td>
										<button>Prideti lesu</button>
									</td>
									<td>
										<button>Nuskaiciuoti lesas</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
