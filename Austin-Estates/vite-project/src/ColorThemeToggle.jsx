import React, { useEffect } from 'react';
import {  useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

export default function ColorSchemeToggle() {
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return null;
	}
	return (
		<IconButton
			id="toggle-mode"
			size="md"
			variant="soft"
			color="neutral"
			onClick={() => {
				if (mode === 'light') {
					setMode('dark');
				} else {
					setMode('light');
				}
			}}
			sx={{
				borderRadius: '50%',
			}}
		>
			{mode === 'light' ? (
				<DarkModeRoundedIcon />
			) : (
				<LightModeRoundedIcon />
			)}
		</IconButton>
	);
}
