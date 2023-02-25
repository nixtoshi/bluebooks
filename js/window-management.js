// We can animate directly because the windows have been positioned and transformed outside the viewer's reach via CSS in the file style.css

let booksVersion = 0.9

// hiding all windows
const windows = $('.window')
for (let i = 0; i < windows.length; i++) {
	$(windows[i]).css('display', 'none')
}

// Creating the selector :textEquals("") for jquery selection later on
$.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().match("^" + arg + "$")
    }
})

// DEV TESTING ONLY

$('#home-window > .window-header > img.home-icon').click(function () {
	// localStorage.clear()
	alert('working');
})

// Action tracker. Global variables that track what the user is doing

let activity
// tracks the user's activity within the app
let activeIe
// tracks wether we should customize the interface for an income or expens
let activeAmount
// tracks the amount in question
let activeAccount
// tracks the account in question
let activeCategory
// tracks the category in question
let activeDate
// tracks the date in question in Google format
let newDate
// tracks a user selected date in Google format
let jsDate
// tracks the date in question in js format
let activeDesc
// tracks the note in question
let newDesc
// tracks a user selected description
let activePicture
// tracks the picture in question
let seeMore = 1
// tracks the number of times the user has clicked on the "See More" button when browsing transactions. Default is 1
let activeScroll
// global variable that tracks the height to which we had scrolled to when viewing transactions
let activeCSV
// tracks the generated CSV content when exporting to CSV
let activeCSVname
// tracks the name that the CSV file should have
let activeStars
// Feedback value tracker (1-5 scale)

function findKey(objectArray, key, value) {
	for (let i = objectArray.length - 1; i >= 0; i--) {
		if (objectArray[i][key] === value) {
			return i
		}
	}
	return false
}

function storage(key, data) {

	// If key doesn't exist yet we make it an empty array
	if (localStorage[key] === undefined && data === undefined) {
		localStorage[key] = '[]'
		return JSON.parse(localStorage[key])
	}

	// When only key is passed, return contents
	if (data === undefined) {
		return JSON.parse(localStorage[key])
	}

	// Otherwise replace the data
	localStorage[key] = JSON.stringify(data)
}


// Window history tracker and indexer. Extremely important for animations to show right

let windowChain = []

function orderWindow(id, action = 'open') {
	if ($('#'+id).length === 0) {
		console.error(`orderWindow() error: '${id}' id doesn't exist`)
		return false
	}
	// let url = window.location.origin + window.location.pathname
	if (action === 'open') {
		windowChain.push(id)
		$('#'+id).css('z-index', windowChain.length)
		window.location.hash = `#${id}`
	} else if (windowChain.length > 1) {
		windowChain.pop()
		window.location.hash = `#${windowChain[windowChain.length-1]}`
	}
}

// Replaces going back and going forward button. Special function to fire when the window being hidden is the menu window

window.onpopstate = function() {
	if('#' + windowChain[windowChain.length-1] !== location.hash && windowChain[windowChain.length-1] === 'menu'){
		toggleMenu()

	} else if ('#' + windowChain[windowChain.length-1] !== location.hash) {
		goBack()
	}
}

// Window functions related to open / close animations X = horizontally and Y = vertically

const displayX = function (id, action = 'open') {
	// showing screen
	$('#'+id).css('display', 'block')

	// adding scroll
	let windowBehind
	if (action !== 'open') {

		windowBehind = windowChain[windowChain.length - 2]

		if ($('#' + windowBehind + ' .item-wrapper').length > 0 && windowBehind !== 'view-transactions') {
			$('#' + windowBehind).css('display', 'block')
			scrollWrapper(windowBehind)
		}
	} else if ($('#'+id+' .item-wrapper').length > 0) {
		scrollWrapper(id)
	}
	

	// default action is open is 2nd parameter hasn't been defined

	let translate

	if (action === 'open') {
		orderWindow(id)
		translate = '-100%'
	} else {
		orderWindow(id, 'close')
		translate = 0
	}

	anime({
		targets: `#${id}`,
		translateX: translate,
		duration: 900,
		easing: 'easeInOutQuart',
		complete: function () {
			if (action !== 'open') {
				$('#'+id).css('display', 'none')
			}
		}
	})
}

const displayY = function (id, action = 'open') {
	// showing screen
	$('#'+id).css('display', 'block')
	
	// adding scroll
	let windowBehind
	if (action !== 'open') {

		windowBehind = windowChain[windowChain.length - 2]

		if ($('#' + windowBehind + ' .item-wrapper').length > 0 && windowBehind !== 'view-transactions') {
			$('#' + windowBehind).css('display', 'block')
			scrollWrapper(windowBehind)
		}
	} else if ($('#'+id+' .item-wrapper').length > 0) {
		scrollWrapper(id)
	}

	// default action is open is 2nd parameter hasn't been defined

	let translateY

	if (action === 'open') {
		orderWindow(id)
		translateY = '100%'
	} else {
		orderWindow(id, 'close')
		translateY = 0
	}

	anime({
		targets: '#'+id,
		translateY: translateY,
		duration: 900,
		easing: 'easeInOutQuart',
		complete: function () {
			if (action !== 'open') {
				$('#'+id).css('display', 'none')
			}
		}
	})
}

// function that fires when clicking on an automatically generated shortcut
function clickShortcut(item) {
	setActivity('newIe')
	if ($(item).find('img').attr('src') === 'images/expense.svg') {
		activeIe = 'expense'
	} else if ($(item).find('img').attr('src') === 'images/income.svg') {
		activeIe = 'income'
	}
	activeAccount = $(item).find('span')[0].innerText
	category = $(item).find('span')[1].innerText
	ieChooseAmount(category)
}

function clickUserShortcut(item) {
	setActivity('newIe')

	activeAccount = $(item).find('span')[0].innerText
	activeCategory = $(item).find('span')[1].innerText
	activeAmount = $(item).find('span')[3].innerText

	let negative = ''
	if ($(item).find('img').attr('src') === 'images/expense.svg') {
		activeIe = 'expense'
		negative = '-'
	} else if ($(item).find('img').attr('src') === 'images/income.svg') {
		activeIe = 'income'
	}

	let userShortcuts = storage('userShortcuts')

	let shorcutId = activeAccount+activeCategory+activeIe+activeAmount

	calcFrequency(userShortcuts, shorcutId)

	storage('userShortcuts', userShortcuts)

	storeTx()

	// display ie-added summary
	ieAdded()
}

// homeWindow when clicking on the logo

function homeWindow(update) {
	// Update homeWindow before displaying. If update is true, it will only update and not display

	let Window = $('#home-window')

	// Loading list
	let html = ''

	// Checking if there are shortcuts in localStorage then add them

	if (storage('shortcuts').length > 0) {

		let shortcuts = sortByKey(storage('shortcuts'), 'frequency')

		for (let i = 0; i < shortcuts.length; i++) {

			let s = shortcuts[i]

			html += `<div onclick="clickShortcut(this)" class="item"><span>${s.account}</span> » <span>${s.category}</span><img class="ie-symbol" src="images/${s.ie}.svg"></div>`
		}
	}

	// Calculating frequencies
	storage('userShortcuts', calcFrequency(storage('userShortcuts')))

	// Checking if there are user created shortcuts in localStorage then add them
	if (storage('userShortcuts').length > 0) {

		let userShortcuts = sortByKey(storage('userShortcuts'), 'frequency')

		for (let i = 0; i < userShortcuts.length; i++) {

			let s = userShortcuts[i]

			let negative = ''

			if (s.ie === 'expense') {
				negative = '-'
			}

			html += `<div onclick="clickUserShortcut(this)" class="item"><span>${s.account}</span> » <span>${s.category}</span> <span>${negative}</span><span>${s.amount}</span><img class="ie-symbol" src="images/${s.ie}.svg"></div>`
		}
	}

	// Showing the list
	Window.find('.item-wrapper').html(html)

	filler('home-window')

	Window.find('.item-wrapper .item:contains("new shortcut")').click(function () {
		newShorcut()
	})

	// Hiding all windows on top of home-window
	for (let i = windowChain.length - 1; i >= 0; i--) {
		if (windowChain[i] === 'menu') {
			menuOnScreen = false
			displayY('menu', 'close')
		} else if (windowChain[i] === 'welcome-window' || windowChain[i] === 'home-window') {
			// do nothing
		} else {
			displayX(windowChain[i], 'close')
		}
	}

	// Display home window
	if (update === undefined) {
		displayX('home-window')
	}

	setActivity()
}

// Applying homeWindow function to the relevant triggers
$('img.home-icon').click(function () {
	homeWindow('UPDATE')
})

// New income/expense choose account

const ieChooseAccount = function (ie) {
	// Passing 'UPDATE' to the ie parameter will make this function only update the list of accounts to choose from, it won't open the window or customize it

	let Window = $('#ie-choose-account')

	// Customization

	if (ie !== 'UPDATE') {
		setActivity('newIe')

		if (ie === 'income') {

			activeIe = 'income'

			// Title
			Window.find('.window-title').text('new income')

			// Icon
			Window.find('.ie-symbol').attr('src', 'images/income.svg')

		} else if (ie === 'expense') {

			activeIe = 'expense'

			// Title
			Window.find('.window-title').text('new expense')

			// Icon
			Window.find('.ie-symbol').attr('src', 'images/expense.svg')
		}
	}

	// Loading account list

	let html = '<div class="option newAccount">new account<img src="images/plus-symbol.svg" class="plus-symbol"></div>'

	// Calculating frequencies
	storage('accounts', calcFrequency(storage('accounts')))

	// Validating if there are accounts in localStorage
	if (storage('accounts').length > 0) {

		let accounts = sortByKey(storage('accounts'), 'frequency')

		for (let i = 0; i < accounts.length; i++) {

			html += `<div onclick="ieChooseCategory($(this).text())" class="option">${accounts[i]['id']}<div class="square-symbol"></div></div>`

		}
	}

	Window.find('.item-wrapper').html(html)
	filler('ie-choose-account')

	// Giving functionality to new account button

	Window.find('.item-wrapper .option.newAccount').click(function () {
		newAccount()
	})

	// Open window
	if (ie !== 'UPDATE') {
		displayX('ie-choose-account')
	}
	// If there is not account to choose from it opens the new-account window
	// if (ie !== 'UPDATE' && storage('accounts').length === 0) {
	// 	newAccount()
	// }
	// I commented this, because the UX feels ackward. It's not intuitive what account you are creating for the first time
}

