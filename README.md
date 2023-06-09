# Voice-Controlled Lights IoT Project

This GitHub repository contains the code for an IoT project that allows you to control lights using voice commands. The project consists of two main components: a Wemos board program and a React website.

## Hardware Components
- Wemos board (e.g., Wemos D1 Mini)
- Relay module
- Jumper wires
- USB cable

## Software Components
- Arduino IDE
- Firebase
- Google Speech-to-Text API
- React.js

## Project Structure
The repository is structured as follows:
- `/wemos_code` directory: Contains the Arduino sketch for the Wemos board.
- `/react_website` directory: Contains the code for the React website.

## Setup Instructions
To set up the project, follow these steps:

### 1. Wemos Board
1. Connect the relay module to the Wemos board using jumper wires. Refer to the hardware connections mentioned in the Wemos code.
2. Install the Arduino IDE on your computer if you haven't already.
3. Open the Arduino IDE and install the "Firebase ESP8266" library.
4. Open the Arduino sketch in the `/wemos_code` directory.
5. Replace the placeholder Firebase credentials with your own credentials obtained from the Firebase console.
6. Connect the Wemos board to your computer using a USB cable.
7. Select the appropriate board and port in the Arduino IDE.
8. Upload the sketch to the Wemos board.

### 2. React Website
1. Install Node.js on your computer if you haven't already.
2. Open a command line interface and navigate to the `/react_website` directory.
3. Run the command `npm install` to install the required dependencies.
4. Open the `src/firebase.js` file and replace the placeholder Firebase credentials with your own credentials obtained from the Firebase console.
5. Open the `src/GoogleSpeechToText.js` file and replace the placeholder Google API credentials with your own credentials obtained from the Google Cloud Console.
6. Run the command `npm start` to start the React development server.

## Usage
1. Ensure that the Wemos board is powered on and connected to the Wi-Fi network.
2. Access the React website by opening a web browser and navigating to the provided URL or `http://localhost:3000` if running the website locally.
3. On the website, you will see the current status of the lights fetched from Firebase.
4. Use the voice commands "light on" or "light off" to control the lights.
5. Observe the relay module connected to the Wemos board and see how it responds to the voice commands.

## Troubleshooting
- If there are issues with the Wemos board connectivity, check the Wi-Fi credentials set through the Wemos AP setup.
- Ensure that the Firebase and Google API credentials are correctly configured in both the Wemos code and the React website code.

## Contributing
Contributions to this project are welcome. If you find any bugs or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## Acknowledgments
This project was inspired by the need for a hands-free, voice-activated lighting solution. We would like to acknowledge the developers of the Firebase, Google Speech-to-Text API, and React.js for providing the tools and frameworks that made this project possible.
