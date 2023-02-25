<!doctype html>
<html>
<head>
	<title>Welcome to Books</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="description" content="DESCRIPTION">

	<!-- jQuery must be imported first if other scripts use it-->
	<!-- jQuery v1.12.4 for widest browser compatibility  -->
	<script src="lib/jquery-ui.min.js"></script>

	<!-- Prefixfree 1.0.7 To avoid using browser-specific prefixes -->
	<script src="lib/prefixfree.min.js"></script>
	<!-- Modernizr 2.8.2 To make CSS retro-compatible  -->
	<script src="lib/modernizr.min.js"></script>
	<!-- For Mobile viewing -->
	<meta name="viewport" content="width=device-width, height=device-height">
	<!-- height=device-height, initial-scale=1, maximum-scale=1" -->
	<!-- Normalize HTML v8 Makes HTML easier to work with -->
	<link rel="stylesheet" type="text/css" href="lib/normalize.min.css">

	<!-- Date picker -->
		<link href="datepicker/css/datepicker.min.css" rel="stylesheet" type="text/css">
	    <script src="datepicker/js/datepicker.min.js"></script>
	    <!-- Include English language -->
	    <script src="datepicker/js/i18n/datepicker.en.js"></script>

	<!-- CSS -->
	<link rel="stylesheet" type="text/css" href="style.css?<?=time()?>">
	<!-- 64x64 Favicon Don't use a custom generator, just use PNG -->
	<link rel="shortcut icon" href="favicon.png">
</head>