// View transactions choose account
const transactionsChooseAccount = function (parameter) {
	// Passing 'UPDATE' as the parameter will make this function only update the list of accounts to choose from, it won't open the window

	let winId = 'transactions-choose-account'

	let Window = $('#'+winId)

	// Loading account list

	let html = ''

	// Calculating frequencies
	storage('accounts', calcFrequency(storage('accounts')))

	// Validating if there are accounts in localStorage
	if (storage('accounts').length > 0) {

		let accounts = sortByKey(storage('accounts'), 'frequency')

		for (let i = 0; i < accounts.length; i++) {

			html += `<div onclick="viewTransactions($(this).text())" class="option">${accounts[i]['id']}<div class="square-symbol"></div></div>`
		}
	} else {
		alert(`You can't view transactions until you create an account!`)
		return
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	// Open window
	if (parameter !== 'UPDATE') {
		displayX(winId)
	}
}

// View transactions function
const viewTransactions = function (account) {
	// Passing 'UPDATE' to the parameter will make this function only update the list, it won't open the window or customize it

	if (account !== 'UPDATE') {
		activeAccount = account
		seeMore = 1
	}

	let winId = 'view-transactions'
	let Window = $('#'+winId)

	// Customization

	if (account !== 'UPDATE') {
		Window.find('.menu-icon .window-title').text(`Viewing ${account}`) // √
	}

	// Loading tx list

	let accounts = storage('accounts')

	let accountPosition = findKey(accounts, 'id', activeAccount)

	let html = ''

	// Adding the see more button if there are many txs to show

	let load = 50 // number of txs to load from in tx history for every See More tap

	if (accounts[accountPosition].txs.length > load * seeMore) {
		html = '<div id="seeMore" class="item"><span style="font-weight: 400;">See more</span><img class="plus-symbol" src="images/plus-symbol.svg"></div>'
	}

	// Validating if there are txs
	if (accounts[accountPosition].txs.length > 0) {

		let txs = sortByKey(accounts[accountPosition].txs, 'jsdate')

		let limit = txs.length - seeMore * load

		if (limit < 0) {
			limit = 0
		}

		for (let i = 0 + limit; i < txs.length; i++) {

			let date = readableDate(txs[i].date)

			let category = txs[i].category

			let amount = txs[i].amount

			let ieSymbol = 'expense'
			if (amount > 0) {
				ieSymbol = 'income'
				amount = '+' + amount
			}

			// we must add description icon if there is a desc
			let desc = ''
			if (txs[i].description !== undefined) {
				desc = '<img class="other-ie-symbols" src="images/description.svg" alt="description">'
			}

			let jsdate = txs[i].jsdate

			html += `<div onclick="ieAdded('${jsdate}'), activeScroll = $('#view-transactions .item-wrapper')[0].scrollTop" class="item">${amount} ${category} ${date} ${desc}<img class="ie-symbol" src="images/${ieSymbol}.svg"></div>`
		}
	} else {
		alert(`No transactions found in account "${activeAccount}"`)
		return
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)
	scrollWrapper(winId)

	if (activeScroll !== undefined) {
		Window.find('.item-wrapper')[0].scrollTop = activeScroll
		activeScroll = undefined
	}

	// Giving functionality to See More

	if (Window.find('#seeMore').length > 0) {
		Window.find('.item-wrapper span:textEquals("See more")').parent().click(function () {
			// recording the height of the scroll in the global variable
			activeScroll = Window.find('.item-wrapper')[0].scrollTop
			// adding 1 to seeMore
			seeMore++
			// reloading viewTransactions window
			viewTransactions('UPDATE')
		})
	}

	// Open window
	if (account !== 'UPDATE') {
		displayX(winId)
	}
}

// New income/expense choose category

const ieChooseCategory = function (account) {
	// Passing 'UPDATE' to the account parameter will make this function only update the list, it won't open the window

	let winId = 'ie-choose-category'

	let Window = $('#'+winId)

	if (account !== 'UPDATE') {
		activeAccount = account
	}

	// Window customization
	// Title
	Window.find('.window-title').text(activeAccount + ' account')

	if (activeIe === 'income') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/income.svg')

	} else if (activeIe === 'expense') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/expense.svg')
	}

	// Loading category list

	let html = '<div class="option newCategory">new category<img src="images/plus-symbol.svg" class="plus-symbol"></div>'

	// Calculating frequencies for incomeCategories and expenseCategories
	let accountList = storage('accounts')

	let accountPosition = false

	accountPosition = findKey(accountList, 'id', activeAccount)

	if (accountPosition !== false) {
		if (activeIe === 'income') {
		accountList[accountPosition].incomeCategories = calcFrequency(accountList[accountPosition].incomeCategories)

		} else if (activeIe === 'expense') {
			accountList[accountPosition].expenseCategories = calcFrequency(accountList[accountPosition].expenseCategories)
		}
	}

	// Writing updated frequencies to storage
	storage('accounts', accountList)

	// Checking if there are categories
	if (accountPosition !== false) {
		if (accountList[accountPosition][activeIe+'Categories'].length > 0) {

		let categories = sortByKey(accountList[accountPosition][activeIe+'Categories'], 'frequency')

		for (let i = 0; i < categories.length; i++) {
			html += `<div onclick="ieChooseAmount($(this).text())" class="option">${categories[i]['id']}<div class="square-symbol"></div></div>`

			}
		}
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	// Giving functionality to new category button

	Window.find('.item-wrapper .option.newCategory').click(function () {
		newCategory()
	})

	// Open window
	if (account !== 'UPDATE') {
		displayX(winId)
	}

	// // If there is no category to choose from it opens the new-category window
	// if (account !== 'UPDATE' && storage('accounts')[accountPosition][activeIe+'Categories'].length === 0) {
	// 	newCategory()
	// }
	// I commented this, because the UX feels ackward, as if it's not intuitive that you are creating a new category because you have to select one. It's more intuitive going from selected category to new amount directly.
}

// function to change the category from an existing transaction

const changeCategory = function () {

	let winId = 'change-category'

	let Window = $('#'+winId)

	// Window customization

	// Title
		let minus = '-'
		if (activeIe === 'income') {
			minus = ''
		}
		Window.find('.window-title').text(`${activeAccount} » ${activeCategory} ${minus}${activeAmount}`)

	if (activeIe === 'income') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/income.svg')

	} else if (activeIe === 'expense') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/expense.svg')
	}

	// Loading category list

	let html = ''

	let accounts = storage('accounts')

	let accountPosition = findKey(accounts, 'id', activeAccount)

	// Listing categories
	let categories = sortByKey(accounts[accountPosition][activeIe+'Categories'], 'frequency')

	for (let i = 0; i < categories.length; i++) {
		html += `<div onclick="changeCategoryConfirm($(this).text())" class="option">${categories[i]['id']}<div class="square-symbol"></div></div>`
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	// Open window
	displayX(winId)
}

const changeCategoryConfirm = function (newCategory) {
	activeCategory = newCategory
	storeTx('UPDATE')
	goBack()
}

// New income/expense choose account

