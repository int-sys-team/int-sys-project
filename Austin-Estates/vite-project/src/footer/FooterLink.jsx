import { Link } from '@mui/joy'
import React from 'react'

const FooterLink = ({ text }) => {
  return (
		<Link
			href="#"
			variant="p"
			component="a"
			sx={{
				fontSize: '0.9rem',
				fontWeight: '400',
				textDecoration: 'none',
				color: 'text.tertiary',
				textTransform: 'capitalize',
				'&:hover': {
					color: 'text.primary',
				},
			}}
		>
			{text}
		</Link>
  );
}

export default FooterLink