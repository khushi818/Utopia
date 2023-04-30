# Utopia
The Place to meet people and have face to face chat and video call

Video Conferencing and Chat
This project is a real-time communication application that allows users to join video conferences and chat with each other. The application uses Django and Agora in the backend and React.js in the frontend.

Getting Started
To get started with this project, you'll need to have the following installed on your computer:

* Python 3
* Yarn

## Instruction

Clone the repository to your local machine.
* Navigate to the project directory and run yarn install to install the required dependencies for the frontend.
* Navigate to the backend directory and create a virtual environment by running python3 -m venv env.
* Activate the virtual environment by running source env/bin/activate on Linux/macOS or env\Scripts\activate on Windows.
* Install the required Python packages by running pip install -r requirements.txt.
* Create a .env file in the backend directory and add your Agora App ID, Token, and Django secret key as environment variables.
* Run python manage.py migrate to create the database tables.
* Start the Django server by running python manage.py runserver.
* Open a new terminal window and navigate to the project directory.
* Run yarn start to start the frontend development server.
* Open your browser and navigate to http://localhost:3000 to access the application.
Usage

To use the application, follow these steps:

* Register a new account or log in using an existing account.
* After logging in, you will see a list of available rooms.
* Click on a room to join the video conference.
* The application will ask for your permission to access your camera and microphone. Allow it to start the video call.
* You can chat with other participants in the chat box on the right side of the screen.
* To leave the conference, click "Leave Room".
![image](https://user-images.githubusercontent.com/81404366/235352004-50ad4216-3d79-4e14-8ee9-771a255b769d.png)
![image](https://user-images.githubusercontent.com/81404366/235352032-3d909891-e0b6-424c-a14f-f0fce6f932f3.png)
![image](https://user-images.githubusercontent.com/81404366/235352073-5275b998-8c66-4754-b0a6-39064bee004e.png)
![image](https://user-images.githubusercontent.com/81404366/235352127-10ea71e3-e951-4000-a7a2-965e82c5d07e.png)

## Technologies Used
This project uses the following technologies:

* Django
* React.js
* Agora SDK
