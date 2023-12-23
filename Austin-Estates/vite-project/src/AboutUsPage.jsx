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
        <Typography style={{ textAlign: "center" }}>{description}</Typography>
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
          href="https://github.com/int-sys-team/int-sys-project"
        >
          {" "}
          <FacebookIcon />{" "}
        </Button>
        <Button
          sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
          variant="contained"
          href="https://github.com/int-sys-team/int-sys-project"
        >
          {" "}
          <InstagramIcon />{" "}
        </Button>
        <Button
          sx={{ m: 1, borderRadius: 50, backgroundColor: "#f50057" }}
          variant="contained"
          href="https://github.com/int-sys-team/int-sys-project"
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
              GET TO KNOW AUSTIN{" "}
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
              Welcome to Austin Estates, the future of real estate. Leveraging the power of AI, we provide a seamless and personalized experience for buying and selling properties. Discover the perfect home with our webiste.
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHAT DO WE OFFER? </Divider>

            <Chip sx={{ m: 1 }} label="FIND YOUR DREAM HOME" />
            <Chip sx={{ m: 1 }} label="SELL YOUR PROPERTY" />
            <Chip sx={{ m: 1 }} label="AI-POWERED RECOMMENDATIONS" />
            <Chip sx={{ m: 1 }} label="COMPARE PROPERTY PRICES" />
            <Chip sx={{ m: 1 }} label="EXPLORE NEIGHBORHOODS" />
            <Chip sx={{ m: 1 }} label="DISCOVER HOUSING TRENDS" />
            <Chip sx={{ m: 1 }} label="FREE TO USE" />
          </Box>

          <Box sx={{ mb: 3 }} variant="outlined">
            <Divider sx={{ mt: 3, mb: 3 }}> WHO ARE OUR TEAM MEMBERS? </Divider>
            <Grid style={{display: "flex", flexDirection: "row",justifyContent: "space-around",}}>
                <Grid style={{display: "flex",flexDirection: "row",justifyContent: "space-around", }}>
              <TeamMember
                role="Head Back Developer"
                name="Katarina Maksimovic"
                imageUrl="https://github.com/KatarinaM14.png"
                description="Katarina is the backbone of our development team, specializing in backend development. Her expertise in server-side programming has been instrumental in building the robust infrastructure of A-Estates."
              />
              <TeamMember
                role="Top G"
                name="Aleksa Milic"
                imageUrl="https://github.com/AsinaMilic.png"
                description="Aleksa, our team leader, the Top G, is the driving force behind A-Estates. His leadership and strategic planning have been key in turning our vision into reality."
              />
              <TeamMember
                role="Head Front Developer"
                name="Milica Stojanović"
                imageUrl="https://github.com/15Milica.png"
                description="Milica, our head front developer, is responsible for the sleek and intuitive user interface of Estates. Her eye for design and user experience makes A-Estates a joy to use."
              />
              <TeamMember
                role="LLM Developer"
                name="Matija Speletic"
                imageUrl="https://github.com/matija-speletic.png"
                description="Matija, our LLM developer, ensures that our platform is always learning and improving. His work on large language model has made A-Estates smarter and more efficient."
              />
              <TeamMember
                role="AI researcher"
                name="Vuk Grujic"
                imageUrl="https://github.com/VukGr.png"
                description="Vuk, our AI researcher, is the brain behind the AI capabilities of A-Estates. His innovative research has allowed us to provide personalized and intelligent property recommendations."
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
                href="https://github.com/int-sys-team/int-sys-project"
              >
                {" "}
                <FacebookIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://github.com/int-sys-team/int-sys-project"
              >
                {" "}
                <InstagramIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://github.com/int-sys-team/int-sys-project"
              >
                {" "}
                <TwitterIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://github.com/int-sys-team/int-sys-project"
              >
                {" "}
                <LinkedInIcon />{" "}
              </Button>
              <Button
                sx={{ m: 1, borderRadius: 50 }}
                variant="contained"
                href="https://github.com/int-sys-team/int-sys-project"
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
