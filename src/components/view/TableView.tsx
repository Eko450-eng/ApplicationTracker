import { Table, Checkbox, ScrollArea, ActionIcon, TextInput, Button } from '@mantine/core';
import { tableViewStyle } from '../../style/tableView';
import { initialValues } from '../interfaces';
import { handleDelete, setStatus } from './tableViewLogic';
import { Check, X } from 'tabler-icons-react'
import { DocumentData, Timestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { ReactNode, useEffect, useState } from 'react';
import SortedRows from './SortedRows';
import Titles from './Titles';



export function TableView({ user, data, hidden }: { user: User, data: Array<initialValues | DocumentData>, hidden: boolean }) {
	const [sortParameter, setSortParameter] = useState<string>('')
	const [direction, setDirection] = useState<boolean>(false)
	const [finalData, setFinalData] = useState<any>()

	const changeParameter = (v: string) => setSortParameter(v)
	const changeDirection = (v: boolean) => setDirection(v)

	// Make reversee sorting
	// Fix the bug that when one row is already sorted you cant sort to another row
	// I'm done for today you got this tomorrow bro

	return (
		<ScrollArea.Autosize maxHeight={"90vh"} mx="auto">
			<Table className="tableView" verticalSpacing="sm">
				<thead>
					<tr>
						<Titles title={<X />} parameter="declined" direction={(v:boolean)=> changeDirection(v) } sort={(v: string) => changeParameter(v)} textColor="red" />

						<th onClick={
							() => setSortParameter("company")
						}
							style={{ color: "white" }}>Company</th>
						<th onClick={
							() => setSortParameter("applied")
						}
							style={{ color: "white" }}>Applied</th>
						<th onClick={
							() => setSortParameter("role")
						}
							style={{ color: "white" }}>Role</th>
						<th onClick={
							() => setSortParameter("invited")
						}
							style={{ color: "white" }}>invited</th>
						<th onClick={
							() => setSortParameter("location")
						}
							style={{ color: "white" }}>Location</th>
						<th onClick={
							() => setSortParameter("plattform")
						}
							style={{ color: "white" }}>platform</th>
						<th onClick={
							() => setSortParameter("reason")
						}
							style={{ color: "white" }}>reason</th>
						<th onClick={
							() => setSortParameter("interview")
						}
							style={{ color: "white" }}>interview</th>

						<th style={{ color: "white" }}>Delete</th>
					</tr>
				</thead>
				{/* <tbody>{SortedRows(user, data, hidden, sortParameter)}</tbody> */}
				<tbody>{
					data.map((item: initialValues | DocumentData, i: any) => {
						return <SortedRows direction={direction} key={item.company + i} item={item} user={user} data={data} hidden={hidden} sortParameter={sortParameter} />
					})
				}</tbody>
			</Table>
		</ScrollArea.Autosize>
	);
}