const ieChooseAmount = function(category) {
	// Passing 'UPDATE' to the parameter will make this function only update the list, it won't open the window

	if (category !== 'UPDATE' && category) {
		activeCategory = category
	} else if (category === undefined) {
		console.error('ieChooseAccount: Missing "category" parameter')
		return false
	}

	// Calculating frequencies for amounts
	let accountList = storage('accounts')

	let accountPosition = findKey(accountList, 'id', activeAccount)
	let iEposition = findKey(accountList[accountPosition][activeIe+'Categories'], 'id', activeCategory)

	// If there are no previously recorded amounts, open custom amount instead
	if (accountList[accountPosition][activeIe+'Categories'][iEposition].amounts.length === 0) {
		activeCategory = category
		customAmount()
		return false
	}

	accountList[accountPosition][activeIe+'Categories'][iEposition].amounts = calcFrequency(accountList[accountPosition][activeIe+'Categories'][iEposition].amounts)
	
	// Writing updated frequencies to storage
	storage('accounts', accountList)

	// Commonly used variables

	let winId = 'ie-choose-amount'

	let Window = $('#'+winId)


	// Window customization

		// Title
		Window.find('.window-title').text(activeAccount + ' » ' + activeCategory)

		if (activeIe === 'income') {
			// Icon
			Window.find('.ie-symbol').attr('src', 'images/income.svg')

		} else if (activeIe === 'expense') {
			// Icon
			Window.find('.ie-symbol').attr('src', 'images/expense.svg')
		}

	// Loading list of common amounts for this account and category

	let html = ''

	let amounts = sortByKey(accountList[accountPosition][activeIe+'Categories'][iEposition].amounts, 'frequency')

	for (let i = 0; i < amounts.length; i++) {
		html += `<div class="option" onclick="activeAmount = $(this).find('span').text(), storeTx(), ieAdded()"><span>${Math.abs(amounts[i]['id'])}</span><div class="square-symbol"></div></div>`
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	// Open window
	if (category !== 'UPDATE') {
		displayX(winId)
	}

	// If there is no amount to choose from it opens the custom-amount window
	if (category !== 'UPDATE' && storage('accounts')[accountPosition][activeIe+'Categories'][iEposition].amounts.length === 0) {
		customAmount()
	}
}

// Giving "other amount" button functionality
$('#ie-choose-amount .perma-items div:contains("Other amount")').click(function () {
	customAmount()
})

// Open New Category window

const newCategory = function(edit) {

	let winId = 'new-category'

	let Window = $('#'+winId)

	// Customization

		// Title
		Window.find('.window-title').text(activeAccount + ' account')

		// Clearing any previously attached click event handler
		Window.find('img[alt="confirm"]').unbind('click')

		if (edit) {
			// body text 
			Window.find('.window-body div.option span').text('Edit category')
			// Functionality to Confirm name button
			Window.find('img[alt="confirm"]').click(function () {
				confirmEditCategory()
			})
			// Reset field
			Window.find('div[contenteditable]').text(activeCategory)
		} else {
			// body text 
			Window.find('.window-body div.option span').text('New category')
			// Functionality to Confirm name button
			Window.find('img[alt="confirm"]').click(function () {
				confirmNewCategory()
			})
			// Reset field
			Window.find('div[contenteditable]').text('')
		}

		if (activeIe === 'income') {
		// Icon
			Window.find('.ie-symbol').attr('src', 'images/income.svg')

		} else if (activeIe === 'expense') {
		// Icon
			Window.find('.ie-symbol').attr('src', 'images/expense.svg')
		}

	// Open window
	displayX(winId)

	// Focus text field
	Window.find('div[contenteditable]').selectText()
}

// Functionality to Cancel button
$('#new-category img[alt="cancel"]').click(function () {
	let textBox = $('#new-category div[contenteditable]')
	if (textBox.text() !== '') {
		textBox.text('')
		textBox.focus()
	} else {
		textBox.blur()
		goBack() // left here, we must use something different than settimeout
	}
})

const confirmNewCategory = function () {
	let categoryName = $('#new-category div[contenteditable]').text().toLowerCase()

 	// validating if the field isn't empty
 	if (categoryName === '') {
 		console.error('Empty category field')
 		return false
 	}

 	// Selecting expense or income categories

 	let accounts = storage('accounts')
 	let accountPosition = findKey(accounts, 'id', activeAccount)

 	// validate if category already exists
 	let alertMessage = `Category "${categoryName}" already exists!`
	let alreadyExists = findKey(accounts[accountPosition][activeIe+'Categories'], 'id', categoryName)
	if (alreadyExists !== false) {
		alert(alertMessage)
		return false
	}

	// Otherwise add new category
 	if (activeIe === 'expense') {
		accounts[accountPosition].expenseCategories.push(
			{
				'id' : categoryName,
				'frequency' : 0,
				'frequency-data' : [],
				'amounts' : []
			}
		)
 	} else if (activeIe === 'income') {
 		accounts[accountPosition].incomeCategories.push(
			{
				'id' : categoryName,
				'frequency' : 0,
				'frequency-data' : [],
				'amounts' : []
			}
		)
 	} else {
 		console.error('Unrecognized activeIe')
 		return false
 	}

	storage('accounts', accounts)

	// reload lists and go back
	$('#new-category div[contenteditable]').blur()
	setTimeout(function() {
		goBack()
	}, 50)
}

const customAmount = function (editAmount) {

	let winId = 'custom-amount'

	let Window = $('#'+winId)

	// Window customization

	// Title
	Window.find('.window-title').text(activeAccount + ' » ' + activeCategory)

	if (activeIe === 'income') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/income.svg')

	} else if (activeIe === 'expense') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/expense.svg')
	}

	Window.find('img[alt="next"]').parent().unbind('click')
	let visor = Window.find('td[colspan="5"]')

	// Setting amount to 0 by default
	if (editAmount === undefined) {
		visor.text('0')
		// next function
		Window.find('img[alt="next"]').parent().click(function () {
			if (typeof(parseFloat(visor.text())) === 'number' && visor.text() > 0) {
				activeAmount = parseFloat(visor.text())
				storeTx()
				ieAdded()
			} else {
				console.error('Amount chosen is not a valid number')
			}
		})
	} else {
		visor.text(activeAmount)
		// next function
		Window.find('img[alt="next"]').parent().click(function () {
			if (typeof(parseFloat(visor.text())) === 'number' && visor.text() > 0) {
				activeAmount = parseFloat(visor.text())
				storeTx('UPDATE')
				goBack()
			} else {
				console.error('Amount chosen is not a valid number')
			}
		})
	}

	// Open window
	displayX(winId)
}

// Basic input for numerical pad (numpad)

const loadNumpad = function () {

	let Window = $('#custom-amount')

	let visor = Window.find('td[colspan="5"]')

	let firstColumn = Window.find('tr td:nth-child(2)')

	let secondColumn = Window.find('tr td:nth-child(3)')

	let thirdColumn = Window.find('tr td:nth-child(4)')

	let fourthColumn = Window.find('tr td:nth-child(5)')

	function replaceDecimal(decimal) {
		atm.currentTime = 0
		atm.play()
		let amount = visor.text()
		amount = Math.floor(amount) + decimal
		visor.text(amount)
	}

	// backspace / clear
	function backspace() {
		atm.currentTime = 0
		atm.play()
		let amount = visor.text()
		if (amount === '0') {
			goBack()	
		} else {
			let length = amount.length
			amount = amount.substr(0, length-1)
			if (amount !== '') {
				visor.text(amount)	
			} else {
				visor.text('0')
			}
		}
	}

	function addNum(num) {
		atm.currentTime = 0
		atm.play()
		let amount = visor.text()
		if (amount === '0') {
			visor.text(num)
		} else {
			visor.text(amount + num)
		}
	}

	// backspace function
	Window.find('img[alt="delete"]').parent().click(function () {
		backspace()
	})

	// clear / cancel function
	Window.find('img[alt="cancel"]').parent().click(function () {
		atm.currentTime = 0
		atm.play()
		if (activity === 'viewTransactions') {
			goBack()
		} else if (visor.text() === '0') {
			goBack()
		} else {
			visor.text('0')
		}
	})

	// dot function
	Window.find('td:textEquals("•")').click(function () {
		atm.currentTime = 0
		atm.play()
		let amount = visor.text()
		if (amount % 1 === 0 && amount.indexOf('.') === -1 ) {
			visor.text(amount +'.')
		}
	})

	// Add decimal terminations
	for (let i = 1; i < firstColumn.length; i++) {
		$(firstColumn[i]).click(function () {
			replaceDecimal($(this).text())
		})
	}

	Window.find('td:textEquals(".10")').click(function () {
		replaceDecimal($(this).text())
	})

	// Add numerical functionality
	for (let i = 0; i < secondColumn.length - 1; i++) {
		$(secondColumn[i]).click(function () {
			addNum($(this).text())
		})
	}

	for (let i = 0; i < thirdColumn.length; i++) {
		$(thirdColumn[i]).click(function () {
			addNum($(this).text())
		})
	}

	for (let i = 0; i < fourthColumn.length - 1; i++) {
		$(fourthColumn[i]).click(function () {
			addNum($(this).text())
		})
	}
}

loadNumpad()

// Click on edit date from ie-added summary
function customDate(parameter) {

	let winId = 'custom-date'

	let Window = $('#'+winId)

	// Window customization

	// Title
	Window.find('.window-title').text(activeAccount + ' » ' + activeCategory)

	if (activeIe === 'income') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/income.svg')

	} else if (activeIe === 'expense') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/expense.svg')
	}

	if (parameter !== 'UPDATE') {
		// Clear previous date data
		$('#ie-custom-date-picker').data('datepicker').clear()
		$('#ie-custom-date-picker').data('datepicker').lastSelectedDate = undefined

		// Open window
		displayX(winId)
	}
}

// custom-date cancel button
$('#custom-date div.option:contains("cancel")').click(function () {
	goBack()
})

// yesterday button
$('#custom-date div.option:contains("yesterday")').click(function () {
	jsDate = new Date()
	jsDate = new Date(jsDate - 86500*1000)
	newDate = dateTime(jsDate)
	storeTx('UPDATE')
	goBack()
})

// Done button
$('#custom-date div.option:contains("Done")').click(function () {
	if ($('#ie-custom-date-picker').data('datepicker').lastSelectedDate === undefined) {
		goBack()
		return false
	}
	jsDate = new Date($('#ie-custom-date-picker').data('datepicker').lastSelectedDate)
	newDate = dateTime(jsDate)
	storeTx('UPDATE')
	goBack()
})

// Click on edit description from ie-added summary
const addDesc = function (parameter) {

	let winId = 'add-desc'

	let Window = $('#'+winId)

	// Window customization

	// Ie summary
	Window.find('.ie-added-amount').text(activeAmount)
	Window.find('.ie-added-account').text(activeAccount)
	Window.find('.ie-added-category').text(activeCategory)
	Window.find('.ie-added-date').text(readableDate(activeDate))

	if (activeIe === 'income') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/income.svg')

	} else if (activeIe === 'expense') {
		// Icon
		Window.find('.ie-symbol').attr('src', 'images/expense.svg')
	}

	// Testing if there is a stored note already
	if (activeDesc !== undefined) {
		$('#add-desc div[contenteditable]').text(activeDesc)
	} else {
		$('#add-desc div[contenteditable]').text('')
	}

	if (parameter !== 'UPDATE') {
		// Clear previous desc data
		Window.find('div[contenteditable]').text(activeDesc)

		// Open window
		displayX(winId)
		Window.find('div[contenteditable]').selectText()
	}
}

