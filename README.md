# 🧠 MindDump

MindDump is a web application designed to help users manage and visualize their thoughts. It supports both text and image inputs, offering various ways to organize and present ideas. This app serves as a digital space for brain dumps, assisting those overwhelmed with thoughts by providing a structured and intuitive interface.

This web app is powered by **Next.js, React.js, and TypeScript**.

---

## 🚀 Getting Started

### Running Locally

To run the application in a local development environment, use the following command:

```bash
npm run dev
# or
yarn dev
```

Then, open [http://localhost:3000](http://localhost:3000) in your browser.

### Running with Docker

#### Build the Docker Image

```bash
docker build -t minddump-app .
```

This command builds the Docker image using the `Dockerfile` in the project directory and tags it as `minddump-app`.

#### Run the Docker Container

```bash
docker run -p 3000:3000 minddump-app
```

This command runs a container from the `minddump-app` image and maps port `3000` of the container to port `3000` on your host machine.

#### Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running inside the Docker container.

---

## 📖 Documentation

The documentation is divided into several sections:

- [💻 Application Overview](docs/application-overview.md) – Overview of the application's functionality, technology stack, and upcoming features.
- [💄 Code Formatting](docs/code-formatting.md) – Guidelines for maintaining consistent code formatting in the project.
- [🚀 CI/CD](docs/ci-cd.md) – Details about the pipelines used in this project.
- [🧪 Testing](docs/testing.md) – Insights into the testing strategy and setup process.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository.
2. **Create a feature branch** (`git checkout -b feature-branch-name`).
3. **Commit your changes** (`git commit -m "Add new feature"`).
4. **Push to the branch** (`git push origin feature-branch-name`).
5. **Submit a pull request**.

Your support in improving MindDump is greatly appreciated! 🎉

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

Created by **Huy Ton** – feel free to reach out!
