import { popUpMessages } from '../data/PopUpMessages';

export function deductMoney(
	users,
	id,
	moneyInputs,
	setUsers,
	setMoneyInputs,
	chooseAlertMessage
) {
	const updatedUsers = users.map((user) => {
		if (user.id === id) {
			if (user.moneyAmount < parseFloat(moneyInputs[id] || 0)) {
				const getAlertMessage = popUpMessages.map((message) => {
					return message.notEnoughMoney;
				});

				chooseAlertMessage(getAlertMessage);

				return user;
			} else {
				user.moneyAmount -= parseFloat(moneyInputs[id] || 0);

				const getAlertMessage = popUpMessages.map((message) => {
					return message.deductedMoney;
				});

				chooseAlertMessage(getAlertMessage);

				return user;
			}
		}
		return user;
	});

	localStorage.setItem('users', JSON.stringify(updatedUsers));
	setUsers(updatedUsers);

	setMoneyInputs((prevMoneyInputs) => ({
		...prevMoneyInputs,
		[id]: '',
	}));
}
