import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { loginStyle } from "src/style/loginStyle";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFormIV, loginForm } from "../interfaces";
import { useUserContext } from "src/contexts/userContexts/UserContext";
import { login } from "./loginLogic";

function Login() {
	const form = useForm(loginFormIV)
	const navigate = useNavigate()
	const { classes } = loginStyle()
	const [opened, setOpened] = useState(false);
	const [value, setValue] = useState('');
	const user = useUserContext().user

	const handleLogin = (values: loginForm) => {
		login(values)
			.then((res) => {
				if (res) {
					form.reset()
					navigate('/overview')
				}
			})
	}

	useEffect(() => {
		if (user) navigate('/OverView')
	},[user])

	return <div className="form">
		<form onSubmit={form.onSubmit((values: any) => handleLogin(values))}>
			<h2>Login</h2>
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
			<div className="button_wrapper">
				<Button type="submit">Login</Button>
				<Button onClick={() => navigate('/register')}>Register</Button>
			</div>
		</form>
	</div>
}
export default Login
