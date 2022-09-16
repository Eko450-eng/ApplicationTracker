import { ActionIcon, Checkbox } from "@mantine/core";
import { User } from "firebase/auth"
import { DocumentData, Timestamp } from "firebase/firestore"
import { tableViewStyle } from "src/style/tableView";
import { X } from "tabler-icons-react";
import { initialValues } from "../interfaces"
import { handleDelete, setStatus } from "./tableViewLogic";

function SortedRows(p: { item: any, user: User, data: Array<initialValues | DocumentData>, hidden: boolean }) {
	const { classes } = tableViewStyle();

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
