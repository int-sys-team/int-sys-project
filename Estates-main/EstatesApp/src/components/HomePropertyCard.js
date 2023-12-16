import { Button, Card, Divider, Typography, Grid, Checkbox, CardMedia, Box } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PropertyCard({
    id, name, photo, description, address, area, price, amenities
}) {

    const navigate = useNavigate();
    //{/* backgroundColor: "#FEBB0277", border: "none" }}>*/}
    return (
        <Card  >
            <CardMedia
                component="img"
                onClick={()=>{navigate("/PropertyProfile/"+id)}}
                image={photo}
                alt="EstatesCopyright"
            />

            <Grid container spacing={0} sx={{ p: 2 }} >

                <Grid item xs={12} md={8} >
                    <Typography
                        align="left"
                        variant="h5"
                        sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            color: "#0071C2",
                            fontWeight: "bold"
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        align="left"
                        variant="body1"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}

                    >
                        <LocationOnIcon sx={{ color: "#FEBB02" }} />
                        {address}
                    </Typography>
                    <Typography
                        align="left"
                        variant="body2"
                        sx={{ p: 1 }}
                    >
                        {description}
                    </Typography>

                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", gap: 0, flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                        <Typography
                            align="left"
                            variant="h5"
                            sx={{ display: "flex", alignItems: "center" }}


                        >
                            <SquareFootIcon sx={{ color: "#FEBB02" }} fontSize="large" />
                            {area}
                        </Typography>
                        <Typography
                            align="left"
                            variant="h4"
                            sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
                            color="error"
                        >
                            <AttachMoneyIcon color="error" fontSize="large" />
                            {price}
                        </Typography>

                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}