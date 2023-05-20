# Krishi-Junction

### Objectives:
- To create a real-time system that monitors plant health by collecting and assessing temperature, humidity, soil moisture, and nutrient levels.
- To monitor and analyse soil, sensors measuring pH, nutrient levels, and other key characteristics will be installed.
-  To aid agricultural decision-making like planting, fertilising, and harvesting with machine learning and predictive analytics.
-  To optimise irrigation operations using data-driven scheduling and management that accounts for soil moisture and weather.
- To make the intelligent farming assistant's data entry, reports, alerts, and recommendations easy for farmers to utilise.
- To optimise farming practises by combining weather forecasts, pest management, and irrigation with other farming methods and technologies.

### Proposed System:
An IoT-based agriculture app that collects temperature, humidity, soil moisture, and other data. Machine learning algorithms will analyse data in real time to provide crop development stage, nutritional levels, and potential concerns. Predictive analytics will help farmers plant, fertilise, and harvest. Data-driven soil moisture and weather-based scheduling and control will optimise irrigation operations. Farmers can monitor their crops and optimise their yield using the intelligent farming assistant's intuitive interface. To optimise farming and prevent resource waste, the system will interact with weather forecasts, pest management, and irrigation. The proposed approach improves agricultural output and reduces resource waste to feed the world sustainably.

### Methodology:
To develop the proposed intelligent farming assistant system, we followed a structured methodology that involved the following architecture:
![architecture](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/architecture.png)

- **Sensors and Microcontrollers:** NPK sensors, pH sensors, NoIR Camera, and other sensors were used for data collection. These sensors were responsible for collecting data from the environment, and were connected to microcontrollers that processed the data and sent it for further analysis. 

- **Cloud Integration:** Cloud integration was used to store and analyze data collected by sensors. It allowed for scalability, flexibility, and accessibility. The data could be accessed from anywhere in the world, and the system could be easily scaled up or down based on changing requirements. Various tools for data analysis, such as machine learning algorithms, were available through cloud integration to identify patterns and make predictions based on the collected data.

- **Mobile Application:** The mobile application module provided a user interface for the end-users to interact with the system. It allowed the users to view the data collected by the sensors, set up alerts and notifications, and perform various actions based on the data. The mobile application also acted as a control centre, where users could remotely control various devices based on the data collected by the sensors.
![uml](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/appUML.jpg)

- **Data Management:** In the project, we had a crucial module for data management that involved storing, organizing, and analyzing the collected data. We processed and transformed the unstructured data collected by the sensors into a structured format for easy analysis. We also performed data cleaning, aggregation, visualization, and interpretation. The data we collected helped us to identify trends, make predictions, and improve our decision-making processes.
![dataflow](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/data%20flow.jpg)

### Outputs:
- **Plant health monitoring system:**
![plant](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/NDVI.png)

- **Soil health monitoring system:**
![soil](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/Soil%20health%20system.png)
![vals](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/soil%20bucket.png)

- **Mobile net algorithm's evaluation:**

![loss](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/loss%20eval.jpg)
![accuracy](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/accuracy%20eval.jpg)

- **Mobile Application:**

![app1](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/app1.png)
![app2](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/app2.png)
![app3](https://github.com/shivam-akhouri/Krishi-Junction/blob/master/imgs/app3.png)

