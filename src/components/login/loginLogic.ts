import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { loginForm } from "../interfaces";
const auth = getAuth()

export const login = (values: loginForm) => {
	let pass: boolean = false
	signInWithEmailAndPassword(auth, values.email, values.password)
		.then((userCredential) => { pass = true })
		.catch((error) => {
			console.log(error.code)
			pass = false
			if (error.code === "auth/wrong-password") alert("Wrong password")
			if (error.code === "auth/user-not-found") alert("User does not exist")
		});
	return new Promise((resolve) => resolve(pass))
}
