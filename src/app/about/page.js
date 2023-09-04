"use client";
import React from "react";
import { Container, Typography, Link } from "@mui/material";

function About() {
  return (
    <Container maxWidth="md" sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        About GlitchReporter
      </Typography>
      <Typography variant="body1" paragraph>
        GlitchReporter is a ticket management application created as the final
        project for my Full Stack Developer program at Start2Impact University.
      </Typography>
      <Typography variant="body1" paragraph>
        Technologies used in the development of GlitchReporter include Spring
        Boot (with Spring Security and Spring Data JPA) for the backend, Next.js
        for the frontend, Google Cloud Storage for attachments storage, and
        Material UI for the user interface.
      </Typography>
      <Typography variant="body1" paragraph>
        To learn more about me and my current projects, visit my{" "}
        <Link
          href="https://www.davidesantonocito.com"
          target="_blank"
          rel="noopener"
        >
          website
        </Link>
        .
      </Typography>
      <Typography variant="body1">
        For more information about Start2Impact University and its programs,
        visit{" "}
        <Link href="https://www.start2impact.it" target="_blank" rel="noopener">
          Start2Impact University
        </Link>
        .
      </Typography>
    </Container>
  );
}

export default About;
