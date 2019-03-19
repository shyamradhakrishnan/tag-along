Test1
##Introduction
Tag Along is  an application  for a group of uroad travelers  to ensure their  connectivity  and safety by keeping them always together  on their path to the chosen destination.   For example,  a group of bikers traveling to destination X register on the application before starting their  trip. After gstarting the trip,  the application  will periodically monitor the location of the group members to  ensure that  all   are  headed  together to X.


##Architecture

![Architecture Logo](tagalong/images/arch.png)

#Test
To run the test case, run following command<br><br>
node test.js<br><br>
Test Case Description: In the test case, three people start the trip together. Initially, group members send their starting coordinates. After two minutes, group members send their updated coordinates. In the last two minutes, an update from one of the group members is not received, which is generated as an alert in the Notifications.
