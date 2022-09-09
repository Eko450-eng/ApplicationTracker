import { Button, Checkbox, createStyles, Menu, NativeSelect, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { DatePicker } from "@mantine/dates";
import { doc, setDoc, getFirestore, serverTimestamp, Timestamp } from "firebase/firestore";
import { app } from '../../firebase'
import { formStyle } from '../formComponents/FormComponents'
import { initialValues } from './interfaces'
import { read, utils, writeFile } from 'xlsx';

const db = getFirestore(app)
function Add() {

	const { classes } = formStyle()

	const addForm = useForm({
		initialValues: {
			id: "0",
			company: "",
			applied: Timestamp.now(),
			role: "",
			declined: false,
			invited: Timestamp.now(),
			platform: "LinkedIn",
			reason: "",
			interview: "",
			notes: "",
			location: ""
		}
	})

	const addCompany = async (values: initialValues) => {
		console.log(values.applied)
		console.log( typeof(values.applied) )
		await setDoc(doc(db, "applications", `${values.company}`), {
			id: "1",
			company: values.company,
			applied: values.applied,
			role: values.role,
			declined: values.declined,
			invited: values.invited,
			platform: values.platform,
			reason: values.reason,
			interview: values.interview,
			notes: values.notes,
			location: values.location
		});
		addForm.reset()
	}

	const upload = async (e: any) => {
		const file = e.target.files[0]
		const data = await file.arrayBuffer()
		const workbook = read(data)
		const worksheet = workbook.Sheets[workbook.SheetNames[0]]

		const jsonData = utils.sheet_to_json(worksheet)
		console.log(jsonData)

		jsonData.forEach((i: any) => {
			if (i.declined  === "x") i.declined = true
			if (i.invited == undefined) i.invited = serverTimestamp()
			if (i.reason == undefined) i.reason = ""
			if (i.interview == undefined) i.interview = ""
			if (i.notes == undefined) i.notes = ""
			if (i.platform == undefined) i.platform = "LinkedIn"
			if (i.location == undefined) i.location = "BaWü"
			i.declined = false
			addCompany(i)
		})

	}

	return (
		<div className="Add">
			<input type="file" name="Excel file" onChange={(e) => upload(e)} />
			<form onSubmit={addForm.onSubmit((v) => addCompany(v))}>
				<TextInput
					style={{ marginTop: 20 }}
					label="Company name"
					placeholder="Name of the Company"
					classNames={classes}
					{...addForm.getInputProps('company')}
				/>

				<DatePicker
					{...addForm.getInputProps('applied')}
					style={{ marginTop: 20 }}
					label="Applied"
					placeholder="When did you apply?"
					classNames={classes}
					clearable={true}
				/>

				<TextInput
					{...addForm.getInputProps('role')}
					style={{ marginTop: 20 }}
					label="Role"
					placeholder="Job role or position"
					classNames={classes}
				/>

				<TextInput
					{...addForm.getInputProps('location')}
					style={{ marginTop: 20 }}
					label="Location of company"
					placeholder="Stuttgart..."
					classNames={classes}
				/>

				<div>
					<p>Declined</p>
					<Checkbox
						{...addForm.getInputProps('declined')}
						style={{ marginBottom: 20 }}
					/>
				</div>

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
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
			</form>
		</div>
	)

}
export default Add