<body><div class="body-wrapper">
	<!-- Welcome window -->
	<div id="welcome-window" class="window">
		<div class="window-body" style="overflow: visible; margin-top: 12vh;">
			<h1 class="white">
				Welcome to Books
			</h1>
			
			<p class="white">
				A mindful financial<br>life starts here
			</p>

			<img class="welcome-image" src="./images/welcome-image.svg" alt="accounting book">
		</div>
		
		<div class="window-footer" style="    min-height: 8em; bottom: 4.5vh;">
			<!-- last parameters are specific to the welcome window -->
			<div class="perma-items">
				<div class="item white" style="font-weight: 400;">new income<img class="ie-symbol" src="images/income-light.svg">
				</div>	
				<div class="item white" style="font-weight: 400;">new expense<img class="ie-symbol" src="images/expense-light.svg">
				</div>
			</div>
		</div>
	</div>

	<!-- Home window -->
	<div id="home-window" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Home</span>
			<button class="menuButton">
				<div class="menu-icon">
					<span class="window-title">
					Shortcuts
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 71%;"> <!-- 71% is the right height for the home window on big screens -->
			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator" style="top:-1%"><!-- -1% is chosen on windows without a title --></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="item">
						airbnb » propane 
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						airbnb » airbnb cash 
						<img class="ie-symbol" src="images/income.svg">
					</div>
					<div class="item">
						personal » transportation
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » entertainment
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						nixden » software
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » junk food
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						nixden » staff
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » crypto
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » food
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » food
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » food
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » food
						<img class="ie-symbol" src="images/expense.svg">
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer" style="min-height: 8em; margin-bottom: 1em;">
			<!-- 8em when there are 2 perma options -->
			<div class="perma-items">
				<div class="item">new income<img class="ie-symbol" src="images/income.svg">
				</div>
				<div class="item">new expense<img class="ie-symbol" src="images/expense.svg">
				</div>
			</div>
		</div>
	</div>

	<!-- New expense or income window
		Choosing account (step 1)-->
	<div id="ie-choose-account" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title window-title-italic">
					new expense
				</span>
				</div>
			</button>
		</div>
		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option">
					On which account?
					<img class="ie-symbol" src="images/expense.svg">
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="option">
						new account
						<img src="images/plus-symbol.svg" class="plus-symbol">
					</div>
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						airbnb
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						personal
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						airbnb
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						personal
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						airbnb
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						personal
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #ecf9ff;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- New expense or income window
		Choosing category (step 2)-->
	<div id="ie-choose-category" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title window-title-italic">
					personal account
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option">
					Select a category
					<img class="ie-symbol" src="images/expense.svg">
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper" style="height: 90%">
					<!-- 90% height when there is a title in the contents alongside many options -->
					<div class="option">
						new category
						<img src="images/plus-symbol.svg" class="plus-symbol">
					</div>
					<div class="option">
						junk food
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						crypto
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						investment
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						legal
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						entertainment
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						work related
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						incidentals
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						food
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #ecf9ff;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- New Account window -->
	<div id="new-account" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					New Account
				</span>
				</div>
			</button>
		</div>
		
		<div class="window-footer" style="    height: 100vh;">
			<div class="perma-items">
				<div class="text-bubble">
					<div contenteditable autofocus></div>
					<img src="images/cross.svg" alt="cancel" class="cross">
					<img src="images/check.svg" alt="confirm" class="check">
				</div>
			</div>
		</div>
	</div>

	<!-- New Category window -->
	<div id="new-category" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title window-title-italic">
					personal account
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 68vh;">
			<div class="option">
				<span>New category</span>
				<img class="ie-symbol" src="images/expense.svg">
			</div>
		</div>
		
		<div class="window-footer" style="    height: 100vh;">
			<div class="perma-items">
				<div class="text-bubble">
					<div contenteditable autofocus>
					tech</div>
					<img src="images/cross.svg" alt="cancel" class="cross">
					<img src="images/check.svg" alt="confirm" class="check">
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- New expense or income window
		Choosing amount (step 3)-->
	<div id="ie-choose-amount" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title window-title-italic">
					personal » food
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 68%;"> <!-- 68% is the right height for 2 options in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option">
					Amount
					<img class="ie-symbol" src="images/expense.svg">
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="option">
						9
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						8
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						1
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						7
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						5
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer" style="min-height: 8em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">Other amount<div class="square-symbol"></div></div>
				<div class="option" style="background: #fff;">Back<div class="square-symbol symbol2 back"></div></div>
			</div>
		</div>
	</div>

	<!-- Custom amount window -->
	<div id="custom-amount" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title window-title-italic">
					personal » food
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option">
					Amount
					<img class="ie-symbol" src="images/expense.svg">
				</div>
			</div>
		</div>

		<div id="num-pad">
			<table>
				<tr>
					<td class="inactiveCell"></td>
					<td colspan="5">0</td>
					<td class="inactiveCell"></td>
				</tr>
				<tr>
					<td class="inactiveCell"></td>
					<td>.99</td>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>
						<img src="images/backspace.svg" alt="delete">
					</td>
					<td class="inactiveCell"></td>
				</tr>
				<tr>
					<td class="inactiveCell"></td>
					<td>.90</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
					<td>
						<img src="images/cancel.svg" alt="cancel">
					</td>
					<td class="inactiveCell"></td>
				</tr>
				<tr>
					<td class="inactiveCell"></td>
					<td>.50</td>
					<td>7</td>
					<td>8</td>
					<td>9</td>
					<td rowspan="2">
						<img src="images/next.svg" alt="next">
					</td>
					<td class="inactiveCell"></td>
				</tr>
				<tr>
					<td class="inactiveCell"></td>
					<td>.25</td>
					<td style="font-size: 1.3em;">.10</td>
					<td>0</td>
					<td>•</td>
				</tr>
			</table>
		</div>
	</div>

	<!-- Expense or income Added successfully -->
	<div id="ie-added" class="window">

		<div class="window-body" style="height: 56vh; top: 5vh; text-align: center;">
			<img class="ei-added" src="images/expense-added.svg">
			<p class="ei-added-title" style="font-size: 1.5em;">
				expense added <img class="ie-symbol small-ei-added" src="images/expense.svg">
			</p>
			<p class="ie-resume">

				amount
				<span style="margin-left: 1.5em">
					:
				</span>
				<span class="ie-added-amount" style="margin-left: .8em">
					-5
				</span><br>


				account
				<span style="margin-left: 1.43em">
					:
				</span>
				<span class="ie-added-account" style="margin-left: .8em">
					personal
				</span><br>


				category
				<span style="margin-left: 1.18em">
					:
				</span>
				<span class="ie-added-category" style="margin-left: .8em">
					food
				</span><br>


				date
				<span style="margin-left: 2.85em">
					:
				</span>
				<span class="ie-added-date" style="margin-left: .8em">
					today
				</span><br>


				description
				<span style="margin-left: .1em">
					:
				</span>
				<span class="ie-added-desc" style="margin-left: .8em">
					none
				</span><br>
			</p>
		</div>
		
		<div class="window-footer" style="height: 20em"><!-- 20em is a placeholder -->
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					make this a shortcut
					<div class="square-symbol symbol2 shortcut"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					<span>delete this expense</span>
					<div class="square-symbol symbol2 delete"></div>
				</div>
				<div class="option" style="background: #f5fcff;">
					edit description
					<div class="square-symbol symbol2 pen"></div>
				</div>
				<div class="option" style="background: #f1faff;">
					edit category
					<div class="square-symbol symbol2 pen"></div>
				</div>
				<div class="option" style="background: #f1faff;">
					edit amount
					<div class="square-symbol symbol2 hash"></div>
				</div>
				<div class="option" style="background: #f1faff;">
					edit date
					<div class="square-symbol symbol2 date"></div>
				</div>
				<div class="option" style="background: #ecf9ff; font-weight: 400;">
					Done
					<div class="square-symbol symbol2 done"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Custom date window -->
	<div id="custom-date" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title window-title-italic">
					personal » food
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 63vh;"> <!-- 75% is the right height for 3 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option">
					Date
					<img class="ie-symbol" src="images/expense.svg">
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="item-wrapper" style="height: 90%; text-align: center;">
					<div id="ie-custom-date-picker" class="datepicker-here" data-language='en'></div>
				</div>
			</div>
		</div>
		
		<div class="window-footer" style="height: 12em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					cancel
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					yesterday
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #f5fcff; font-weight: 400;">
					Done
					<div class="square-symbol symbol2 done"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Add description window -->
	<div id="add-desc" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon"></div>
			</button>
		</div>

		<div class="window-body" style="height: 68vh; text-align: center;">
			<div class="option">
				Description
				<img class="ie-symbol" src="images/expense.svg">
			</div>
			<p class="ie-resume" style="margin-top: 1em;">

				Amount
				<span style="margin-left: 1.5em">
					:
				</span>
				<span class="ie-added-amount" style="margin-left: .8em">
					-5
				</span><br>


				Account
				<span style="margin-left: 1.5em">
					:
				</span>
				<span class="ie-added-account" style="margin-left: .8em">
					Personal
				</span><br>


				Category
				<span style="margin-left: 1.2em">
					:
				</span>
				<span class="ie-added-category" style="margin-left: .8em">
					Food
				</span><br>


				Date
				<span style="margin-left: 2.95em">
					:
				</span>
				<span class="ie-added-date" style="margin-left: .8em">
					Today
				</span><br>

			</p>
		</div>
		
		<div class="window-footer" style="    height: 100vh;">
			<div class="perma-items">
				<div class="text-bubble">
					<div contenteditable autofocus></div>
					<img src="images/cross.svg" alt="cancel" class="cross">
					<img src="images/check.svg" alt="confirm" class="check">
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Window to change an existing transaction's category -->
	<div id="change-category" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title window-title-italic">
					personal account
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option">
					Select new category
					<img class="ie-symbol" src="images/expense.svg">
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper" style="height: 90%">
					<!-- 90% height when there is a title in the contents alongside many options -->
					<div class="option">
						new category
						<img src="images/plus-symbol.svg" class="plus-symbol">
					</div>
					<div class="option">
						junk food
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						crypto
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						investment
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						legal
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						entertainment
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						work related
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						incidentals
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						food
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #ecf9ff;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Menu window-->
	<div id="menu" class="window">
		<!-- <div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Menu
				</span>
				</div>
			</button>
		</div>
		 -->
		<div class="window-footer" style="height: 36em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					<span>Take our <b>survey</b></span>
					<div class="square-symbol symbol2 pen"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					Leave Feedback
					<div class="square-symbol symbol2 pen"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					Share Books App
					<div class="square-symbol symbol2 share"></div>
				</div>
				<div class="option" style="background: #e7f7ff;">
					Edit an Account
					<div class="square-symbol symbol2 erase"></div>
				</div>
				<div class="option" style="background: #ecf9ff;">
					Edit a Category
					<div class="square-symbol symbol2 erase"></div>
				</div>
				<div class="option" style="background: #e3f6ff;">
					Edit a Shortcut
					<div class="square-symbol symbol2 erase"></div>
				</div>
				<div class="option" style="background: #f1faff;">
					Export to CSV or Excel
					<div class="square-symbol symbol2 download"></div>
				</div>
				<div class="option" style="background: #def4ff;">
					View Transactions
					<div class="square-symbol symbol2 search"></div>
				</div>
				<div class="option" style="background: #d9f3ff; font-weight: 400">Close<div class="square-symbol symbol2 close"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Share window -->
	<div id="share" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Share Books
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->

			<div class="window-body-content" style="text-align: center;">
				<a href="http://getbluebooks.com" target="_blank">
					<img class="qr-code" src="images/qr-code.png" alt="getbluebooks.com"><p class="site-url">getbluebooks.com</p>
				</a>
			</div>
		</div>
		
		<div class="window-footer" style="height: 20em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					Send via Email
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					Send via Messenger
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #f5fcff;">
					Send via WhatsApp
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #f1faff;">
					Copy URL
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #ecf9ff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>


	<!-- Survey window -->
	<div id="survey" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Survey
				</span>
				</div>
			</button>
		</div>

		<div class="window-body"></div>
	</div>


	<!-- CSV Export window -->
	<div id="export" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Export to CSV
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->

			<div class="window-body-header">
				<p style="margin-top: 2em; font-weight: 400;">Select an Account to Export From</p>
				<p style="font-size:1.1em; line-height: 1.5em; padding: 0 8vw;">
					CSV files can be viewed by Microsoft Word, Google Docs, Pages, OpenOffice and more
				</p>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator" style="top: 9em;"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper" style="height: 75%;">
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						airbnb
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						personal
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #f1faff; font-weight: 400;">
					Back
					<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Export Select timeframe-->
	<div id="export-select-timeframe" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Export to CSV
				</span>
				</div>
			</button>
		</div>

		<div class="window-body">
			<div class="window-body-content" style="text-align: center;">
				<p style="margin-top: 2em;">Exporting Personal Account</p>
			</div>
		</div>
		
		<div class="window-footer" style="height: 16em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					Export all Data
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					Export a Year
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #f5fcff;">
					Export a Month
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #f1faff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Export select month -->
	<div id="export-select-month" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Export to CSV
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 63vh;">
			<!-- options to tap here -->
			<div class="window-body-content">
				<p style="margin-top: 2em;">Select Month to Export</p>
				<div class="item-wrapper" style="height: 80%; text-align: center;">
					<!-- 90% height when there is a title in the contents alongside many options -->
					<div id="export-month-picker" class="datepicker-here" data-language='en' data-min-view="months"data-view="months"
					></div>
				</div>
			</div>
		</div>
		
		<div class="window-footer" style="height: 8em;">
			<div class="perma-items">
				<div class="option" style="background: transparent;">Next<div class="square-symbol">	</div>
				</div>
				<div class="option" style="background: transparent; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Export select year -->
	<div id="export-select-year" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Export to CSV
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;">
			<div class="window-body-header" style="text-align: center; width: 100%; height: auto;">
				<p style="margin-top: 2em;">Select Year to Export</p>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator" style="top:80px;"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper" style="height: 90%">
					<!-- 90% height when there is a title in the contents alongside many options -->
					<div class="option">
						2010
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2011
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2012
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2013
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2014
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2015
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2016
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2017
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						2018
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- CSV Export file ready window -->
	<div id="export-file-ready" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
						Export to CSV
					</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->

			<div class="window-body-content" style="text-align: center;">
				<p style="margin-top: 2em;">
					File ready
				</p>
			</div>
		</div>
		
		<div class="window-footer" style="height:16em;">
			<div class="perma-items">
				<div class="option" style="background: #fafdff; font-weight: 400;">
					Download CSV File
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fff;">
					Back
					<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Write feedback window -->
	<div id="write-feedback" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
						Leave us Feedback
					</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 68vh; text-align: center;">
			<p class="ie-resume" style="margin-top: 2em; margin-bottom: 0.7em;">
				How do you feel about Books?
			</p>
			<div class="face-container">
				<img src="images/face/1.svg" alt="1 star">
				<img src="images/face/2.svg" alt="2 star">
				<img src="images/face/3.svg" alt="3 star">
				<img src="images/face/4.svg" alt="4 star">
				<img src="images/face/5.svg" alt="5 star">
			</div>
		</div>
		
		<div class="window-footer" style="    height: 100vh; pointer-events: none;">
			<div class="perma-items">
				<div class="text-bubble" style="pointer-events: all;">
					<div contenteditable autofocus></div>
					<img src="images/cross.svg" alt="cancel" class="cross">
					<img src="images/check.svg" alt="confirm" class="check">
				</div>
			</div>
		</div>
	</div>

	<!-- feedback received window -->
	<div id="feedback-received" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Leave us Feedback
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->

			<div class="window-body-content" style="text-align: center;">
				<p style="margin-top: 2em; font-weight: 400;">Thank you!</p>
				<p style="font-size:1em; padding: 0 8vw;">
					We will keep working<br>on improving your<br>experience
				</p>
			</div>
		</div>
		
		<div class="window-footer" style="height:8em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					Rate in app store
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fff; font-weight: 400;">
					Exit
					<div class="square-symbol"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- View transactions choose account window -->
	<div id="transactions-choose-account" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					View Transactions
				</span>
				</div>
			</button>
		</div>
		
		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option" style="width: 100%; padding-right: 0; text-align: center;">
					Select an account
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						airbnb
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						personal
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff; font-weight: 400;">
					Back
					<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Transaction viewer window -->
	<div id="view-transactions" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Viewing Personal
					</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;">
			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator" style="top:-1%"><!-- -1% is chosen on windows without a title --></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="item">
						<span style="font-weight: 400;">See more</span>
						<img class="plus-symbol" src="images/plus-symbol.svg">
					</div>
					<div class="item">
						Jul 7 airbnb cash &nbsp;+456
						<img class="ie-symbol" src="images/income.svg">
					</div>
					<div class="item">
						<img class="other-ie-symbols" src="images/description.svg" alt="description">
						Jul 7 transport &nbsp;-4
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						<img class="other-ie-symbols" src="images/description.svg" alt="description">
						Jul 8 entertainment &nbsp;-5
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						Jul 8 software &nbsp;-17
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						Jul 8 junk food &nbsp;-3.8
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						Jul 8 junk food &nbsp;-8
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						Jul 9 transport &nbsp;-0.8
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						Jul 10 food &nbsp;-5
						<img class="ie-symbol" src="images/expense.svg">
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff; font-weight: 400;">
					Back
					<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Edit an account select account window -->
	<div id="edit-account-select-account" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Edit an Account
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->

			<div class="window-body-header">
				<div class="option" style="width: 100%; padding-right: 0; text-align: center;">
					Select an account
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content" style="height: 90%;">
				<div class="top-scroll-indicator" style="top: -1%;"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						personal
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						airbnb
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						new account
						<img src="images/plus-symbol.svg" class="plus-symbol">
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Edit an account window -->
	<div id="edit-account" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
						Edit an Account
					</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header" style="width: 100%;height: auto;">
				<p style="text-align:center;margin-top: 2em;">Editing account <b>personal</b></p>
			</div>
		</div>
		
		<div class="window-footer" style="height: 12em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">Edit name<div class="square-symbol">	</div></div>
				<div class="option" style="background: #fff;">Delete<div class="square-symbol"></div></div>
				<div class="option" style="background: #fff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div></div>
			</div>
		</div>
	</div>

	<!-- Delete account confirmation window -->
	<div id="delete-account-confirmation" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<span class="window-home-title">Go home ↩</span>
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Edit an Account
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"><!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header" style="width: 100%;height: auto;">
				<p style="text-align:center;margin-top: 2em;">Are you sure you wish to<br>permantently delete <span style="font-weight: 400;">Personal</span><br>and all of its financial data?</p>
			</div>
		</div>
		
		<div class="window-footer" style="height: 8em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					Yes
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fafdff; font-weight: 400;">
					No
					<div class="square-symbol"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Edit a category window -->
	<div id="edit-category-select-account" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Edit a Category
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header">
				<div class="option" style="width: 100%; padding-right: 0; text-align: center;">
					Select an account
				</div>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						airbnb
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						personal
						<div class="square-symbol"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff; font-weight: 400;">
					Back
					<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Edit a category income or expense window -->
	<div id="edit-category-income-or-expense" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
					Edit a Category
				</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header" style="width: 100%;height: auto;">
				<p style="text-align:center;margin-top: 2em;">Personal account</p>
			</div>
		</div>
		
		<div class="window-footer" style="height: 12em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					Income categories
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					Expense categories
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #f5fcff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Edit a category select category window -->
	<div id="edit-category-select-category" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
						Edit a Category
					</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header" style="width: 100%;height: auto;">
				<p style="text-align:center;">Select an income category to edit</p>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator" style="top:3.7em;"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="option">
						junk food
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						crypto
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						investment
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						nixden
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						legal
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						entertainment
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						work related
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						incidentals
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						food
						<div class="square-symbol"></div>
					</div>
					<div class="option">
						new category
						<img src="images/plus-symbol.svg" class="plus-symbol">
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Edit a category window -->
	<div id="edit-category" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
						Edit a Category
					</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;"> <!-- 75% is the right height for 1 option in perma-items -->
			<!-- questions and titles-->
			<div class="window-body-header" style="width: 100%;height: auto;">
				<p style="text-align:center;">Personal » Incomes » entertainment</p>
			</div>
		</div>
		
		<div class="window-footer" style="height: 12em;">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					Delete
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #fafdff;">
					Edit name
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #f5fcff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Edit a shortcut window -->
	<div id="edit-shortcut" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
						Edit a Shortcut
					</span>
				</div>
			</button>
		</div>

		<div class="window-body" style="height: 75%;">

			<div class="window-body-header" style="width: 100%;height: auto;">
				<p style="text-align:center;margin-top: 2em;">Select a shortcut to edit</p>
			</div>

			<!-- options to tap here -->
			<div class="window-body-content" style="height: 90%;">
				<div class="top-scroll-indicator" style="top: 1.3em;"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="item">
						airbnb » booking cash &nbsp;+44
						<img class="ie-symbol" src="images/income.svg">
					</div>
					<div class="item">
						personal » transport &nbsp;-5
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » transport &nbsp;-0.8
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						personal » food &nbsp;-5
						<img class="ie-symbol" src="images/expense.svg">
					</div>
					<div class="item">
						New shortcut
						<img class="plus-symbol" src="images/plus-symbol.svg">
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff; font-weight: 400;">
					Back
					<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- New shortcut window -->
	<div id="new-shortcut" class="window">
		<div class="window-header">
			<img class="home-icon" src="images/home-button.svg" alt="Home">
			<button class="menuButton post-menu">
				<div class="menu-icon">
					<span class="window-title">
						New Shortcut
					</span>
				</div>
			</button>
		</div>
		<div class="window-body" style="height: 75%;">

			<!-- options to tap here -->
			<div class="window-body-content">
				<div class="top-scroll-indicator" style="top: -1%;"></div>
				<div class="bottom-scroll-indicator"></div>
				<div class="item-wrapper">
					<div class="item">
						income
						<img class="ie-symbol" src="images/income.svg">
					</div>
					<div class="item">
						expense
						<img class="ie-symbol" src="images/expense.svg">
					</div>
				</div>
			</div>
		</div>
		
		<div class="window-footer">
			<div class="perma-items">
				<div class="option" style="background: #fff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
		<span class="window-home-title">Go home ↩</span>
	</div>

	<!-- Edit a shortcut overview window -->
	<div id="edit-shortcut-overview" class="window">

		<div class="window-body" style="height: 56vh; top: 5vh; text-align: center;">
			<img class="ei-added" src="images/income-added.svg">
			<p class="ei-added-title" style="font-size: 1.5em;">
				<span>Income Shortcut</span>
				<!-- The following icon only appears on small screens -->
				<img class="ie-symbol small-ei-added" src="images/income.svg">
			</p>
			<p class="ie-resume">

				Amount
				<span style="margin-left: 1.5em">
					:
				</span>
				<span class="ie-added-amount" style="margin-left: .8em">
					+44
				</span><br>


				Account
				<span style="margin-left: 1.5em">
					:
				</span>
				<span class="ie-added-account" style="margin-left: .8em">
					Airbnb
				</span><br>


				Category
				<span style="margin-left: 1.2em">
					:
				</span>
				<span class="ie-added-category" style="margin-left: .8em">
					Booking Cash
				</span><br>
			</p>
		</div>
		
		<div class="window-footer" style="height: 8em">
			<div class="perma-items">
				<div class="option" style="background: #fff;">
					Delete
					<div class="square-symbol"></div>
				</div>
				<div class="option" style="background: #ecf9ff; font-weight: 400;">Back<div class="square-symbol symbol2 back"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- App's JS at the end of the page to let the HTML display things before the web's JS is fully loaded -->
	<!-- App's JS -->
	<script src="lib/anime.min.js"></script>
	<!-- <script type="module" src="lib/animateplus.js?<?=time()?>"></script> -->
	<script src="lib/hover-tap-detector.js"></script>
	<!-- exposes device data to attach it to the feedback and know how to replicate a bug for example -->
	<script src="lib/detect.js"></script>
	<script src="lib/replaceAll.js"></script>
	<script src="js/exportToCSV.js?<?=time()?>"></script>
	<script src="js/app.js?<?=time()?>"></script>
	<script src="js/frequencies.js?<?=time()?>"></script>
	<!-- preloading audio -->
	<script src="js/window-management.js?<?=time()?>"></script>
</div class="body-wrapper"></body>
</html>