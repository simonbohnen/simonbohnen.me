<?php
   $con=mysqli_connect("questioncatalog.c5bfuqylkyhm.eu-west-1.rds.amazonaws.com","youngsharks","WeLoveP7S1","questioncatalog");

   if (mysqli_connect_errno($con)) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
   }

   $questionid = $_GET['questionid'];
   $result = mysqli_query($con,"SELECT * FROM catalog where questionid='$questionid'");
   $row = mysqli_fetch_array($result);
   $data = $row[0];

   if($data){
      echo $data;
   }
   mysqli_close($con);
?>