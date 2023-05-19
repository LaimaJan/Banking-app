import { popUpMessages } from '../data/PopUpMessages';

export function addMoney(
	users,
	id,
	moneyInputs,
	setUsers,
	setMoneyInputs,
	chooseAlertMessage
) {
	const updatedUsers = users.map((user) => {
		if (user.id == id) {
			user.moneyAmount += parseFloat(moneyInputs[id] || 0);
		}
		return user;
	});

	localStorage.setItem('users', JSON.stringify(updatedUsers));
	setUsers(updatedUsers);

	setMoneyInputs((prevMoneyInputs) => ({
		...prevMoneyInputs,
		[id]: '',
	}));

	const getAlertMessage = popUpMessages.map((message) => {
		return message.addedMoney;
	});

	chooseAlertMessage(getAlertMessage);
}
