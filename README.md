# belly-button-dashboard

## Project Overview ##
 - This Data Analysis project consists in creating a visualization dashboard with the data provided; the provided data consists of a json file containing the bacteria observed in the belly button of anonymous subjects
 - In case you are wondering this is a real study, and after some data exploration, an interesting one, more info can be found on this [National Geographic](https://www.nationalgeographic.com/science/article/121114-belly-button-bacteria-science-health-dunn#:~:text=Belly%20buttons%2C%20it%20turns%20out,started%20about%20two%20years%20ago.&text=From%2060%20belly%20buttons%2C%20the,although%20most%20had%20around%2067.) article

 ## Project Breakdown ##
 - The project is focused on the Load process of an ETL project, hence data is displayed as is, no cleaning involved
 - Most of the project is done using Javascript with some css and html for styling
 - The app allows user to choose a subject Id and the dashboard will dynamically change to display the relevant data for the subject chosen
 - The bar chart only displays the top 10 (or less) bacterias found on that subject, some obervations have 40 different bacterias
 - The bubble chart displays all the bacterias found on the subject since this graph allows us to look at a large number of categories with ease
 - Finally, the gauge chart displays how often the subject cleaned his/her belly button in order to visually determine the existence of a correlation
 - The color of the gauge chart are randomly selected since I could not found any information of a healthy cleaning habit

 ## Repository structure
 ````bash
│   .gitignore
│   Commits.md
│   index.html
│   LICENSE
│   README.md
│
├───data
│       samples.json
│
├───resources
│       belly_button.jpg
│       belly_button.xcf
│
└───static
    │   style.css
    │
    └───js
            .gitkeep
            app.js
            bonus.js
 ````