import { createStyles, Table, Checkbox, ScrollArea } from '@mantine/core';
import { initialValues } from '../edit/interfaces';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const useStyles = createStyles((theme) => ({
	rowSelected: {
		color: "white",
		":hover": {
			backgroundColor: theme.colors.blue
		},
		backgroundColor:
			theme.colorScheme === 'light'
				? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
				: theme.colors[theme.primaryColor][0],
	},
}));

export function TableView({ data }: any) {
	const { classes, cx } = useStyles();

	const setDeclined = async (company: string | undefined, state: boolean) => {
		if (company === undefined) return
		const docRef = doc(db, "applications", company)
		await updateDoc(docRef, {
			declined: state
		})
	}

	const rows = data.map((item: initialValues, i: any) => {
		const applied = `${item.applied.toDate().getDay()}.${item.applied.toDate().getMonth()}.${item.applied.toDate().getFullYear()}`
		let invited = ""
		if (invited !== "") invited = `${item.invited.toDate().getDay()}.${item.invited.toDate().getMonth()}.${item.invited.toDate().getFullYear()}`
		return (
			<tr
				key={item.company + i}
				className={classes.rowSelected}
				onClick={() => setDeclined(item.company, !item.declined)}
			>
				<td>
					<Checkbox
						checked={item.declined}
						style={{ display: "flex", justifyContent: "center" }}
						onChange={() => setDeclined(item.company, !item.declined)}
						transitionDuration={0}
					/>
				</td>
				<td>{item.company}</td>
				<td>{applied}</td>
				<td>{item.role}</td>
				<td>{item.location}</td>
				<td>{invited}</td>
				<td>{item.platform}</td>
				<td>{item.reason}</td>
				<td>{item.interview}</td>
				<td>{item.notes}</td>
			</tr>
		);
	});

	return (
		<ScrollArea.Autosize maxHeight={"90vh"} sx={{ maxWidth: "100%" }} mx="auto">
			<Table sx={{ minWidth: 800 }} verticalSpacing="sm">
				<thead>
					<tr>
						<th style={{ color: "white" }}>Declined</th>
						<th style={{ color: "white" }}>Company</th>
						<th style={{ color: "white" }}>Applied</th>
						<th style={{ color: "white" }}>Role</th>
						<th style={{ color: "white" }}>Location</th>
						<th style={{ color: "white" }}>invited</th>
						<th style={{ color: "white" }}>platform</th>
						<th style={{ color: "white" }}>reason</th>
						<th style={{ color: "white" }}>interview</th>
						<th style={{ color: "white" }}>notes</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</ScrollArea.Autosize>
	);
}