// Functionality to Cancel button
$('#add-desc img[alt="cancel"]').click(function () {
	$('#add-desc div[contenteditable]').blur()
	setTimeout(function() {
		goBack()
	}, 50)
})

// Functionality to Confirm new description button
$('#add-desc img[alt="confirm"]').click(function () {
	let desc = $('#add-desc div[contenteditable]').text()

	// Validating if text-bubble is empty
	if (desc === '') {
		newDesc = undefined
	} else {
		newDesc = desc
	}

 	storeTx('UPDATE')

	$('#add-desc div[contenteditable]').blur()

	// reload summary
	setTimeout(function() {
		goBack()
	}, 50)
})

const ieAdded = function(parameter) {
	// Passing 'UPDATE' to the parameter will make this function only update the list, it won't open the window or customize it

	// The following is used when we are displaying a found transaction from the View Transactions feature
	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let showingSearch = findKey(accounts[accountPosition].txs, 'jsdate', parameter)

	if (showingSearch !== false) {
		let tx = accounts[accountPosition].txs[showingSearch]
		activeDate = tx.date
		jsDate = tx.jsdate
		activeAmount = Math.abs(tx.amount)
		activeCategory = tx.category
		activeDesc = tx.description
		activePicture = tx.picture
		activeIe = 'expense'
		if (tx.amount > 0) {
			activeIe = 'income'
		}
	}

	// Commonly used variables

	let winId = 'ie-added'

	let Window = $('#'+winId)

	// Window customization

	// Income/Expense icon (big and small)
	Window.find('img.ei-added').attr('src', `images/${activeIe}-added.svg`)

	// Title
	Window.find('p.ei-added-title').html(`${activeIe} added <img class="ie-symbol small-ei-added" src="images/${activeIe}.svg">`)

	// Summary of tx
	Window.find('.ie-added-amount').text(activeAmount)
	Window.find('.ie-added-account').text(activeAccount)
	Window.find('.ie-added-category').text(activeCategory)
	Window.find('.ie-added-date').text(readableDate(activeDate))
	if (activeDesc === undefined) {
		Window.find('.ie-added-desc').text('none')
	} else {
		Window.find('.ie-added-desc').html('<b onclick="addDesc()">view</b>')
	}

	// Customizing delete income/expense button
	Window.find('.perma-items .option:contains("delete this") span').html(`delete this ${activeIe}`)

	// Showing edit category button or not

	let numberOfCats = accounts[accountPosition][activeIe+'Categories'].length

	if (numberOfCats > 1) {
		Window.find('.perma-items .option:contains("edit category")').css('display', 'block')
	} else {
		Window.find('.perma-items .option:contains("edit category")').css('display', 'none')
	}

	// Changing last button to Done / Back button

	if (activity === 'newIe') {
		$('#ie-added .perma-items .option').last().html('Done<div class="square-symbol symbol2 done"></div>')
	} else if (activity === 'viewTransactions') {
		$('#ie-added .perma-items .option').last().html('Back<div class="square-symbol symbol2 back"></div>')
	}

	// Adjusting coloring
	Window.css('display', 'block')
	optionColorer(winId)

	// Open window
	if (parameter !== 'UPDATE') {
		// Added IE animation
		let smallDisplay = $('#ie-added img.small-ei-added').css('display')

		let small = ''

		if (smallDisplay === 'inline-block') {
			small = 'small-'
		} else {
			small = ''
		}

		let target = `#ie-added img.${small}ei-added`

		// Rewind animation
		anime({
			targets: target,
			duration: 0,
			rotate: 0
		})

		displayX(winId)
		// Only run sound on new incomes / expenses, otherwise it may be annoying
		if (activeIe === 'expense') {
			expSound.currentTime = 0
			if (activity === 'newIe') {
				expSound.play()	
			}
			setTimeout(function() {
				// Added expense Animation
				anime({
					targets: target,
					duration: 2500,
					rotate: 360
				})
			}, 600)
		} else if (activeIe === 'income') {
			inSound.currentTime = 0
			if (activity === 'newIe') {
				inSound.play()	
			}
			setTimeout(function() {
				// Added income Animation
				anime({
					targets: target,
					duration: 2000,
					rotate: 360
				})
			}, 600)
		}
	}
}

// make this a shortcut button

// New Shorcut window
function newUserShorcut() {
	let userShortcuts = storage('userShortcuts')

	let id = activeAccount+activeCategory+activeIe+parseFloat(activeAmount)

	let exists = findKey(userShortcuts, 'id', id)

	if (exists === false) {
			userShortcuts.push({
			'id' : id,
			'account' : activeAccount,
			'ie' : activeIe,
			'category' : activeCategory,
			'amount' : parseFloat(activeAmount),
			'frequency' : 0,
			'frequency-data' : []
		})
		storage('userShortcuts', userShortcuts)
	}
	homeWindow('UPDATE')
}

// make this a shortcut
$('#ie-added .perma-items .option:contains("make this a shortcut")').click(function () {
	newUserShorcut()
})

// delete this income or expense
$('#ie-added .perma-items .option:contains("delete this")').click(function () {
	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let txPosition = findKey(accounts[accountPosition].txs, 'date', activeDate)
	// deletes the tx
	accounts[accountPosition].txs.splice(txPosition, 1)
	// updates localStorage
	storage('accounts', accounts)

	// Special case when viewing transactions
	if (activity === 'viewTransactions') {
		goBack()
	} else {
		// default case goes home after deleting the tx
		homeWindow('UPDATE')
	}
})

// Edit date
$('#ie-added .perma-items .option:contains("edit date")').click(function () {
	customDate()
})

// Edit amount
$('#ie-added .perma-items .option:contains("edit amount")').click(function () {
	customAmount('EDIT')
})

// Edit category
$('#ie-added .perma-items .option:contains("edit category")').click(function () {
	changeCategory()
})

// Edit description
$('#ie-added .perma-items .option:contains("edit description")').click(function () {
	addDesc()
})

// Done button
$('#ie-added .perma-items .option:contains("Done")').click(function () {
	// Special case when viewing transactions
	if (activity === 'viewTransactions') {
		goBack()
	} else {
		// default case goes home after clicking 'Done'
		homeWindow('UPDATE')
	}
})

// toggleMenu window
let menuOnScreen = false

function toggleMenu() {
	let activeWindow = windowChain[windowChain.length-1]

	let windowBehind = windowChain[windowChain.length-2]

	$(`#${activeWindow} div[contenteditable]`).blur()

	if (menuOnScreen === false) {
		menuOnScreen = true
		setTimeout(function() {
			displayY('menu')
		}, 50)
	} else {
		menuOnScreen = false
		if (windowBehind === 'home-window') {
			setTimeout(function() {
				homeWindow('UPDATE')
			}, 50)
			return false
		} else {
			setTimeout(function() {
				displayY('menu', 'close')
			}, 50)
		}
	}
}
// Applying toggleMenu function to the relevant triggers
$('.menuButton').click(function () {
	toggleMenu()
})
$('#menu div.option:contains("Close")').click(function () {
	toggleMenu()
})

// View Transactions button
$('#menu .option:contains("View Transactions")').click(function () {
	setActivity('viewTransactions')
	transactionsChooseAccount()
})

// Export to CSV button
$('#menu .option:contains("Export to CSV or Excel")').click(function () {
	setActivity('exportCSV')
	exportCSV()
})

// Edit Categories
$('#menu .option:contains("Edit a Category")').click(function () {
	editCategoriesSelectAccount()
})

// Edit Accounts
$('#menu .option:contains("Edit an Account")').click(function () {
	editAccountSelectAccount()
})

// Edit Shortcuts
$('#menu .option:contains("Edit a Shortcut")').click(function () {
	editShortcut()	
})

// Share app
$('#menu .option:contains("Share Books App")').click(function () {
	displayX('share')
})

// Copy URL
$('#share .perma-items .option:contains("Copy URL")').click(function () {
	copyTextToClipboard('http://booksapp.co')
})

// Send via messenger
$('#share .perma-items .option:contains("Send via Messenger")').click(function () {

	let body = 'http://booksapp.co'
	let now = new Date().valueOf()

	// Code to open app if in mobile, or open website if app is not found (like on a desktop browser)
	setTimeout(function () {
	    if (new Date().valueOf() - now > 100) return

	    window.location = `https://www.facebook.com/sharer.php?u=${ encodeURIComponent(body)}`
	}, 25)
	window.location = `fb-messenger://share?link=${ encodeURIComponent(body)}`
})

// Send via email
$('#share .perma-items .option:contains("Send via Email")').click(function () {
	email('\n\nhttp://booksapp.co')
})

// Send via WhatsApp
$('#share .perma-items .option:contains("Send via WhatsApp")').click(function () {
	var body = 'http://booksapp.co'
	window.open(`https://wa.me/?text=${encodeURIComponent(body)}`)
})

