import { Table, ScrollArea } from '@mantine/core';
import { initialValues } from '../interfaces';
import { Check, X } from 'tabler-icons-react'
import { DocumentData } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import SortedRows from './SortedRows';
import Titles from './Titles';



export function TableView(p: { currentDirection: boolean, user:User, data: Array<initialValues | DocumentData>, hidden: boolean, sortValue: any, sortDirection: any }) {
	const [direction, setDirection] = useState<boolean>(false)
	const [current, setCurrent] = useState<string>("company")

	const changeDirection = (v: boolean) => setDirection(v)

	useEffect(() => {
		p.sortValue(current)
	}, [current])

	return (
		<ScrollArea.Autosize maxHeight={"90vh"} mx="auto">
			<Table className="tableView" verticalSpacing="sm">
				<thead>
					<tr>
						<Titles setCurrent={(v: string) => setCurrent("declined")} current={p.currentDirection} title={<X />} parameter="declined" direction={(v: boolean) => p.sortDirection(v)}  textColor="red" />
						<Titles setCurrent={(v: string) => setCurrent("accepted")} current={p.currentDirection} title={<Check />} parameter="accepted" direction={(v: boolean) => p.sortDirection(v)}  textColor="green" />
						<Titles setCurrent={(v: string) => setCurrent("company")} current={p.currentDirection} title={"Company"} parameter="company" direction={(v: boolean) => p.sortDirection(v)}  />
						<Titles setCurrent={(v: string) => setCurrent("applied")} current={p.currentDirection} title={"Applied"} parameter="applied" direction={(v: boolean) => p.sortDirection(v)}  />
						<Titles setCurrent={(v: string) => setCurrent("role")} current={p.currentDirection} title={"Role"} parameter="role" direction={(v: boolean) => p.sortDirection(v)}  />
						<Titles setCurrent={(v: string) => setCurrent("invited")} current={p.currentDirection} title={"Invited"} parameter="invited" direction={(v: boolean) => p.sortDirection(v)}  />
						<Titles setCurrent={(v: string) => setCurrent("location")} current={p.currentDirection} title={"Location"} parameter="location" direction={(v: boolean) => p.sortDirection(v)}  />
						<Titles setCurrent={(v: string) => setCurrent("plattform")} current={p.currentDirection} title={"Plattform"} parameter="plattform" direction={(v: boolean) => p.sortDirection(v)}  />
						<Titles setCurrent={(v: string) => setCurrent("reason")} current={p.currentDirection} title={"Reason"} parameter="reason" direction={(v: boolean) => p.sortDirection(v)}  />
						<Titles setCurrent={(v: string) => setCurrent("interview")} current={p.currentDirection} title={"Interview"} parameter="interview" direction={(v: boolean) => p.sortDirection(v)}  />

						<th style={{ color: "white" }}>Delete</th>
					</tr>
				</thead>
				<tbody>{
					p.data.map((item: initialValues | DocumentData, i: any) => {
						return <SortedRows key={item.company + i} item={item} user={p.user} data={p.data} hidden={p.hidden} />
					})
				}</tbody>
			</Table>
		</ScrollArea.Autosize>
	);
}
