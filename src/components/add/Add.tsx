import { Button, Checkbox, Menu, MultiSelect, NativeSelect, SelectItem, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { DatePicker } from "@mantine/dates";
import { defaultValue, initialValues, SettingsContextProps } from '../interfaces'
import { addCompany, setSettings } from "./addLogic";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContexts/UserContext";
import { IconChevronDown } from '@tabler/icons'
import { useEffect, useState } from "react";
import { formComponentsStyle } from "../../style/formComponentsStyle";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "src/firebase";


function Add() {
	const { classes } = formComponentsStyle()
	const [singleEntry, setSingleEntry] = useState<SettingsContextProps>()
	const [change, setChange] = useState<boolean>(false)
	const user = useUserContext().user
	const navigate = useNavigate()
	const addForm = useForm(defaultValue)

	const roles = [
		{ label: "Webdeveloper", value: "Webdeveloper" },
		{ label: "Frontend Dev", value: "Frontend Dev" },
	]


	const getSettings = () => {
		if (!user) return
		const s = doc(db, `users/${user.email}/`)
		onSnapshot(s, (setting) => {
			const settingsValue = setting.data()
			if(settingsValue) setSingleEntry({bulkEntries: settingsValue.bulkEntries})
		})
	}

	useEffect(() => {
		getSettings()
	}, [user])


	const handleSubmit = (v: initialValues) => {
		if (!user) return
		try {
			addCompany(user, v)
			addForm.reset()
			if (singleEntry && !singleEntry.bulkEntries) navigate('/')
		} catch (e) { console.log(e) }
	}

	return (
		<div className="form">
			<Button
				style={{ marginTop: 20 }}
				onClick={() => {
					if (singleEntry && user)
						setSettings(user, !singleEntry.bulkEntries, "bulkEntries")
					setChange(!change)
				}}
				variant={singleEntry && singleEntry.bulkEntries ? "filled" : "outline"}
			>Bulk entries</Button>
			<form onSubmit={addForm.onSubmit((v) => handleSubmit(v))}>
				<h2>Add new entry</h2>
				<TextInput
					style={{ marginTop: 20 }}
					label="Company name"
					placeholder="Name of the Company"
					classNames={classes}
					{...addForm.getInputProps('company')}
				/>

				<DatePicker
					{...addForm.getInputProps('applied')}
					label="Applied"
					placeholder={new Date().toDateString()}
					defaultValue={new Date()}
					style={{ marginTop: 20 }}
					classNames={classes}
					clearable={true}
				/>

				<MultiSelect
					label="Creatable MultiSelect"
					rightSection={<IconChevronDown />}
					style={{ marginTop: 20 }}
					classNames={classes}
					data={roles}
					placeholder="Select items"
					searchable
				/>

				<TextInput
					{...addForm.getInputProps('location')}
					style={{ marginTop: 20 }}
					label="Location of company"
					placeholder="Stuttgart..."
					classNames={classes}
				/>

				<div className="button_wrapper">
					<div>
						<p>Declined</p>
						<Checkbox
							{...addForm.getInputProps('declined')}
							style={{ marginBottom: 20 }}
						/>
					</div>
					<div>
						<p>Accepted</p>
						<Checkbox
							{...addForm.getInputProps('accepted')}
							style={{ marginBottom: 20 }}
						/>
					</div>
				</div>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<div className="button_wrapper">
						<Menu
							shadow="md"
							width={200}
						>
							<Menu.Target>
								<Button>Additional</Button>
							</Menu.Target>

							<Menu.Dropdown>
								<DatePicker
									{...addForm.getInputProps('invited')}
									style={{ marginBottom: 20 }}
									label="Invited"
									placeholder="When did they invite you?"
									classNames={classes}
									clearable={true}
								/>

								<NativeSelect
									{...addForm.getInputProps('platform')}
									style={{ marginBottom: 20 }}
									data={['LinkedIn', 'Stepstone', 'Google Search', 'Others']}
									placeholder="LinkedIn"
									label="Platform"
									description="Where did you find them?"
								/>

								<TextInput
									{...addForm.getInputProps('reason')}
									style={{ marginBottom: 20 }}
									label="Reason"
									placeholder="Why did happen what happened?"
									classNames={classes}
								/>

								<DatePicker
									{...addForm.getInputProps('interview')}
									style={{ marginBottom: 20 }}
									label="Interview"
									placeholder="When is the interview?"
									classNames={classes}
								/>


								<TextInput
									{...addForm.getInputProps('notes')}
									style={{ marginBottom: 20 }}
									label="Additional Notes"
									placeholder="Anything else?"
									classNames={classes}
								/>

							</Menu.Dropdown>
						</Menu>
						<Button type="submit">Save</Button>
					</div>
				</div>
			</form>
		</div>
	)

}
export default Add
