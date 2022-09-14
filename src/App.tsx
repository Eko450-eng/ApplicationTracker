import { useState } from 'react';
import './style/style.scss';
import Add from './components/add/Add'
import OverView from './components/view/OverView';
import Navigation from './components/buttons/Navigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell, MantineProvider } from '@mantine/core';

function App() {
	const [hidden, setHidden] = useState(true)

	const setHiddenState = (v: boolean) => {
		setHidden(v)
	}

	return (
			<BrowserRouter>
				<MantineProvider theme={{
					colors: {
						gray: ["#F0F2F4", "#D5D9E1", "#BBC1CE", "#A0A9BB", "#8591A8", "#6B7994", "#556077", "#404859", "#2B303B", "#15181E"],
						red: ["#F8EDEE", "#EACCCF", "#DDACB0", "#D08B91", "#C36A73", "#B54A54", "#913B43", "#6D2C32", "#491D22", "#240F11"],
						orange: ["#F9EFEC", "#EDD2C9", "#E2B5A7", "#D79884", "#CB7B62", "#C05E3F", "#9A4B32", "#733826", "#4D2619", "#26130D"],
						yellow: ["#FBF5E9", "#F4E4C2", "#EED29B", "#E7C174", "#E0AF4D", "#D99D26", "#AE7E1E", "#825E17", "#573F0F", "#2B1F08"],
						green: ["#F4F7ED", "#E0E9CD", "#CCDBAE", "#B8CD8E", "#A4BF6E", "#90B14E", "#738D3F", "#576A2F", "#3A471F", "#1D2310"],
						teal: ["#EFEFF6", "#D3D2E4", "#B7B5D3", "#9B98C2", "#7F7CB1", "#635FA0", "#4F4C80", "#3B3960", "#282640", "#141320"],
						cyan: ["#EDF5F8", "#CCE4EB", "#ABD2DE", "#8AC1D1", "#69B0C4", "#489EB7", "#3A7F92", "#2B5F6E", "#1D3F49", "#0E2025"],
						blue: ["#EEF2F6", "#D0DAE7", "#B2C2D7", "#93ABC7", "#7593B8", "#577BA8", "#456387", "#344A65", "#233143", "#111922"],
						purple: ["#F5F0F4", "#E3D4E0", "#D0B8CC", "#BE9DB8", "#AC81A4", "#996690", "#7B5173", "#5C3D56", "#3D293A", "#1F141D"],
						white: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#ffffff", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
					}
				}} >
					<div className="App">
						<Navigation setHiddenState={(v: boolean) => setHiddenState(v)} hidden={hidden} />
						<Routes>
							<Route path="/" element={<OverView hidden={hidden} />} />
							<Route path="add" element={<Add />} />
						</Routes>
					</div>
				</MantineProvider>
			</BrowserRouter>
	);
}

export default App;
