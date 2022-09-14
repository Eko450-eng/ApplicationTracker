import { Button, Checkbox, FileButton, Menu, NativeSelect, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { DatePicker } from "@mantine/dates";
import { defaultValue, initialValues } from '../interfaces'
import { addCompany, upload } from "./addLogic";
import { formComponentsStyle } from "../../style/formComponentsStyle";
import { useNavigate } from "react-router-dom";

function Add() {
	const { classes } = formComponentsStyle()
	const navigate = useNavigate()
	const addForm = useForm(defaultValue)
	const handleSubmit = (v: initialValues) => {
		try {
			addCompany(v)
			addForm.reset()
			navigate('/')
		}catch(e){
			console.log(e)
		}
	}

	return (
		<div className="Add">
			<form onSubmit={addForm.onSubmit((v) => handleSubmit(v))}>
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
					placeholder="When did you apply?"
					style={{ marginTop: 20 }}
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
			<FileButton onChange={(e) => upload(e)} accept="xlsx">
				{(props) => <Button style={{ marginTop: 20 }} {...props}>Upload XLSX</Button>}
			</FileButton>

		</div>
	)

}
export default Add
