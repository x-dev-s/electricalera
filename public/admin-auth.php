<?php 
    require("connection.php");
    function input_filter($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    if (isset($_POST['signin'])){
        $user = input_filter($_POST['user']);
        $password = input_filter($_POST['password']);
        $user = mysqli_real_escape_string($connection, $user);
        $password = mysqli_real_escape_string($connection, $password);

        $query= "SELECT * FROM `admin-login` WHERE `username` = ? AND `password` = ?";

        if ($statement = mysqli_prepare($connection, $query)){
            mysqli_stmt_bind_param($statement, "ss", $user, $password);
            mysqli_stmt_execute($statement);
            mysqli_stmt_store_result($statement);
            if(mysqli_stmt_num_rows($statement) == 1){
                session_start();
                $_SESSION['Admin'] = $_POST['user'];
                header("location: /admin/dashboard");
            }
            else {
                echo "<script>alert('Invalid username or password')</script>";
            }
            mysqli_stmt_close($statement);
        }
        else{
            echo "<script>alert('SQL query cannot be prepared')</script>";
            header("location: /");
        }     
    }
?>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex" />
  <title>Admin Login | ElectricalEra</title>
  <link rel="canonical" href="/admin-auth.php" />
  <link rel="icon" href="/images/favicon.ico">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" type="text/css" href="/css/style.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Oxygen:wght@400&family=Play:wght@400&family=Poppins:wght@500&display=swap"
    rel="stylesheet">
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1589362212710800"
    crossorigin="anonymous"></script>
</head>

<body>
  <header>
    <nav id="header-nav" class="navbar">
      <div class="container-fluid navbar-expand-md">
        <a class="d-none d-lg-block" href="/"><img id="logo1" src="images/MyWebLogo.png" alt="logo"></a>
        <a class="d-block d-lg-none" href="/"><img id="logo2" src="images/MyWebLogo2.png" alt="logo"></a>

        <button id="navbarToggle" class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse"
          data-bs-target="#collapsable-nav" aria-expanded="false" aria-label="Toggle navigation"><span
            class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsable-nav">
          <ul id="nav-list" class="my-auto ms-auto navbar-nav">
            <li class="nav-item"><a class="nav-link" href="/">Home</a></li>

            <li class="nav-item" id="dropdown">
              <a onclick="$store.showDropdown()" id="droplink" class="nav-link" style="cursor:pointer">
                Latest <span><img width="8" src="images/dropdown-arrow.png" alt="dropdown"></span></a>
              <div id="dropdown-content">
                <h5 class="my-1">BLOGS</h5>
                <hr>
                <div class="mx-auto DropdownBlogLink">
                </div>
                <h5 class="mt-3 mb-1">NEWS</h5>
                <hr>
                <div class="mx-auto DropdownNewsLink">
                </div>
              </div>
            </li>
            <li class="nav-item"><a class="nav-link" href="/shop">Shop</a></li>
            <li class="nav-item"><a class="nav-link" href="/blogs">Blogs</a></li>
            <li class="nav-item"><a class="nav-link" href="/news">News</a></li>
            <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
            <li class="ps-4 nav-item d-none d-lg-block position-relative">
              <div><input id="searchbar1" onkeyup="$store.Searching('1')" class="form-control" type="search"
                  placeholder="Search" aria-label="Search"></div>
              <div id="SearchContent1" class="rounded container-fluid position-absolute"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container-fluid d-none d-md-block">
        <h4 id="headline1">Welcome to the Electrical Era, where fashion and technology collide, providing you with
          the latest insights and trends in electronics and apparel</h4>
      </div>
    </nav>
  </header>
  <div id="authorization" class="container-fluid text-center">
    <form method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF'])?>">
      <div class="mx-auto d-flex">
        <div>
            <h1>Authorization</h1>
            <div><span class="material-symbols-outlined align-middle">person</span><input name="user" type="text"
              placeholder="User Name"></div>
            <div class="mt-1"><span class="material-symbols-outlined align-middle">lock</span><input name="password"
              type="password" placeholder="Password"></div>
            <button class="btn btn-outline-dark mt-2 float-end" name="signin" type="submit">Sign In</button>
            <div class="cf-turnstile" data-sitekey="0x4AAAAAAAIKs8QsjGbsWi_8"></div>
        </div>
        <div id="auth-img" class="d-none d-lg-block"><div><img src="images/robot.png" alt="Logo" width="50%"></div></div>
      </div>
    </form>
  </div>

  <div>
	<script async id="slcLiveChat" src="https://widget.sonetel.com/SonetelWidget.min.js"
		data-account-id="208316240"></script>
	<button id="ToTop"><span>↑</span></button>
</div>

  <footer class="panel-footer">
    <div class="container-fluid">
      <div class="row">
        <section class="col-sm-6 col-lg-3 mt-5 mb-md-3">
          <h3 class="pb-1">
            LATEST POSTS
          </h3>
          <div class="latestLink"></div>
        </section>

        <section class="col-sm-6 col-lg-3 mt-5 mb-md-3">
          <h3 class="pb-1">
            TOP RATED
          </h3>
          <div class="topRatedLink"></div>
        </section>

        <section class="col-sm-6 col-lg-3 mt-5 mb-md-3">
          <h3 class="pb-1">
            BLOGS
          </h3>
          <div class="blogLink"></div>
        </section>

        <section class="col-sm-6 col-lg-3 mt-5 mb-md-3">
          <h3 class="pb-1">
            NEWS
          </h3>
          <div class="newsLink"></div>
        </section>
      </div>
    </div>
    <div id="social" class="text-center mt-5 container-fluid">
      <small style="margin-top: 150px;"><em><b>Disclaimer: </b>This website contains affiliate links. As an Amazon
          Associate I earn from qualifying purchases.</em></small>
      <hr>
      <p>Follow Us</p>
      <a target="_blank" href="https://www.facebook.com/profile.php?id=100093630700193"><img width="30"
          src="images/facebook.png" alt="Facebook"></a>
      <a target="_blank" href="https://www.instagram.com/_electricalera_/"><img width="30" src="images/instagram.png"
          alt="Instagram"></a>
      <a target="_blank" href="https://twitter.com/_electricalera_"><img width="30" src="images/twitter.png"
          alt="Twitter"></a><br>
      <small>Copyright &#169; 2023 Electrical Era | <a target="_parent" href="/admin.php">Admin</a> | <a href="privacy">Privacy Policy</a></small>
    </div>
  </footer>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js"></script>
  <script src="/js/jquery-3.6.4.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>
  <script src="/js/script.min.js"></script>
</body>

</html>