//to be implemented
import React, { useState, useEffect } from "react";
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Container,
  Button,
  Typography,
  Chip,
  Link,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";



function TeamMember({ role, name, imageUrl, description }) {
    return (
      <Grid
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            marginBottom: 5,
            fontWeight: "bold",
            color: "#f50057",
          }}
        >
          {role}
        </Typography>
        <Avatar alt={name} src={imageUrl} sx={{ width: 100, height: 100 }} />
        <Typography
          style={{
            fontWeight: 1000,
            fontSize: 19,
            marginTop: 3,
            marginBottom: 3,
          }}
        >
          {name}
        </Typography>
        <Typography>{description}</Typography>
        <SocialMediaButtons />
      </Grid>
    );
  }
  
  function SocialMediaButtons() {
    return (
      <Grid
        container
        style={{
          marginTop: 3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 10,
        }}
        spacing={3}
        sx={{ mb: 4 }}
      >
        <Button
          sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
          variant="contained"
          href="https://yahoo.com"
        >
          {" "}
          <FacebookIcon />{" "}
        </Button>
        <Button
          sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
          variant="contained"
          href="https://yahoo.com"
        >
          {" "}
          <InstagramIcon />{" "}
        </Button>
        <Button
          sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
          variant="contained"
          href="https://yahoo.com"
        >
          {" "}
          <TwitterIcon />{" "}
        </Button>
      </Grid>
    );
  }


export default function AboutUsPage(props) {
  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 3, mb: 4, mt: 2 }} variant="outlined">

          <Grid style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              component="h1"
              align="center"
              sx={{ fontSize: 40, color: "#bbbbbb" }}
            >
              GET TO KNOW{" "}
              <Link style={{ color: "#618fba", textDecoration: "none" }}>
                ESTATES
              </Link>
            </Typography>
          </Grid>
          <Grid>
            <Typography
              component="h1"
              align="center"
              sx={{ fontSize: 28, color: "#bbbbbb" }}
            >
              And the team behind it
            </Typography>
          </Grid>


          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHO ARE WE? </Divider>
            <Typography
              component="h1"
              align="center"
              sx={{ m: 2, color: "#bbbbbb" }}
            >
              Estates is beautiful. Estates is beautiful. Estates is
              beautiful. Estates is beautiful. Estates is beautiful.
              Estates is beautiful. Estates is beautiful. Estates is
              beautiful. Estates is beautiful. Estates is beautiful.
              Estates is beautiful. Estates is beautiful.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHAT DO WE OFFER? </Divider>

            <Chip sx={{ m: 1 }} label="FIND PAPERS" />
            <Chip sx={{ m: 1 }} label="PUBLISH PAPERS" />
            <Chip sx={{ m: 1 }} label="FIND PROCEEDINGS" />
            <Chip sx={{ m: 1 }} label="FIND AUTHORS" />
            <Chip sx={{ m: 1 }} label="EXPAND YOUR KNOWLEDGE" />
            <Chip sx={{ m: 1 }} label="LET OTHERS SEE YOUR WORK" />
            <Chip sx={{ m: 1 }} label="FREE FOREVER" />
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHO ARE OUR TEAM MEMBERS? </Divider>
            <Grid style={{display: "flex", flexDirection: "row",justifyContent: "space-around",}}>

                <Grid style={{display: "flex",flexDirection: "row",justifyContent: "space-around", }}>
                    <TeamMember
                    role="Head Back Developer"
                    name="Katarina Maksimovic"
                    imageUrl="/house-price-predict.jpg"
                    description="Emilija is one of the five lead developers of Estates. She
                    has been a valuable member of the RuntimeTerror team since it
                    first started out in 2022."
                    />
                    <TeamMember
                    role="Team Leader"
                    name="Aleksa Milic"
                    imageUrl="/house-price-predict.jpg"
                    description="Djordje is one of the five lead developers of Estates. He
                    has been a valuable member of the RuntimeTerror team since it
                    first started out in 2022."
                    />
                    <TeamMember
                    role="Head Front Developer"
                    name="Milica Stojanović"
                    imageUrl="/house-price-predict.jpg"
                    description="Matija is one of the five lead developers of Estates. He
                    has been a valuable member of the RuntimeTerror team since it
                    first started out in 2022."
                    />
                    
                </Grid>
                
            </Grid>

            <Grid style={{display: "flex", flexDirection: "row",justifyContent: "space-around",}}>

                <Grid style={{display: "flex",flexDirection: "row",justifyContent: "space-around", }}>
                    <TeamMember
                    role="LLM Developer"
                    name="Matija Speletic"
                    imageUrl="/house-price-predict.jpg"
                    description="Emilija is one of the five lead developers of Estates. She
                    has been a valuable member of the RuntimeTerror team since it
                    first started out in 2022."
                    />
                    <TeamMember
                    role="AI researcher"
                    name="Vuk Grujic"
                    imageUrl="/house-price-predict.jpg"
                    description="Djordje is one of the five lead developers of Estates. He
                    has been a valuable member of the RuntimeTerror team since it
                    first started out in 2022."
                    />
                    
                </Grid>
                
            </Grid>


            <Divider sx={{ mt: 5, mb: 3 }}>
              {" "}
              WANT TO REACH US ON SOCIAL MEDIA?{" "}
            </Divider>
            <Grid
              container
              style={{
                marginTop: 3,
                marginLeft: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <FacebookIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <InstagramIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <TwitterIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <LinkedInIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://yahoo.com"
              >
                {" "}
                <YouTubeIcon />{" "}
              </Button>
            </Grid>
          </Box>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
