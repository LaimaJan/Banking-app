import { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [users, setUsers] = useState([]);
	const [moneyInputs, setMoneyInputs] = useState({}); // Updated state variable
	const [isSorting, setIsSorting] = useState(false);

	useEffect(() => {
		const getUsers = localStorage.getItem('users') || JSON.stringify([]);
		setUsers(JSON.parse(getUsers));
	}, []);

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

		setFirstName('');
		setLastName('');
	};

	const removeUser = (id) => {
		const deleted = users.filter((user) => {
			if (user.id == id) {
				if (user.moneyAmount <= 0) {
					return false;
				} else {
					alert('Saskaitoje yra pinigu, istrinti negalima');

					return true;
				}
			}

			return true;
		});

		localStorage.setItem('users', JSON.stringify(deleted));
		setUsers(deleted);
	};

	const sortBySurname = () => {
		if (!isSorting) {
			setIsSorting(true);
			return;
		}

		// Creating new array with users to be able to change it without modifyind the original one
		const sortedUsers = [...users].sort(function (a, b) {
			if (a.surname.toLowerCase() < b.surname.toLowerCase()) return -1;
			if (a.surname.toLowerCase() > b.surname.toLowerCase()) return 1;
			return 0;
		});

		setUsers(sortedUsers);
	};

	const handleChange = (event, id) => {
		const { value } = event.target;
		const nonNegativeValue = value.replace(/[^0-9.]/g, '');
		setMoneyInputs((prevMoneyInputs) => ({
			...prevMoneyInputs,
			[id]: nonNegativeValue,
		}));
	};

	const addMoney = (id) => {
		const updatedUsers = users.map((user) => {
			if (user.id == id) {
				user.moneyAmount += parseFloat(moneyInputs[id] || 0); // Access the specific money input using the ID
			}
			return user;
		});

		localStorage.setItem('users', JSON.stringify(updatedUsers));
		setUsers(updatedUsers);

		setMoneyInputs((prevMoneyInputs) => ({
			...prevMoneyInputs,
			[id]: '', // Reset the input value for the specific ID
		}));
	};

	const deductMoney = (id) => {
		const updatedUsers = users.map((user) => {
			if (user.id === id) {
				if (user.moneyAmount < parseFloat(moneyInputs[id] || 0)) {
					alert('Nepakankamas likutis saskaitoje');
					return user;
				} else {
					user.moneyAmount -= parseFloat(moneyInputs[id] || 0); // Access the specific money input using the ID
					return user;
				}
			}
			return user;
		});

		localStorage.setItem('users', JSON.stringify(updatedUsers));
		setUsers(updatedUsers);

		setMoneyInputs((prevMoneyInputs) => ({
			...prevMoneyInputs,
			[id]: '', // Reset the input value for the specific ID
		}));
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
					<input type="submit" value="Sukurti" onClick={() => addUser()} />
				</form>
			</div>

			<div className="banking-list">
				<div className="title">
					<h2>SASKAITOS</h2>
				</div>
				<div className="sorting-button-container">
					<button onClick={sortBySurname}>Surusiuoti</button>
				</div>

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
						{users.map((user, index) => {
							return (
								<tr key={index}>
									<td>{user.name}</td>
									<td>{user.surname}</td>
									<td>{user.moneyAmount}</td>
									<td>
										<button onClick={() => removeUser(user.id)}>
											Istrinti
										</button>
									</td>
									<td>
										<input
											type="text"
											value={moneyInputs[user.id] || ''} // Access the specific money input using the ID
											onChange={(event) => handleChange(event, user.id)} // Pass the ID to the handleChange function
										/>
									</td>
									<td>
										<button id="add-money" onClick={() => addMoney(user.id)}>
											Prideti lesu
										</button>
									</td>
									<td>
										<button
											id="deduct-money"
											onClick={() => deductMoney(user.id)}
										>
											Nuskaiciuoti lesas
										</button>
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
