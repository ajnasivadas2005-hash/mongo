
async function loadPortfolio() {
    try {
        const response = await fetch('/api/portfolio');

        if (!response.ok) {
            throw new Error('Unable to fetch portfolio data');
        }

        const data = await response.json();

        const p = data.profile;
        const c = data.contact;

        if (!p || !c) {
            throw new Error('Profile or contact information is missing');
        }

        // Home
        document.getElementById('brand').textContent = p.name + '.';
        document.getElementById('welcome').textContent = "Hi, I'm " + p.name + "!";
        document.getElementById('role').textContent = p.role;
        document.getElementById('tagline').textContent = p.tagline;

        // About
        document.getElementById('aboutOne').textContent = p.about_one;
        document.getElementById('aboutTwo').textContent = p.about_two;
        document.getElementById('goal').textContent = p.goal;

        // Skills
        const skillsList = document.getElementById('skillsList');

        skillsList.replaceChildren();

        data.skills.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = skill.name;
            skillsList.appendChild(card);
        });

        // Projects
        const projectsList = document.getElementById('projectsList');

        projectsList.replaceChildren();

        data.projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'project';

            const heading = document.createElement('h3');
            heading.textContent = project.title;

            const description = document.createElement('p');
            description.textContent = project.description;

            div.append(heading, description);
            projectsList.appendChild(div);
        });

        // Contact
        document.getElementById('contactMessage').textContent = c.message;

        const email = document.getElementById('email');
        email.textContent = c.email;
        email.href = 'mailto:' + c.email;

        document.getElementById('location').textContent =
            'Location: ' + c.location;

        const linkedin = document.getElementById('linkedin');
        linkedin.href = c.linkedin;

    } catch (error) {
        console.error('Portfolio Error:', error);
        document.body.insertAdjacentText(
            'afterbegin',
            'Unable to load portfolio data. Check your server and MongoDB connection.'
        );
    }
}

function sayHello() {
    alert("Hello! Welcome to Ajna's Portfolio 💜");
}

loadPortfolio();
