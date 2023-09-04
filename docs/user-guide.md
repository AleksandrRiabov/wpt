# Table of Contents
1. [Dashboard Overview](#dashboard-overview)
2. [Chart Settings](#chart-settings)
3. [Add Trailer](#add-trailer)
4. [Trailer Details](#trailer-details)
5. [Edit Trailer](#edit-trailer)



## Dashboard Overview

<img width="1206" alt="Dashboard-docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/14fcaca8-944a-48bf-addf-3d78f3566b1b">

Welcome to the MERN Warehouse Planning Tool dashboard! The dashboard provides a visual representation of key metrics and insights to streamline your warehouse planning process. Here's an overview of the six main components:

1. **Order Demand History Area Chart**

    <img width="484" alt="Area-Chart-docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/562b562d-3994-48ed-80c6-ef6b17bb1981">
The first component is a dynamic area chart that displays the historical trend of ordered demand and corresponding pallets picked. Use this chart to identify upcoming spikes in demand and plan accordingly. You can apply filters and settings to focus on specific data points. Refer to the "Chart Filters" section for more details.


2. **Demand vs. Picked Pallets Line Chart**

   <img width="440" alt="LineChart-docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/c0b5f2a9-04de-4cb7-8e37-039373a08ae4">
   
The second component features two line charts that compare demand and pallet stacking. Detect anomalies and changes in stacking patterns that may require investigation. Applying filters and date ranges helps you analyze data effectively. 
In usual circumstances, the two lines will maintain parallel, indicating a consistent stacking efficiency.
However, when a significant gap occurs between the two lines, this suggests an anomaly. Anomalies could signify issues such as partial picking or inefficient consolidation, leading to increased delivery costs.

3. **Average Cases per Pallet Bar Chart**
   
   <img width="479" alt="Bar-Chart-docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/629acf66-9780-40bf-9239-362f8766c75c">

Number 3 showcases a bar chart illustrating the average number of cases per pallet for a specific product within the selected date range. Just like other charts, you can modify settings to tailor the view to your needs.

4. **Trailers Board**

 <img width="980" alt="Trailers Board-Docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/76c9367a-8d48-47f3-b23c-0be8b88f0369">
 

The Trailers Board is a virtual whiteboard displaying loaded trailers. It includes essential information such as shipment date, delivery date, and border crossing time. Stay organized and track trailer movements with ease.

- Red: Indicates the presence of alcohol in the trailer.
- Green: Indicates certified products in the trailer.
- White: Indicates no certification or alcohol in the trailer.

Double-click to open the trailer row to open the Trailer Details.

5. **Category Distribution Pie Chart**

<img width="483" alt="dashboard pie-chart- docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/a6e60fcc-4b0f-4989-85c6-12f1b0059366">

Component 5 presents a pie chart depicting the distribution of total cases sent by category as a percentage for the selected year. Gain insights into category-wise shipment proportions.

6. **Monthly Trailer Statistics**

<img width="479" alt="Stats box-docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/83b88a35-fa6f-457a-a87a-b6f53ada40b7">

Lastly, component 6 offers a summary box presenting statistics for the selected month. Find the total trailer count, overall cost, additional charges, and average case delivery cost conveniently.



<br/>
<hr/>

## Chart Settings
<img width="1022" alt="Chart Filters wpt docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/6c7d7ab3-cdba-4774-bdef-086a8724262f">
The chart settings allow you to customize the data displayed on the charts for a more focused analysis. You can adjust the following settings:

- Date Range: By default, the charts show data for the last 30 days. You can change this date range to view historical data over a different period.

To change the date range, locate the date range selector on the chart interface and select your desired start and end dates.
**Product Selection:**

- Select Products: Choose specific products to be displayed on the chart. You can do this by clicking on the product names.

- Select Category: Alternatively, you can choose to display all products within a specific category. When selecting a category, all products in that category will be automatically selected for display on the chart.

- Show All: If neither specific products nor a category is selected, the chart will display data for all available products.

These settings provide flexibility in customizing your analysis, allowing you to focus on the data that is most relevant to your planning needs.

<br/>
<hr/>

## Add Trailer

<img width="1482" alt="Add Trailer Page WPT Docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/efe1e645-afb0-494b-a61f-ef272deae114">

1 **Trailer Number:**

- Enter the unique identifier for the trailer. Avoid using spaces or special characters.

2 **Load Type:**

- Select the load type from the dropdown list. The load type represents the temperature requirements for the trailer's cargo.

3 **Contractor Name:**

- Choose the contractor's name from the dropdown list. This indicates the company responsible for the trailer.

4 **Load Date:**

- Select the date when the trailer was loaded or sent from the warehouse.

5 **Arrival Date:**

- Choose the date when the trailer should arrive at its destination.

6 **Reference Number:**

- If you've selected "JCARRION" as the contractor, this field becomes disabled, and a reference number is automatically generated.
For other contractors, manually add a reference number related to this trailer.
Freight Type:

7 **Freight-Type**
- Select the freight type from the dropdown list. Choose from options such as road, air, or sea to specify the mode of transportation for the trailer.

8 **Contains Alcohol:**

- Check this box if the trailer contains alcohol products.

9 **Requires EHC Certificate:**

- Check this box if the trailer contains products that require an EHC (Export Health Certificate) certificate.

10 Exit from the UK:

- Select from the dropdown how the trailer will leave the UK, for example, through the tunnel or ferry.

11 Comments:

- Add any comments or notes related to the trailer. For instance, you can mention specific details like the location of certain customer orders.

12 Product Selection:

- Select a product from the dropdown list that you want to add to the trailer.

13 Pallets Loaded:
- Specify the number of pallets of that product loaded onto the trailer. This field can be left empty if not applicable.

14 Cases Loaded:
- Enter the number of cases of this product loaded onto the trailer. This field cannot be left empty.
Add Product:


*Click the "+" icon to add the selected product with the specified pallets and cases to the product list.*

*After adding all the necessary products and details, click this button to create the trailer record.*


<br/>
<hr/>

## Trailer Details
<img width="1512" alt="Trailer Details WPT docs" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/51950e75-158b-4327-8c40-d555950a1e32">

1 **Trailer Number:**

- Red: Indicates the presence of alcohol in the trailer.
- Green: Indicates certified products in the trailer.
- White: Indicates no certification or alcohol in the trailer.
  
2 **Reference Number:**

- Composed of the delivery date plus four digits of the trailer number.
  
3 **Send Date:**

- Shows when the trailer was loaded and sent.
  
4 **Delivery Date:**

- Displays the expected arrival date of the trailer.
  
5 **Clearance:**

- Shows the date and time when the trailer was cleared by customs.
- Remains empty if not cleared yet.
  
6 **Received:**

- Shows the date the trailer was actually received by the store.
- Remains empty if not received yet.

7 **Freight Type:**

- Indicates the mode of transportation (e.g., road, air, sea).

8 **Certified:**

- Indicates whether the trailer contains certified stock.
- Options: Yes or No.

9 **Alcohol:**

- Indicates whether the trailer contains alcohol.
- Options: Yes or No.

10 **Extra Cost:**

- Displays the total extra cost associated with the trailer.
  
11 **Extra Cost Reasons:**

- Displays reasons for the extra cost, including price details.
- Multiple lines may be added for different reasons.
  
12 **Comments:**

- Allows users to add comments related to the trailer.
  
13 **Action Buttons:**

- Edit: Allows users to edit trailer details.
- Delete: Deletes the trailer, with a confirmation prompt.
  
14 **Pie Chart:**

- Displays a pie chart showing the percentage of pallets for each product in the trailer.
  
15 **Total:**

- Shows the total number of pallets and cases loaded into the trailer.
  
16 **Pallet Breakdown:**

- Provides a breakdown of cases and pallets for each product separately.
  
17 **User Information:**

- Displays the name of the user who created the trailer.
- Also shows the name of the user who made any changes to the trailer.
- If no changes have been made, this field remains empty.



<br />
<hr/>

## Edit Trailer

<img width="1008" alt="Edit Trailer Details" src="https://github.com/AleksandrRiabov/wpt/assets/61385379/05156ec3-b688-4107-af21-4f89f5ba2094">

<br>
 You can use the "Edit Trailer" page to update important timestamps related to clearance and when the trailer is received by the store. Here's how you can do it:

- **Clearance**: Shows the date and time when the trailer was cleared by customs. This field remains empty if the trailer has not been cleared yet. You can update this field with the clearance date and time once customs clearance is obtained.

- **Received**: Indicates the date the trailer was actually received by the store. This field remains empty until the trailer is received. You can update this field with the date and time when the store receives the trailer.

In addition to these timestamps, you can also make other necessary edits on this page to keep the trailer record accurate and up-to-date, ensuring that all relevant information is reflected in the system.





