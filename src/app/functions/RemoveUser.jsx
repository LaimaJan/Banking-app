export function removeUser(
	users,
	id,
	setUsers,
	chooseAlertMessage,
	popUpMessages
) {
	const deleted = users.filter((user) => {
		if (user.id == id) {
			if (user.moneyAmount <= 0) {
				const getAlertMessage = popUpMessages.map((message) => {
					return message.userDeleted;
				});

				chooseAlertMessage(getAlertMessage);

				return false;
			} else {
				const getAlertMessage = popUpMessages.map((message) => {
					return message.doNotRemoveUser;
				});

				chooseAlertMessage(getAlertMessage);

				return true;
			}
		}

		return true;
	});

	localStorage.setItem('users', JSON.stringify(deleted));
	setUsers(deleted);
}
