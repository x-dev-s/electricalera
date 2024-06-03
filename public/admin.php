<?php
    session_start();
    session_regenerate_id(true);
    if(!isset($_SESSION['Admin'])){
        header('location: /#/admin-login');
    }
?>

<html>
<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Admin Panel</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
</head>
<body class="container-fluid">
    <h1 class="float-start">Welcome <?php echo $_SESSION['Admin'] ?></h1>
    <form method="POST">
        <button class="float-end mt-2" type="submit" name="LogOut">Log Out</button>
    </form>

<?php
 if (isset($_POST['LogOut'])){
    session_destroy();
    header('location: /#/admin-login');
 }
?>
</body>
</html>