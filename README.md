# MindDump

MindDump is a web application designed to help users manage and visualize their thoughts. It supports text and image inputs and provides various ways to present and organize these thoughts. The app aims to help people who have too many thoughts in their minds by offering a digital space for a brain dump.

## Features

### Phase 1: Static Web with User Input
- Simple user interface for inputting thoughts (text and images).
- Basic display of submitted thoughts in a list format.

### Phase 2: Multiple Display of User Thoughts with Animation Effects
- Different layouts to display thoughts (grid, carousel, card layouts).
- Animated transitions for displaying thoughts.

### Phase 3: AI-Assisted Thought Combination and Analysis
- AI-powered analysis to summarize and categorize thoughts.
- Image analysis to tag and categorize images.
- Generate combined insights from user inputs.

### Phase 4: Backend and Database
- User authentication for account creation and login.
- Persistent storage of thoughts in a database.
- API endpoints for submitting, retrieving, and managing thoughts.

### Phase 5: Advanced Features for Managing Thoughts
- Tagging system for categorizing thoughts.
- Search functionality to find specific thoughts.
- Mood tracking for tagging thoughts with current mood.
- Reminder system for important thoughts.

### Phase 6: Social Features and Community Interaction
- Sharing thoughts with privacy options.
- Commenting on shared thoughts.
- Community boards for public thought sharing and discussion.

## Tech Stack
### Frontend:
- Next.js
- React.js
- TypeScript
- Mantine Library
- Framer Motion (for animations)

### Backend:
- GraphQL
- PostgreSQL

### AI Integration:
- OpenAI API for text processing
- Image analysis API (e.g., Google Cloud Vision API)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running with Docker
To build and run the application using Docker:

### Build the Docker Image:

```bash
docker build -t minddump-app .
```

This command builds the Docker image using the Dockerfile in the project directory and tags it as minddump-app.

### Run the Docker Container:

``` bash
docker run -p 3000:3000 minddump-app
```

This command runs a container from the minddump-app image and maps port 3000 of the container to port 3000 on your host machine.

### Access the Application:

Open http://localhost:3000 in your browser to see the application running inside the Docker container.

## Contributing
Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Created by Huy Ton - feel free to contact me!