import { useState, useEffect } from 'react';
import './App.css';
import Trows from './app/components/Trows/Trows';
import CreateNewUser from './app/components/CreateNewUser/CreateNewUser';
import { popUpMessages } from '../src/app/data/PopUpMessages';

import { deductMoney } from './app/functions/DeductMoney';
import { addMoney } from './app/functions/AddMoney';
import { removeUser } from './app/functions/RemoveUser';

function App() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [users, setUsers] = useState([]);
	const [moneyInputs, setMoneyInputs] = useState({});
	const [isSorting, setIsSorting] = useState(false);
	const [alert, setAlert] = useState(false);
	const [message, setMessage] = useState('');
	const [showMessage, setShowMessage] = useState(false);

	useEffect(() => {
		const getUsers = localStorage.getItem('users') || JSON.stringify([]);
		setUsers(JSON.parse(getUsers));
	}, []);

	const chooseAlertMessage = (getAlertMessage) => {
		if (!alert) {
			setAlert(true);

			setMessage(getAlertMessage);

			setShowMessage(true);
			setTimeout(() => setShowMessage(false), 2000);
			setTimeout(() => setAlert(false), 2000);

			return;
		}
	};

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

		const getAlertMessage = popUpMessages.map((message) => {
			return message.newUser;
		});

		chooseAlertMessage(getAlertMessage);

		setFirstName('');
		setLastName('');
	};

	const sortBySurname = () => {
		if (!isSorting) {
			setIsSorting(true);
			return;
		}

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

	return (
		<div className="App">
			<div className="container">
				<CreateNewUser
					onSubmit={(e) => e.preventDefault()}
					firstNameValue={firstName}
					handleChangeFirstName={handleChangeFirstName}
					lastNameValue={lastName}
					handleChangeLastName={handleChangeLastName}
					onClick={() => addUser()}
				/>

				<div className="message-container">
					{showMessage && (
						<div className="message">
							<p>{message}</p>
						</div>
					)}
				</div>
			</div>

			<div className="banking-list">
				<div className="title">
					<h2>SĄSKAITOS</h2>
				</div>
				<div className="sorting-button-container">
					<button onClick={sortBySurname}>Surūšiuoti</button>
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
								<Trows
									key={index}
									name={user.name}
									surname={user.surname}
									moneyAmount={user.moneyAmount}
									deleteUser={() =>
										removeUser(
											users,
											user.id,
											setUsers,
											chooseAlertMessage,
											popUpMessages
										)
									}
									inputValue={moneyInputs[user.id] || ''}
									onChange={(event) => handleChange(event, user.id)}
									addMoney={() =>
										addMoney(
											users,
											user.id,
											moneyInputs,
											setUsers,
											setMoneyInputs,
											chooseAlertMessage
										)
									}
									deductMoney={() =>
										deductMoney(
											users,
											user.id,
											moneyInputs,
											setUsers,
											setMoneyInputs,
											chooseAlertMessage
										)
									}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