const feedbackMessage = function (action) {
	let Window = $('#write-feedback')
	if (action === 'reset') {
		Window.find('div[contenteditable]').css('pointer-events', 'all')
		Window.find('.face-container').css('pointer-events', 'all')
		Window.find('img[alt="confirm"]').css('pointer-events', 'all')
		Window.find('img[alt="cancel"]').css('pointer-events', 'all')
		Window.find('.ie-resume').text('How do you feel about Books?')
		return
	} else if (action === 'faceClick') {
		Window.find('div[contenteditable]').css('pointer-events', 'all')
		Window.find('.face-container').css('pointer-events', 'all')
		Window.find('img[alt="confirm"]').css('pointer-events', 'all')
		Window.find('img[alt="cancel"]').css('pointer-events', 'all')
		let title = Window.find('.ie-resume')
		title.css('opacity', 0)
		setTimeout(function() {
			title.text('What makes you feel that way?')
			title.css('opacity', 1)
			Window.find('.text-bubble').show()
			Window.find('div[contenteditable]').focus()
		}, 300)
	} else if (action === 'loading') {
		Window.find('div[contenteditable]').css('pointer-events', 'none')
		Window.find('.face-container').css('pointer-events', 'none')
		Window.find('img[alt="confirm"]').css('pointer-events', 'none')
		Window.find('img[alt="cancel"]').css('pointer-events', 'none')

		let title = Window.find('.ie-resume')
		title.css('opacity', 0)
		setTimeout(function() {
			title.text('Loading ...')
			title.css('opacity', 1)
			Window.find('.text-bubble').show()
		}, 300)
	}
	
}

// Leave Feedback
$('#menu .option:contains("Leave Feedback")').click(function () {
	// Resets write-feedback window before showing it

	activeStars = undefined

	feedbackMessage('reset')

	for (let i = 0; i < faces.length; i++) {
		$(faces[i]).css('opacity', .6)
	}

	$('#write-feedback .text-bubble').hide()

	displayX('write-feedback')
})

// Leave Feedback > confirm
$('#write-feedback img[alt="confirm"]').click(function () {
	let textBox = $('#write-feedback div[contenteditable]')
	if (textBox.text() !== '') {
		// Make UI not clickable after clicking on send feedback. This is to wait for the POST response to arrive before sending another query, this prevents feedbacks from being sent twice

		feedbackMessage('loading')

		let feedback = {}

		feedback.message = textBox.text()
		feedback.version = booksVersion
		feedback.stars = activeStars
		feedback.date = new Date()

		feedback.device = {
			'os' : c.os.name,
			'osVersion' : c.os.version,
			'platform' : navigator.platform,
			'browser': c.browser.name,
			'browserVersion' : c.browser.version,
			'pixelratio' : window.devicePixelRatio,
			'resolution': `${screen.width}x${screen.height}`,
			'innerResolution' : `${$(window).width()}x${$(window).height()}`
		}
		// send feedback object to DB
		
		// post call
		if (JSON.stringify(feedback).length < 20000) {
			let url = 'http://nixden.com/other/books/feedback.php'
			let data = {
				'auth' : 'ip0wz7nsEjTYjqcsnz',
				'feedback' : JSON.stringify(feedback)
			}
			let success = function (response) {
				
			}
			// Makes the POST call
			$.post(url, data)
		    .success( function() {
				displayX('feedback-received')
				// resets the feedback box if feedback was sent successfully
				textBox.text('')
			} )
		    .error( function() {
		        alert('There was an error sending your feedback\nPlease check your internet connection and try again')
		        feedbackMessage('faceClick')
		    })
		} else {
			alert('Feedback is too long!')
		}
	}
})

// Leave Feedback > cancel
$('#write-feedback img[alt="cancel"]').click(function () {
	let textBox = $('#write-feedback div[contenteditable]')
	textBox.blur()
	setTimeout(function() {
		goBack()
	},50)
})

$('#feedback-received .perma-items .option:contains("Rate in app store")').click(function () {
})

$('#feedback-received .perma-items .option:contains("Exit")').click(function () {
	homeWindow('UPDATE')
})

// Write feedback window
// Only the face clicked will remain colored with full opacity (1)

let faces = $('.face-container img')

for (let i = 0; i < faces.length; i++) {
	$(faces[i]).click(function () {
		// Reset opacity before aplying opacity to the selected face
		for (let y = 0; y < faces.length; y++) {
			$(faces[y]).css('opacity', .6)
		}
		$(this).css('opacity', 1)
		activeStars = i+1

		// Show text bubble and message
		let title = $('#write-feedback .ie-resume')
		if (title.text() === 'How do you feel about Books?') {
			feedbackMessage('faceClick')
		}
		$("div[contenteditable]").focus()
	})
}

// Survey via typeform
$('#menu .option:contains("Take our survey")').click(function () {
	if (navigator.onLine === false) {
		alert('You are not connected to the internet, please connect and try again')
	} else if ($('div.typeform-widget').length === 0) {
		$('#survey .window-body').html('<div class="typeform-widget" data-url="https://nixden.typeform.com/to/TODDqS" data-transparency="100" data-hide-headers=true data-hide-footer=true style="width: 100%; height: 100%;"></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script> <div style="font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;"> powered by <a href="https://admin.typeform.com/signup?utm_campaign=TODDqS&utm_source=typeform.com-4872679-Basic&utm_medium=typeform&utm_content=typeform-embedded-poweredbytypeform&utm_term=EN" style="color: #999" target="_blank">Typeform</a></div>')
		displayX('survey')
	} else if ($('div.typeform-widget').length === 1 || $('iframe').length === 1) {
		displayX('survey')
	}
})

