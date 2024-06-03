<?php
$Server = "Your server name";
$Username = "Your username";
$Password = "Your password";
$Database = "Your database name";
$connection = mysqli_connect($Server, $Username, $Password, $Database);
if (mysqli_connect_error()){
    echo "<script>alert('Failed to connect')</script>";
    exit();
}
?>