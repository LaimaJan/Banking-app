export default function Trows({
	name,
	surname,
	moneyAmount,
	deleteUser,
	inputValue,
	onChange,
	addMoney,
	deductMoney,
}) {
	return (
		<tr>
			<td>{name}</td>
			<td>{surname}</td>
			<td>{moneyAmount}</td>
			<td>
				<button id="delete-btn" onClick={deleteUser}>
					Ištrinti sąskaitą
				</button>
			</td>
			<td>
				<input type="text" value={inputValue} onChange={onChange} />
			</td>
			<td>
				<button id="add-money" onClick={addMoney}>
					Pridėti lėšų
				</button>
			</td>
			<td>
				<button id="deduct-money" onClick={deductMoney}>
					Nuskaičiuoti lėšas
				</button>
			</td>
		</tr>
	);
}
