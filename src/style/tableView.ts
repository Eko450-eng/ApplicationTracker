import { createStyles } from "@mantine/core";

export const tableViewStyle = createStyles((theme) => ({
	rowSelected: {
		color: "white",
		":hover": {
			backgroundColor: theme.colors.blue
		},
		backgroundColor:
			theme.colorScheme === 'light'
				? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
				: theme.colors[theme.primaryColor][0],
	},
}));