const editAccountSelectAccount = function (update) {
	let winId = 'edit-account-select-account'

	let Window = $('#'+winId)

	// Loading account list

	let html = ''

	// Validating if there are accounts in localStorage
	if (storage('accounts').length > 0) {

		let accounts = sortByKey(storage('accounts'), 'frequency')

		for (let i = 0; i < accounts.length; i++) {

			html += `<div onclick="editAccount($(this).text())" class="option">${accounts[i]['id']}<div class="square-symbol"></div></div>`
		}
	} else {
		alert('You must create an account\nbefore editing an account!')
		return false
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	if (update !== 'UPDATE') {
		displayX(winId)
	}
}
$('#new-account div[contenteditable]').select()
const editAccount = function (account) {
	if (account !== 'UPDATE') {
		activeAccount = account
	}

	let winId = 'edit-account'

	let Window = $('#'+winId)

	// customization

	Window.find('p').html(`Editing account <b>${activeAccount}</b>`)

	if (account !== 'UPDATE') {
		displayX(winId)
	}
}

$('#edit-account .perma-items .option:contains("Edit name")').click(function () {
	newAccount('edit-account')
})
$('#edit-account .perma-items .option:contains("Delete")').click(function () {
	deleteAccountConfirmation()
})

const deleteAccountConfirmation = function () {

	let winId = 'delete-account-confirmation'

	let Window = $('#'+winId)

	// customization

	Window.find('p span').text(activeAccount)

	displayX(winId)
}

// Yes button
$('#delete-account-confirmation .perma-items .option:contains("Yes")').click(function () {
	let accounts = storage('accounts')

	let accountPosition = findKey(accounts, 'id', activeAccount)

	// delete iE account from account list
	accounts.splice(accountPosition, 1)

	// deleting shortcuts with this account
	let shortcuts = storage('shortcuts')
	let foundShortcuts = []

	for (let i = 0; i < shortcuts.length; i++) {
		if (shortcuts[i].account === activeAccount) {
			foundShortcuts.push(shortcuts[i].id)
		}
	}

	for (let i = 0; i < foundShortcuts.length; i++) {
		let position = findKey(accounts, 'id', foundShortcuts[i])
		shortcuts.splice(position, 1)
	}


	// deleting userShortcuts with this account
	let userShortcuts = storage('userShortcuts')
	let foundUserShortcuts = []

	for (let i = 0; i < userShortcuts.length; i++) {
		if (userShortcuts[i].account === activeAccount) {
			foundUserShortcuts.push(userShortcuts[i].id)
		}
	}

	for (let i = 0; i < foundUserShortcuts.length; i++) {
		let position = findKey(accounts, 'id', foundUserShortcuts[i])
		userShortcuts.splice(position, 1)
	}

	// update localStorage
	storage('accounts', accounts)
	storage('shortcuts', shortcuts)
	storage('userShortcuts', userShortcuts)

	if (accounts.length === 0) {
		homeWindow('UPDATE')
	} else {
		goBack()
		goBack()
	}
})

// No button
$('#delete-account-confirmation .perma-items .option:contains("No")').click(function () {
	goBack()
})

const editShortcut = function (update) {
	let winId = 'edit-shortcut'

	let Window = $('#'+winId)

	// Loading list
	let html = ''

	// Checking if there are user created shortcuts in localStorage then add them
	if (storage('userShortcuts').length > 0) {

		let userShortcuts = sortByKey(storage('userShortcuts'), 'frequency')

		for (let i = 0; i < userShortcuts.length; i++) {

			let s = userShortcuts[i]

			let negative = ''

			if (s.ie === 'expense') {
				negative = '-'
			}

			html += `<div onclick="editShortcutOverview(this)" class="item"><span>${s.account}</span> » <span>${s.category}</span> <span>${negative}</span><span>${s.amount}</span><img class="ie-symbol" src="images/${s.ie}.svg"></div>`
		}
	} else {
		alert("You haven't created any shorcuts yet!\nAuto-generated shortcuts can't be deleted")
		return false
	}

	// Showing the list
	Window.find('.item-wrapper').html(html)

	filler(winId)

	if (update !== 'UPDATE') {
		displayX(winId)
	}
}

const editShortcutOverview = function (item) {

	setActivity('editUserShortcut')

	let winId = 'edit-shortcut-overview'

	let Window = $('#'+winId)

	if (item !== 'UPDATE') {
		activeAccount = $(item).find('span')[0].innerText
		activeCategory = $(item).find('span')[1].innerText
		activeAmount = $(item).find('span')[3].innerText

		if ($(item).find('img').attr('src') === 'images/expense.svg') {
			activeIe = 'expense'
		} else if ($(item).find('img').attr('src') === 'images/income.svg') {
			activeIe = 'income'
		}
	}

	// window customization
	let negative = '-'
	let title = 'Expense Shortcut'
	if (activeIe === 'income') {
		title = 'Income Shortcut'
		negative = ''
	}

	Window.find('img.ei-added').attr('src', `images/${activeIe}-added.svg`)

	Window.find('.ei-added-title span').text(title)

	Window.find('.ie-added-amount').text(negative+activeAmount)

	Window.find('.ie-added-account').text(activeAccount)

	Window.find('.ie-added-category').text(activeCategory)


	// open window
	if (item !== 'UPDATE') {
		displayX(winId)
	}
}

// edit shortcut overview: Delete
$('#edit-shortcut-overview .perma-items .option:contains("Delete")').click(function () {
	let userShortcuts = storage('userShortcuts')

	let negative = '-'

	if (activeIe === 'income') {
		negative = ''
	}

	let shortcutId = activeAccount+activeCategory+negative+activeAmount

	let shortcutPosition = findKey(userShortcuts, 'id', shortcutId)

	userShortcuts.splice(shortcutPosition, 1)

	storage('userShortcuts', userShortcuts)

	if (userShortcuts.length < 1) {
		homeWindow('UPDATE')
	} else {
		goBack()
	}
	
})

const confirmEditAccount = function (newName) {

 	// validating if the field isn't empty, then edit the account
 	if (newName !== '') {

 		let userShortcuts = storage('userShortcuts')

 		let negative = '-'

 		if (activeIe === 'income') {
 			negative = ''
 		}

		let shorcutId = activeAccount + activeCategory + negative + amount

		let shortcutPosition = findKey(userShortcuts, 'id', shortcutId)

		userShortcuts[shortcutPosition].account = newName

		activeAccount = newName

		// Store changes in localStorage

 		storage('userShortcuts', userShortcuts)

 		$('#new-account div[contenteditable]').blur()
 		// reload lists
 		setTimeout(function() {
 			goBack()
 		}, 50)
 	}
}

const editCategoriesSelectAccount = function () {

	let winId = 'edit-category-select-account'

	let Window = $('#'+winId)

	// Loading account list

	let html = ''

	// Calculating frequencies
	storage('accounts', calcFrequency(storage('accounts')))

	// Validating if there are accounts in localStorage
	if (storage('accounts').length > 0) {

		let accounts = sortByKey(storage('accounts'), 'frequency')

		for (let i = 0; i < accounts.length; i++) {

			html += `<div onclick="editCategoryIe($(this).text())" class="option">${accounts[i]['id']}<div class="square-symbol"></div></div>`
		}
	} else {
		alert('You must create an account\nbefore you can edit a category!')
		return false
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	displayX(winId)
}

const editCategoryIe = function (account) {
	let winId = 'edit-category-income-or-expense'

	let Window = $('#'+winId)

	// Loading account list
	let html = ''

	activeAccount = account

	// window customization
	Window.find('p').text(`${activeAccount} account`)

	displayX(winId)
}

// Income category functionality
$('#edit-category-income-or-expense .perma-items .option:contains("Income categories")').click(function () {
	editCategorySelectCategory('income')
})

// Expense category functionality
$('#edit-category-income-or-expense .perma-items .option:contains("Expense categories")').click(function () {
	editCategorySelectCategory('expense')
})

const editCategorySelectCategory = function (ie) {
	let winId = 'edit-category-select-category'

	let Window = $('#'+winId)

	// Variables

	if (ie !== 'UPDATE') {
		activeIe = ie
	}

	let accounts = storage('accounts')

	let accountPosition = findKey(accounts, 'id', activeAccount)

	let cats = accounts[accountPosition][activeIe+'Categories']

	// Loading categories

	let html = ''

	// Validating if there are categories in localStorage
	if (cats.length > 0) {

		cats = sortByKey(cats, 'frequency')

		for (let i = 0; i < cats.length; i++) {

			html += `<div onclick="editCategory($(this).text())" class="option">${cats[i].id}<div class="square-symbol"></div></div>`
		}
	} else {
		alert(`There are no ${activeIe} categories in account ${activeAccount}.\nYou must create categories before you edit them!`)
		return false
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	// Customization
	Window.find('p').html(`Select an <b>${activeIe}</b> category to edit from<br>account <b>${activeAccount}</b>`)

	if (ie !== 'UPDATE') {
		displayX(winId)
	}
}

// edit category window
const editCategory = function (category) {

	if (category !== 'UPDATE') {
		activeCategory = category
	}

	let winId = 'edit-category'

	let Window = $('#'+winId)

	// Customization

	Window.find('p').html(`<b>Selected Category</b><br><br>${activeAccount} » ${activeIe}s » <b>${activeCategory}</b>`)

	if (category !== 'UPDATE') {
		displayX(winId)
	}
}

// edit category delete button

$('#edit-category .perma-items .option:contains("Delete")').click(function () {

	let winId = 'edit-category-confirmation'

	let Window = $('#'+winId)

	// Customization

	Window.find('p').html(`Are you sure you wish<br>to permantently delete<br> the <span style="font-weight: 400;">${activeCategory}</span> category<br>from account <span style="font-weight: 400;">${activeAccount}</span><br>and <b>all transactions<br>in this category?</b>`)

	displayX(winId)
})

// Yes, delete all txs from category and delete category
$('#edit-category-confirmation .perma-items .option:contains("Yes")').click(function () {

	let accounts = storage('accounts')

	let accountPosition = findKey(accounts, 'id', activeAccount)

	let catPosition = findKey(accounts[accountPosition][activeIe+'Categories'], 'id', activeCategory)

	// delete iE category from category list
	accounts[accountPosition][activeIe+'Categories'].splice(catPosition, 1)

	// deleting txs with this category
	let txs = accounts[accountPosition].txs
	let relatedTxs = []

	for (let i = 0; i < relatedTxs.length; i++) {
		if (txs[i].category === activeCategory) {
			relatedTxs.push(txs[i].jsdate)
		}
	}

	let loop = true
	while (loop) {
		let txPosition = findKey(txs, 'category', activeCategory)
		if (txPosition !== false) {
			txs.splice(txPosition, 1)
		} else {
			loop = false
		}
	}

	// deleting shortcuts with this category
	let shortcuts = storage('shortcuts')
	let relatedShortcuts = []

	for (let i = 0; i < shortcuts.length; i++) {
		if (shortcuts[i].account === activeAccount && shortcuts[i].category === activeCategory && shortcuts[i].ie === activeIe) {
			relatedShortcuts.push(shortcuts[i].id)
		}
	}

	for (let i = 0; i < relatedShortcuts.length; i++) {
		let shortcutPosition = findKey(shortcuts, 'id', relatedShortcuts[i])
		shortcuts.splice(shortcutPosition, 1)
	}

	// deleting userShortcuts with this category
	let userShortcuts = storage('userShortcuts')
	let related = []

	for (let i = 0; i < userShortcuts.length; i++) {
		if (userShortcuts[i].account === activeAccount && userShortcuts[i].category === activeCategory && userShortcuts[i].ie === activeIe) {
			related.push(userShortcuts[i].id)
		}
	}

	for (let i = 0; i < related.length; i++) {
		let shortcutPosition = findKey(userShortcuts, 'id', related[i])
		userShortcuts.splice(shortcutPosition, 1)
	}

	// update localStorage
	accounts[accountPosition].txs = txs
	storage('accounts', accounts)
	storage('shortcuts', shortcuts)
	storage('userShortcuts', userShortcuts)

	goBack()
	goBack()
})

// edit name functionality

$('#edit-category .perma-items .option:contains("Edit name")').click(function () {
	newCategory('EDIT')
})

const confirmEditCategory = function () {
	let newCategoryName = $('#new-category div[contenteditable]').text().toLowerCase()

 	// validating if the field isn't empty
 	if (newCategoryName === '') {
 		console.error('Empty category field')
 		return false
 	}

 	// Selecting expense or income categories

	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)

	// validate if category already exists
	let alertMessage = `Category "${newCategoryName}" already exists!`
	let alreadyExists = findKey(accounts[accountPosition][activeIe+'Categories'], 'id', newCategoryName)
	if (alreadyExists !== false) {
		alert(alertMessage)
		return false
	}

	// Otherwise edit category
	let catPosition = findKey(accounts[accountPosition][activeIe+'Categories'], 'id', activeCategory)

	// change name in accounts
	accounts[accountPosition][activeIe+'Categories'][catPosition].id = newCategoryName

	// change name in txs
	let txs = accounts[accountPosition].txs
	for (let i = 0; i < txs.length; i++) {
		if (txs[i].category === activeCategory) {
			txs[i].category = newCategoryName
		}
	}
	accounts[accountPosition].txs = txs

	// change name in shortcuts
	let shortcuts = storage('shortcuts')
	for (let i = 0; i < shortcuts.length; i++) {
		if (shortcuts[i].account === activeAccount && shortcuts[i].ie === activeIe && shortcuts[i].category === activeCategory) {
			shortcuts[i].id = shortcuts[i].account + shortcuts[i].ie + newCategoryName
			shortcuts[i].category = newCategoryName
		}
	}


	// change name in userShortcuts
	let userShortcuts = storage('userShortcuts')
	for (let i = 0; i < userShortcuts.length; i++) {
		if (userShortcuts[i].account === activeAccount && userShortcuts[i].ie === activeIe && userShortcuts[i].category === activeCategory) {
			userShortcuts[i].id = userShortcuts[i].account + newCategoryName + userShortcuts[i].amount
			userShortcuts[i].category = newCategoryName
		}
	}

	// store in localStorage
	storage('accounts', accounts)
	storage('shortcuts', shortcuts)
	storage('userShortcuts', userShortcuts)

	// Go back
	$('#new-category div[contenteditable]').blur()
	setTimeout(function() {
		activeCategory = newCategoryName
		goBack()
	}, 50)
}

// Giving welcome window basic functionality

$('#welcome-window .perma-items .item:contains("new income")').click(function () {
	displayX('home-window')
	ieChooseAccount('income')
	setTimeout(function() {
		$('#welcome-window').css('display', 'none')
	},1500)
})

$('#welcome-window .perma-items .item:contains("new expense")').click(function () {
	displayX('home-window')
	ieChooseAccount('expense')
	setTimeout(function() {
		$('#welcome-window').css('display', 'none')
	},1500)
})

const welcomeWindow = function () {
	// showing screen
	$('#welcome-window').css('display', 'block')
	
	orderWindow('welcome-window')

	anime({
		targets: '#welcome-window',
		translateY: '-100%',
		duration: 900,
		easing: 'easeInOutQuart'
	})
}

// Home window basic functionality

$('#home-window .perma-items .item:contains("new income")').click(function () {
	ieChooseAccount('income')
})

$('#home-window .perma-items .item:contains("new expense")').click(function () {
	ieChooseAccount('expense')
})

// Back buttons do what you would except (close the active window)

const goBack = function () {
	// User loses focus on all text fields when moving back to another window
	$(':focus').blur()

	let activeWindow = windowChain[windowChain.length-1]

	if (activeWindow === 'ie-added' && activity === 'newIe') {
		homeWindow('UPDATE')
		return
	}

	setTimeout(function() {

	// Updating window behind active window before running close animation
	let windowBehind = windowChain[windowChain.length-2]

	switch(windowBehind) {
		case 'home-window':
	        homeWindow('UPDATE')
	        break
	    case 'ie-choose-account':
	        ieChooseAccount('UPDATE')
	        break
	    case 'ie-choose-category':
	        ieChooseCategory('UPDATE')
	        break
	    case 'ie-choose-amount':
	        ieChooseAmount('UPDATE')
	        break
	    case 'ie-added':
	        ieAdded('UPDATE')
	        break
	    case 'custom-date':
	        customDate('UPDATE')
	        break
	    case 'add-desc':
	        addDesc('UPDATE')
	        break
	    case 'transactions-choose-account':
	        transactionsChooseAccount('UPDATE')
	        break
	    case 'view-transactions':
	        viewTransactions('UPDATE')
	        break
	    case 'export':
	        exportCSV('UPDATE')
	        break
	    case 'edit-category-select-category':
	        editCategorySelectCategory('UPDATE')
	    	break
	   	case 'edit-category':
	        editCategory('UPDATE')
	    	break
		case 'edit-account-select-account':
	        editAccountSelectAccount('UPDATE')
	    	break
	    case 'edit-account':
	        editAccount('UPDATE')
	    	break
	    case 'edit-shortcut':
	        editShortcut('UPDATE')
	    	break
	    case 'edit-shortcut-overview':
	        editShortcutOverview('UPDATE')
	    	break
	}

	// Running close window animation
	if (windowChain.length > 1 && windowBehind !== 'home-window' && windowBehind !== 'welcome-window') {
		displayX(activeWindow, 'close')
	}

	// Updating current user's activity
	setActivity()

	}, 60)
}

$('.perma-items .option:contains("Back")').click(function () {
	goBack()
})


// Open New Account window

const newAccount = function (edit) {

	$('#new-account img[alt="confirm"]').unbind('click')

	// Edit account
	if (edit === 'edit-account') {

		$('#new-account .menu-icon .window-title').text('Editing Account')

		// Update field
		$('#new-account div[contenteditable]').text(activeAccount)

		// Functionality to Confirm name button
		$('#new-account img[alt="confirm"]').click(function () {
			confirmEditAccount()
		})
	} else {
	// New account

		$('#new-account .menu-icon .window-title').text('New Account')

		// Reset field
		$('#new-account div[contenteditable]').text('')

		// Functionality to Confirm name button
		$('#new-account img[alt="confirm"]').click(function () {
			confirmNewAccount()
		})
	}

	// Open window
	displayX('new-account')

	// Focus text field
	$('#new-account div[contenteditable]').selectText()
}

// Functionality to Cancel button
$('#new-account img[alt="cancel"]').click(function () {
	let textBox = $('#new-account div[contenteditable]')
	if (textBox.text() !== '') {
		textBox.text('')
		textBox.focus()
	} else {
		textBox.blur()
		setTimeout(function() {
			goBack()
		}, 50)
	}
})

const confirmNewAccount = function () {
	let accountName = $('#new-account div[contenteditable]').text().toLowerCase()

 	// validating if the field isn't empty, create the new account
 	if (accountName !== '') {

 		let accounts = storage('accounts')

		// validate if account already exists before adding it to the array
	 	let alertMessage = `Account "${accountName}" already exists!`
		let alreadyExists = findKey(accounts, 'id', accountName)
		if (alreadyExists !== false) {
			alert(alertMessage)
			return false
		}

 		accounts.push(
 			{
 				'id' : accountName,
 				'frequency' : 0,
 				'frequency-data' : [],
 				'txs' : [],
 				'incomeCategories' : [],
 				'expenseCategories' : []
 			}
 		)

 		storage('accounts', accounts)

 		$('#new-account div[contenteditable]').blur()
 		// reload lists
 		setTimeout(function() {
 			goBack()
 		}, 50)
 	}
}

// Function to store Txs
const storeTx = function (action = 'write') {
	// action = 'write' or 'UPDATE'

	// validation
	if (activeAmount === undefined || activeAmount == 0 || activeCategory === undefined) {
		console.error('storeTx: activeAmount or activeCategory are invalid or undefined')
		return false
	}

	// Adding the negative symbol for expenses
	let negative = ''
	if (activeIe === 'expense') {
		negative = '-'
	}

	let amount = negative + parseFloat(activeAmount)

	let accountList = storage('accounts')

	let accountPosition = findKey(accountList, 'id', activeAccount)

	let categoryPosition = findKey(accountList[accountPosition][activeIe+'Categories'], 'id', activeCategory)

	let amountPosition = findKey(accountList[accountPosition][activeIe+'Categories'][categoryPosition].amounts, 'id', amount)

	// object array containing transactions
	accountList[accountPosition].txs

	if (action === 'write') {

		let newTx = {}

		newTx.date = dateTime()
		activeDate = newTx.date
		newTx.jsdate = new Date()
		jsDate = newTx.jsdate
		newTx.description = activeDesc
		newTx.amount = amount
		newTx.category = activeCategory
		newTx.picture = activePicture

		// Store newTx in placeholder accountList
		accountList[accountPosition]['txs'].push(newTx)

	} else if (action === 'UPDATE') {

		let txPosition = findKey(accountList[accountPosition]['txs'], 'date', activeDate)

		if (newDate) {
			activeDate = newDate
			newDate = undefined
		}

		if (newDesc) {
			activeDesc = newDesc
			newDesc = undefined
		}

		accountList[accountPosition]['txs'][txPosition].date = activeDate
		accountList[accountPosition]['txs'][txPosition].jsdate = jsDate
		accountList[accountPosition]['txs'][txPosition].description = activeDesc
		accountList[accountPosition]['txs'][txPosition].amount = amount
		accountList[accountPosition]['txs'][txPosition].category = activeCategory
		accountList[accountPosition]['txs'][txPosition].picture = activePicture
	}

	// Calculate and add frequencies

	if (action === 'write') {
		// Account frequency
		accountList = calcFrequency(accountList, activeAccount)
		// Category frequency
		accountList[accountPosition][activeIe+'Categories'] = calcFrequency(accountList[accountPosition][activeIe+'Categories'], activeCategory)
		// Amount frequency
		if (amountPosition === false) {
			accountList[accountPosition][activeIe+'Categories'][categoryPosition].amounts.push({
					'id' : amount,
					'frequency' : 0,
					'frequency-data' : []
			})	
		}
		accountList[accountPosition][activeIe+'Categories'][categoryPosition].amounts = calcFrequency(accountList[accountPosition][activeIe+'Categories'][categoryPosition].amounts, amount)

		// Create regular shorcut

		let shortcutList = storage('shortcuts')
		let shortcutId = (activeAccount + activeIe + activeCategory).toLowerCase()
		let shortcutPosition = findKey(shortcutList, 'id', shortcutId)

		if (shortcutPosition !== false) {
			// Calculate shortcut frequency
			shortcutList = calcFrequency(shortcutList, shortcutId)
		} else {
			shortcutList.push({
				'id' : shortcutId,
				'account' : activeAccount,
				'ie' : activeIe,
				'category' : activeCategory,
				'frequency' : 1,
				'frequency-data' :[]
			})
		}

		// Store shortcuts in localStorage
		storage('shortcuts', shortcutList)
	}

	// Store changes or newTx in localStorage
	storage('accounts', accountList)
}

function setActivity(action = undefined) {
	// If a parameter is passed, we set the current activity as a global variable
	if (action !== undefined) {
		activity = action
	} else {
		// Else we test if we should empty the action
		let activeWindow = windowChain[windowChain.length-1]
		if (activeWindow === 'home-window' || activeWindow === 'welcome-window') {
			activeAccount = undefined
			activeIe = undefined
			activeAmount = undefined
			activeAccount = undefined
			activeCategory = undefined
			activePicture = undefined
			activeDate = undefined
			newDate = undefined
			jsDate = undefined
			activeDesc = undefined
			newDesc = undefined
			activity = undefined
			seeMore = 1
			activeScroll = undefined
			activeCSV = undefined
			activeCSVname = undefined
			activeStars = undefined
		}
	}
}

// exportCSV function
const exportCSV = function (parameter) {
	// Passing 'UPDATE' as the parameter will make this function only update the list of accounts to choose from, it won't open the window

	let winId = 'export'

	let Window = $('#'+winId)

	// Loading account list

	let html = ''

	// Calculating frequencies
	storage('accounts', calcFrequency(storage('accounts')))

	// Validating if there are accounts in localStorage
	if (storage('accounts').length > 0) {

		let accounts = sortByKey(storage('accounts'), 'frequency')

		for (let i = 0; i < accounts.length; i++) {

			html += `<div onclick="exportSelectTimeframe($(this).text())" class="option">${accounts[i]['id']}<div class="square-symbol"></div></div>`
		}
	} else {
		alert(`You can't export transactions until you have transactions!`)
		return
	}

	Window.find('.item-wrapper').html(html)
	filler(winId)

	// Open window
	if (parameter !== 'UPDATE') {
		displayX(winId)
	}
}

// exportSelectTimeframe function
const exportSelectTimeframe = function (accountName) {

	activeAccount = accountName
	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)

	if (accounts[accountPosition].txs.length === 0) {
		alert(`No transactions found in account "${activeAccount}"`)
		return
	}

	let winId = 'export-select-timeframe'

	let Window = $('#'+winId)

	// Customization
	Window.find('p').text(`Exporting ${activeAccount} account`)

	// Open window
	displayX(winId)
}

// Giving functionality to Export buttons
// All Data
$('#export-select-timeframe .perma-items .option:contains("Export all Data")').click(function () {

	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let txs = sortByKey(accounts[accountPosition].txs, 'jsdate')

	if (accounts[accountPosition].txs !== undefined && accounts[accountPosition].txs.length > 0) {
		exportAll()
	} else {
		alert(`No transactions found in ${activeAccount} yet`)
	}
})

function exportAll() {
	// Loading "animation"
	$('#export-select-timeframe p').text('Loading ...')

	// Disabling clicking on .options during CSV generation
	$('#export-select-timeframe .option').css('pointer-events', 'none')

	// CSV generation
	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let txs = sortByKey(accounts[accountPosition].txs, 'jsdate')

	// make the magic happen
	let arrayOfArrays = convertToArray(txs)
	activeCSV = generateCSV(arrayOfArrays)
	activeCSVname = `all_data_${activeAccount}.csv`

	// display export-file-ready
	displayX('export-file-ready')

	// Re-enabling clicking on .options and updating text to what is was before
	$('#export-select-timeframe p').text(`Exporting ${activeAccount} account`)
	$('#export-select-timeframe .option').css('pointer-events', 'all')
}

// Export a Year
$('#export-select-timeframe .perma-items .option:contains("Export a Year")').click(function () {

	let winId = 'export-select-year'

	let Window = $('#'+winId)

	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let txs = sortByKey(accounts[accountPosition].txs, 'jsdate')

	if (accounts[accountPosition].txs !== undefined && accounts[accountPosition].txs.length > 0) {
		// Search txs for available years
		let years = []
		for (let i = 0; i < txs.length; i++) {
			let date = new Date(txs[i].jsdate)
			if (years.indexOf(date.getFullYear()) === -1) {
				years.push(date.getFullYear())
			}
		}
		// Display list with available years
		let html = ''
		for (let i = 0; i < years.length; i++) {
			html += `<div onclick="exportYear($(this).text())" class="option">${years[i]}<div class="square-symbol"></div></div>`
		}

		Window.find('.item-wrapper').html(html)
		filler(winId)
		displayX(winId)
	} else {
		alert(`No transactions found in ${activeAccount} yet`)
	}
})

function exportYear(year) {
	// Loading "animation"
	$('#export-select-year p').text('Loading ...')

	// Disabling clicking on .options during CSV generation
	$('#export-select-year .option').css('pointer-events', 'none')

	// CSV generation
	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let txs = sortByKey(accounts[accountPosition].txs, 'jsdate')

	// 1. Creating filtered object array by year
	let filtered = []
	for (let i = 0; i < txs.length; i++) {
		let date = new Date(txs[i].jsdate)
		if (date.getFullYear() == year) {
			filtered.push(txs[i])
		}
	}

	let arrayOfArrays = convertToArray(filtered)
	activeCSV = generateCSV(arrayOfArrays)
	activeCSVname = `${year}_${activeAccount}.csv`

	// display export-file-ready
	displayX('export-file-ready')

	// Re-enabling clicking on .options and updating text to what is was before
	$('#export-select-year p').text('Select Year to Export')
	$('#export-select-year .option').css('pointer-events', 'all')
}

// Click on Export a Month, open calendar to choose a month
$('#export-select-timeframe .perma-items .option:contains("Export a Month")').click(function () {
	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let txs = sortByKey(accounts[accountPosition].txs, 'jsdate')

	if (accounts[accountPosition].txs !== undefined && accounts[accountPosition].txs.length > 0) {
		// minDate and maxDate control the range of selectable dates for export-moth-picker for example
		$('#export-month-picker').datepicker({
		    minDate: new Date(txs[0].jsdate),
		    maxDate: new Date(txs[txs.length-1].jsdate)
		})
		// clearing month date picker
		$('#export-month-picker').data('datepicker').clear()
		$('#export-month-picker').data('datepicker').lastSelectedDate = undefined
		displayX('export-select-month')
	} else {
		alert(`No transactions found in ${activeAccount} yet`)
	}
})

// Giving functionality to Next button
$('#export-select-month .perma-items .option:contains("Next")').click(function () {
	let lastSelectedDate = new Date($('#export-month-picker').data('datepicker').lastSelectedDate)
	if ($('#export-month-picker').data('datepicker').lastSelectedDate) {
		exportMonth(lastSelectedDate)
	} else {
		alert('Select a month first')
	}
})
$('#ei-added .ei-resume span:nth-child(1n)')

// export month -> generate CSV from month
function exportMonth(date) {

	let year = date.getFullYear()
	let month = date.getMonth()

	// Loading "animation"
	$('#export-select-month p').text('Loading ...')

	// Disabling clicking on .options during CSV generation
	$('#export-select-month .option').css('pointer-events', 'none')
	$('#export-month-picker').css('pointer-events', 'none')

	// CSV generation
	let accounts = storage('accounts')
	let accountPosition = findKey(accounts, 'id', activeAccount)
	let txs = sortByKey(accounts[accountPosition].txs, 'jsdate')

	// 1. Creating filtered object array by month
	let filtered = []
	for (let i = 0; i < txs.length; i++) {
		let date = new Date(txs[i].jsdate)
		if (date.getMonth() == month && date.getFullYear() === year) {
			filtered.push(txs[i])
		}
	}

	// adding leading 0s to month
	if (++month < 10) {
		month = '0' + month
	}

	if (filtered.length === 0) {
		alert(`No transaction found in this month (${year}/${month})`)
	} else {
		let arrayOfArrays = convertToArray(filtered)
			activeCSV = generateCSV(arrayOfArrays)
			activeCSVname = `${year}_${month}_${activeAccount}.csv`

			// display export-file-ready
			displayX('export-file-ready')	
	}

	// Re-enabling clicking on .options and updating text to what is was before
	$('#export-select-month p').text('Select a Month to Export')
	$('#export-select-month .option').css('pointer-events', 'all')
	$('#export-month-picker').css('pointer-events', 'all')
}

// functionality to Download CSV File button
$('#export-file-ready .perma-items .option:contains("Download CSV File")').click(function () {
	if (activeCSV !== undefined) {
		downloadCSV(activeCSV, activeCSVname, 'text/csv;encoding:utf-8')
	} else {
		console.error('CSV file generation failed, contact support')
	}
})

// Welcome window appears if there is no local storage data in localstorage regarding this app

if (localStorage.accounts === undefined) {
	welcomeWindow()
} else {
	homeWindow()
}

// Audio SFX sound effects
let atm = new Audio('sfx/atm.mp3')
let inSound = new Audio('sfx/in.mp3')
let expSound = new Audio('sfx/out.mp3')

const soundChecker = setInterval(function() {

	if (atm.error) {

		atm = new Audio('sfx/atm.mp3')

	} else if (inSound.error) {

		inSound = new Audio('sfx/in.mp3')

	} else if (expSound.error) {

		expSound = new Audio('sfx/out.mp3')

	} else {
		// atm.loop = true
		// atm.volume = 0
		// inSound.loop = true
		// inSound.volume = 0
		// export memberSound.loop = true
		// expSound.volume = 0

		clearInterval(soundChecker)
	}
}, 1500)

// Function that checks the number of displayed vs hidden windows
// var displayBlock = 0 
// var displayNone = 0
// for (var i = 0; i < windows.length; i++) {
// 	if ($(windows[i]).css('display') === 'none') {
// 		displayNone++
// 	} else {
// 		displayBlock++
// 	}
// }
// console.log('displayNone :' + displayNone)
// console.log('displayBlock :' + displayBlock)