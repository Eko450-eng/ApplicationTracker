import { ActionIcon, Checkbox } from "@mantine/core";
import { User } from "firebase/auth"
import { DocumentData, Timestamp } from "firebase/firestore"
import { tableViewStyle } from "src/style/tableView";
import { X } from "tabler-icons-react";
import { initialValues } from "../interfaces"
import { handleDelete, setStatus } from "./tableViewLogic";

function SortedRows(p: { direction: boolean, item: any, user: User, data: Array<initialValues | DocumentData>, hidden: boolean, sortParameter: string }) {
	const { classes } = tableViewStyle();
	let data = p.data

	data = data.sort((a: initialValues | DocumentData, b: initialValues | DocumentData) => {
		switch (p.sortParameter) {
			case "company":
				if (a.company > b.company) return 1
				return -1
			case "applied":
				if (a.applied > b.applied) return 1
				return -1
			case "role":
				if (a.role > b.role) return 1
				return -1
			case "declined":
				if (a.declined) return 1
				return -1
			case "accepted":
				if (a.accepted) return 1
				return -1
			case "location":
				if (a.additional.location > b.additional.location) return 1
				return -1
			case "plattform":
				if (a.additional.invited > b.additional.invited) return 1
				return -1
			case "interview":
				if (a.additional.interview > b.additional.interview) return 1
				return -1
			case "reason":
				if (a.additional.reason > b.additional.reason) return 1
				return -1
			case "invited":
				if (a.additional.invited > b.additional.invited) return 1
				return -1
			default:
				return 1
		}
	})

	let invited = ""
	if (invited !== "") invited = `${p.item.additional.invited.toDate().getDay()}.${p.item.additional.invited.toDate().getMonth()}.${p.item.additional.invited.toDate().getFullYear()}`
	if (p.hidden && p.item.declined) return null
	const now = Timestamp.now().toDate()
	const dateApplied = p.item.applied.toDate()
	const applied = `${p.item.applied.toDate().getDay()}.${p.item.applied.toDate().getMonth()}.${p.item.applied.toDate().getFullYear()}`
	const dayDiff: boolean = (now.getMonth() - dateApplied.getMonth()) >= 1

	return (
		<tr
			className={classes.rowSelected}
			style={{ background: dayDiff ? "purple" : "" }}
		>
			<td>
				<Checkbox
					checked={p.item.declined}
					onChange={() => setStatus(p.user, p.item.id, "declined", p.item.company!, !p.item.declined)}
					transitionDuration={0}
				/>
			</td>
			<td>
				<Checkbox
					checked={p.item.accpted}
					onChange={() => setStatus(p.user, p.item.id, "accepted", p.item.company!, !p.item.accepted)}
					transitionDuration={0}
				/>
			</td>
			<td>{p.item.company}</td>
			<td>{applied}</td>
			<td>{p.item.role}</td>
			<td>{invited}</td>
			<td>{p.item.additional.location}</td>
			<td>{p.item.additional.platform}</td>
			<td>{p.item.additional.reason}</td>
			<td>{p.item.additional.interview}</td>
			<td> <ActionIcon onClick={() => handleDelete(p.user, p.item.id)} > <X size={18} /> </ActionIcon> </td>
		</tr>
	);
}
export default SortedRows
