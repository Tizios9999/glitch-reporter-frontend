<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Tizios9999/glitch-reporter-frontend">
    <img src="https://www.kindpng.com/picc/m/160-1608792_circle-document-icon-png-transparent-png.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Glitch Reporter (Frontend interface)</h3>

  <p align="center">
    The frontend interface of GlitchReporter, my ticket management app.
    <br />
    <a href="https://github.com/Tizios9999/meditation-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://glitch-reporter-frontend-fc42.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/Tizios9999/glitch-reporter-frontend/issues">Report Bug</a>
    ·
    <a href="https://github.com/Tizios9999/glitch-reporter-frontend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://glitch-reporter-frontend-fc42.vercel.app/)

GlitchReporter is a complete software application that helps tracking and managing customer support requests. It allows customers to create tickets to report problems or ask questions, and it provides agents with a centralized view of all tickets.

You can access the application at this address: <a href="https://glitch-reporter-frontend-fc42.vercel.app/">https://glitch-reporter-frontend-fc42.vercel.app/</a>

If you are interested about the backend service instead, you can find the repository <a href="https://github.com/Tizios9999/glitchreporter-backend/">here</a>.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- HTML
- CSS
- React.js
- Next.js
- Material UI
- Google Cloud Storage

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To have a working copy of the interface locally on your device, you can clone it from here.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Tizios9999/glitch-reporter-frontend.git
   ```
2. Install NPM packages from the package.json already inside the repo.
   ```sh
   npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

You can access the application at this address: <a href="https://glitch-reporter-frontend-fc42.vercel.app/">https://glitch-reporter-frontend-fc42.vercel.app/</a>

You can find the backend repository <a href="https://github.com/Tizios9999/glitchreporter-backend/">here</a> as well.

### Registration and Login/Logout

On the main page, you can access the login and register page.
These sections are also accessible from the top menu.

In order to log out from the application, you can click on the top right circle icon and click on the "Logout" button.

### New password request

If you ever forget your password, you can create a new one by clicking on the "Forgot password?" link on the Login page.
You will need to provide both your Username and email used for registration.

### Using the ticket dashboard

The ticket dashboard is where you can find all the ticket opened on GlitchReporter.

From the ticket dashboard you can:

- Filter by ticket status or priority
- Browse a specific ticket
- Open a ticket (explained in the next section)

In mobile mode, in order to access the filters section you have to click on the downright filter circle icon.

To browse a specific ticket, click on the specific ticket ID in Desktop mode, or "See Ticket" button in mobile mode.

### Opening a ticket

You can access the new ticket page by clicking:

- On the "New Ticket" button at the top of the filters section
- In mobile mode, also by clicking on the "+" downright button.

Opening a ticket is pretty straightforward, write the ticket subject and select the issue priority & area of interest.
Then add an issue description.

You can also add one or more files to the message, for example screenshots you made, by clicking on the "Add File" button.

### Adding messages to the ticket

Any user can add messages to an already created ticket to discuss it.

### Agent features: changing the ticket status

As an agent, you can change the ticket status. As the agent, while browsing a ticket you will have access to the Ticket Management box where you can set the new ticket status and assign to take charge of it.
When an agent changes the ticket status, if the ticket is currently unassigned, it will be automatically assigned to that agent.

The users can be promoted to "Agent" only by the Admin.

### Admin features: the admin board

As the Admin, you can access to the "Administration" section.

From here, you can access the app users list. By clicking the button "Edit", you can modify the user role, or even delete it.
Beware that if you delete an user, it cannot be recovered from here.

The users can be promoted to "Admin" only by other admins.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap of possible future releases

- [x] Release the first working version
- [ ] Adding themes.

See the [open issues](https://github.com/Tizios9999/glitch-reporter-frontend/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

This is a course project aimed to evaluate my personal skills, so right now it's closed for contributions. Any advice is always kindly appreciated though! You can even submit them directly on my app! :D

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Davide Santonocito - davide.santonocito@outlook.com

Project Link: [https://github.com/Tizios9999/glitch-reporter-frontend](https://github.com/Tizios9999/glitch-reporter-frontend)

Live at: [https://glitch-reporter-frontend-fc42.vercel.app/](https://glitch-reporter-frontend-fc42.vercel.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-url]: https://github.com/Tizios9999/glitch-reporter-frontend/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Tizios9999/meditation-app.svg?style=for-the-badge
[forks-url]: https://github.com/Tizios9999/glitch-reporter-frontend/network/members
[stars-shield]: https://img.shields.io/github/stars/Tizios9999/meditation-app.svg?style=for-the-badge
[stars-url]: https://github.com/Tizios9999/glitch-reporter-frontend/stargazers
[issues-shield]: https://img.shields.io/github/issues/Tizios9999/meditation-app.svg?style=for-the-badge
[issues-url]: https://github.com/Tizios9999/glitch-reporter-frontend/issues
[license-shield]: https://img.shields.io/github/license/Tizios9999/meditation-app.svg?style=for-the-badge
[license-url]: https://github.com/Tizios9999/glitch-reporter-frontend/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/davide-santonocito-36ab84170
[product-screenshot]: public/glitchreporterlogo.png
