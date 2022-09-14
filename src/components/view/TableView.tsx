import { Table, Checkbox, ScrollArea, ActionIcon } from '@mantine/core';
import { tableViewStyle } from '../../style/tableView';
import { initialValues } from '../interfaces';
import { handleDelete, setStatus } from './tableViewLogic';
import { Check, X } from 'tabler-icons-react'
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function TableView({ data, hidden }: any) {
	const { classes } = tableViewStyle();
	const [big, setBig] = useState<boolean>(false)

	const handleResize = ()=> {
		console.log(window.innerWidth)
		if(window.innerWidth < 872) setBig(false)
		if(window.innerWidth > 872) setBig(true)
	}

	useEffect(()=>{
		handleResize()
	}, [])

	window.addEventListener('resize', handleResize);


	const rows = data.map((item: initialValues, i: any) => {
		const applied = `${item.applied.toDate().getDay()}.${item.applied.toDate().getMonth()}.${item.applied.toDate().getFullYear()}`
		let invited = ""
		if (invited !== "") invited = `${item.invited.toDate().getDay()}.${item.invited.toDate().getMonth()}.${item.invited.toDate().getFullYear()}`
		if (hidden && item.declined) return null
		const now = Timestamp.now().toDate()
		const dateApplied = item.applied.toDate()
		const dayDiff: boolean = (now.getMonth() - dateApplied.getMonth()) >= 1

		return (
			<tr
				key={item.company + i}
				className={classes.rowSelected}
				style={{ background: dayDiff ? "purple" : "" }}
			>
				<td>
					<Checkbox
						checked={item.declined}
						onChange={() => setStatus("declined", item.company, !item.declined)}
						transitionDuration={0}
					/>
				</td>
				<td>
					<Checkbox
						checked={item.accepted}
						onChange={() => setStatus("accepted", item.company, !item.accepted)}
						transitionDuration={0}
					/>
				</td>
				<td>{item.company}</td>
				<td>{applied}</td>
				<td>{item.role}</td>
				<td>{invited}</td>
				<td>{item.location}</td>
				<td>{item.platform}</td>
				<td>{item.reason}</td>
				<td>{item.interview}</td>
				<td> <ActionIcon onClick={() => handleDelete(item.company)} > <X size={18} /> </ActionIcon> </td>
			</tr>
		);
	});

	return (
		<ScrollArea.Autosize maxHeight={"90vh"} mx="auto">
			<Table className="tableView" verticalSpacing="sm">
				<thead>
					<tr>
						<th style={{ color: "red" }}><X /></th>
						<th style={{ color: "green" }}><Check /></th>
						<th style={{ color: "white" }}>Company</th>
						<th style={{ color: "white" }}>Applied</th>
						<th style={{ color: "white" }}>Role</th>
						<th style={{ color: "white" }}>invited</th>
						<th style={{ color: "white" }}>Location</th>
						<th style={{ color: "white" }}>platform</th>
						<th style={{ color: "white" }}>reason</th>
						<th style={{ color: "white" }}>interview</th>
						<th style={{ color: "white" }}>Delete</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</ScrollArea.Autosize>
	);
}
