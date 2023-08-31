# WPT - Warehouse Planning Tool (Front-end)

WPT Frontend serves as the user interface for the Warehouse Planning Tool, delivering a robust dashboard and interactive capabilities for efficient warehouse management. This application redefines the process of tracking trailers, managing product information, and optimizing resource allocation within warehouses.

## Key Features
- **📊 Interactive Dashboard:** Gain actionable insights through an intuitive dashboard enriched with dynamic charts. Tailor charts with customizable date ranges, enabling detailed trend analysis and data-driven decision-making.

- **🚚 Trailers Board:** Seamlessly oversee trailers with the digital trailers board. Effortlessly add, edit, and remove trailer entries for comprehensive monitoring of loaded and dispatched trailers.

- **📈 Trailer Statistics:** Obtain immediate access to essential trailer statistics, including monthly trailer counts, average case delivery costs, and comprehensive expenditure with supplementary charges.

- **🔧 Configuration Management:** Ensure data accuracy and streamline workflows with the configuration page. Manage load types, products, and contractors through dropdown lists, minimizing errors and maximizing operational efficiency.

- **🗓️ Days and Week Pages:** Strategically plan operations using the Days and Week pages. Input precise data for specific days, forecast trailer requirements based on historical data, and analyze demand patterns. The Week page provides a comprehensive overview of a chosen week's data.

- **Resource Allocation:** Empower store managers with predictive insights, allowing accurate resource allocation decisions before trailers depart the warehouse premises.

- **🔐 Secure Authentication:** Safely access the application by creating a personalized account or logging in through Google credentials. Firebase authentication ensures data integrity and user privacy.

- **📱 Responsive Design:** Experience a consistent and optimal user interface across various devices, courtesy of the application's responsive design tailored for both desktop and mobile screens.

## Screenshots
<img width="1210" alt="Logistics Dashboard" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/3579f18e-c701-47f5-a9d4-deed41a092e5">


<img width="1484" alt="Warehouse Planning Tool trailer details" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/34d728a0-5c18-42ff-afd0-37bb1cca9f13">

<img width="1207" alt="Warehouse Planning Tool weekly orders" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/52758195-47c3-43ce-a22d-30b8c30c0518">

## Deployment

Please note that it might take a while to receive the initial response from the server due to free hosting.

⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡

:point_right: Link to the [Deployed Application](https://warehouse-planning-tool.onrender.com/) 👈:

⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡

## Technologies Used
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **RTK Query**: A data fetching and state management library for React applications.
- **Material-UI (mui 5)**: A popular UI framework for creating responsive and visually appealing components.
- **Recharts**: A charting library for creating interactive and customizable charts.
- **date-fns**: A modern JavaScript date utility library.
- **countUp**: A React component wrapper around the CountUp.js library for animating numbers.

## Getting Started

Follow these steps to set up and run the frontend of the Warehouse Planning Tool:

1. Clone the repository:
   ```sh
   git clone https://github.com/AleksandrRiabov/wpt

2. Install dependencies:
    ```sh
    cd warehouse-planning-tool-frontend
    npm install

3. Set up environment variables:
   - Create the .env file with your Firebase configuration.

4. Start the development server:
    ```sh
    npm start

5. Make sure the backend is set up and running. Find the backend repository here: [WPT Backend Repository](https://github.com/AleksandrRiabov/wptbackend)

### Contributing
 - Contributions are welcome! If you find any issues or want to enhance the application, feel free to open an issue or submit a pull request.   
  




# Documentation

## Dashboard Overview

<img width="1206" alt="Dashboard-docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/14fcaca8-944a-48bf-addf-3d78f3566b1b">

Welcome to the MERN Warehouse Planning Tool dashboard! The dashboard provides a visual representation of key metrics and insights to streamline your warehouse planning process. Here's an overview of the six main components:

1. **Order Demand History Line Chart**

    <img width="484" alt="Area-Chart-docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/562b562d-3994-48ed-80c6-ef6b17bb1981">
The first component is a dynamic line chart that displays the historical trend of ordered demand and corresponding pallets picked. Use this chart to identify upcoming spikes in demand and plan accordingly. You can apply filters and settings to focus on specific data points. Refer to the "Chart Filters" section for more details.



3. Demand vs. Stacking Line Chart
The second component features two line charts that compare demand and pallet stacking. Detect anomalies and changes in stacking patterns that may require investigation. Applying filters and date ranges helps you analyze data effectively. Review the "Chart Filters" section for instructions on customization.

4. Average Cases per Pallet Bar Chart
Number 3 showcases a bar chart illustrating the average number of cases per pallet for a specific product within the selected date range. Just like other charts, you can modify settings to tailor the view to your needs.

5. Trailers Board
The Trailers Board is a virtual whiteboard displaying loaded trailers. It includes essential information such as shipment date, delivery date, and border crossing time. Stay organized and track trailer movements with ease.

6. Category Distribution Pie Chart
Component 5 presents a pie chart depicting the distribution of total cases sent by category as a percentage for the selected year. Gain insights into category-wise shipment proportions.

7. Monthly Trailer Statistics
Lastly, component 6 offers a summary box presenting statistics for the selected month. Find total trailer count, overall cost, additional charges, and average case delivery cost conveniently.






