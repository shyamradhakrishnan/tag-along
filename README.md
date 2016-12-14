
##Introduction
Tag Along is an application for a group of road travelers to ensure their connectivity and safety by keeping them always together on their path to the chosen destination. For example, a group of bikers traveling to destination X register on the application before starting their trip. After starting the trip, the application will periodically monitor the location of the group members to ensure that all are headed together to X.


##Architecture

![Architecture Logo](tagalong/images/arch.png)

#Test
To run the test cases, run following command
node test.js
Test Case Description: In the test case, three people start the trip together. Initially, group members send their starting coordinates. After two minutes, group members send their updated coordinates. In the last test case, an update from one of the group members is missing, which is generated as alert in the Notifications.
