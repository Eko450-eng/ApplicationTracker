import { Button, PasswordInput, TextInput, Tooltip } from "@mantine/core";
import { loginStyle } from "../../style/loginStyle";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { registerForm, registerFormIV } from '../interfaces'
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
	const auth = getAuth();
	const form = useForm(registerFormIV)
	const navigate = useNavigate()
	const { classes } = loginStyle()
	const [opened, setOpened] = useState(false);
	const [passConfirm, setPassConfirm] = useState("");
	const [value, setValue] = useState('');

	const handleRegister = (values: registerForm) => {
		if (values.password !== values.passwordConfirm) alert("Passwords dont match")
		createUserWithEmailAndPassword(auth, values.email, values.password)
			.then((userCredential) => {
				const user = userCredential.user;
				form.reset()
				navigate('/')
			})
			.catch((error) => {
				if(error.code === "auth/email-already-in-use") alert("This email is already in use")
			});
	}

	return <div className="form">
		<form onSubmit={form.onSubmit((values: registerForm) => handleRegister(values))}>
			<h2>Register</h2>
			<TextInput
				label="Email"
				placeholder="Email"
				classNames={{ input: classes.invalid }}
				style={{ color: "white", }}
				{...form.getInputProps("email")}
			/>

			<PasswordInput
				label="Password"
				required
				placeholder="Your password"
				onFocus={() => setOpened(true)}
				onBlur={() => setOpened(false)}
				mt="md"
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
				{...form.getInputProps("password")}
			/>

			<PasswordInput
				label="Confirm password"
				required
				placeholder="Repeat your password"
				mt="md"
				value={passConfirm}
				onChange={(event) => setPassConfirm(event.currentTarget.value)}
				{...form.getInputProps("passwordConfirm")}
			/>
			<div className="button_wrapper">
			<Button type="submit">Register</Button>
			</div>
		</form>
	</div>
}
export default Register
