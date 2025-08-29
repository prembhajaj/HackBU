**Code Editor & UML Diagram Generator with ChatGPT Integration**

This project is a full-stack application developed during the HackBU hackathon that combines modern web development with AI to enhance the coding experience. 
It provides an interactive code editor, automatically generates UML diagrams from the written code, and leverages OpenAI's ChatGPT to offer targeted code improvement suggestions.

**Features**

- **Interactive Code Editor:** Write and modify code in a user-friendly interface.

- **Automated UML Diagram Generation:** Convert your code into visual UML diagrams for easier understanding and documentation.

- **ChatGPT Code Analysis:** Get specific improvement suggestions powered by OpenAI's ChatGPT to help enhance code quality.

- **Full-Stack Architecture:** Utilizes React.js for the frontend and Java Spring Boot for the backend.

- **Collaborative Development:** Developed in a team environment with positive feedback on its practical application and innovation.

**Tech Stack**
- **Frontend:** React.js

- **Backend:** Java Spring Boot

- **AI Integration:** OpenAI's ChatGPT

- **Other Tools:** Additional libraries and frameworks as needed for code processing and diagram generation

**Getting Started**

**Prerequisites**

- Node.js and npm: For running the React frontend.

- Java JDK & Maven/Gradle: For running the Spring Boot backend.

- OpenAI API Access: Required for ChatGPT integration.

**Installation**

- Clone the Repository:

    ```
    git clone <repository-url>
    cd <repository-directory>
    ```

- Set Up the Backend:

    Navigate to the backend directory and start the Spring Boot application:
    ```
    cd Backend/hackbu
    mvn spring-boot:run
    ```
    Ensure the backend is running on the configured port.

- Set Up the Frontend:

    Navigate to the frontend directory, install dependencies, and start the React application:
    ```
    cd ../NewFrontEnd
    npm install
    npm start
    ```
    The application should automatically open in your default browser.

**Configuration**

- **API Keys:** Update your configuration files with the necessary API keys for OpenAI.

- **Environment Variables:** Ensure that any required environment variables (such as backend endpoints or API keys) are properly set.

**Usage**

- Open the code editor in your browser.

- Write or paste your code into the editor.

- The application will process the code to generate a corresponding UML diagram.

- Click the analysis button to receive code improvement suggestions from ChatGPT.

**Contributing**

Contributions are welcome! Please fork the repository and submit a pull request with a detailed description of your changes.

**Acknowledgments**

- **HackBU Hackathon**: For providing the opportunity and environment to innovate.

- **OpenAI:** For the ChatGPT integration which enhances the coding analysis feature.

- **Team Contributors:** For their collaboration and commitment to developing a practical and innovative project.