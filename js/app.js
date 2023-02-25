// Moving all windows to the right to later move them right
$('#welcome-window') // √
$('#home-window') // √
$('#menu') // √
// New Income or Expense windows
$('#ie-choose-account') // √
$('#ie-choose-category') // √
$('#ie-choose-amount') // √
$('#ie-added') // √
// New account, category, amount, date or note
$('#new-account') // √
$('#new-category') // √
$('#custom-amount') // √
$('#custom-date') // √
$('#add-desc') // √

// Export to CSV
$('#export') // √
$('#export-select-timeframe') // √
$('#export-select-month') // √
$('#export-select-year') // √
$('#export-file-ready') // √

// View Transactions
$('#transactions-choose-account') // √
$('#view-transactions') // √

// Edit Category
$('#edit-category-select-account') // √
$('#edit-category-income-or-expense') // √
$('#edit-category-select-category') // √
$('#edit-category') // √
$('#edit-category-confirmation') // √

// Edit Account
$('#edit-account-select-account') // √
$('#edit-account') // √
$('#delete-account-confirmation') // √

// Edit Shortcuts
$('#edit-shortcut') // √
$('#edit-shortcut-overview') // √

// Share
$('#share')

// Feedback
$('#write-feedback')
$('#feedback-received')

// Survey
$('#survey')

// $('#go-premium').show()

// Pending
// Premium:
// Statistics
// Pie
// Insights
// Add photo
// View photo

// 1) Fills .item-wrapper with items or options. Each .item-wrapper should have at least 12 fillers to allow scrolling and to push the last results to the bottom of the screen

// 2) Scrolls item-wrappers to the bottom and makes the bottom-scroll-indicator dissapear when while it's all scrolled down

// When there aren't more items to show
let topBoundary = '<div class="option" style="pointer-events: none; text-align: center;"><span style="font-size: 0.7em;margin-left: 8%;">No more items to show</span></div>'

function filler(id) {

	let wrapper = $('#'+id+' .item-wrapper')

	let options = wrapper.find('div.option')

	let items = wrapper.find('div.item')

	let fillers = 12

	if (options.length !== 0) {
		// Create fillers
		for (let i = 0; i < fillers; i++) {
			wrapper.prepend($('<div class="option filler"></div>')[0]);
		}
		// Last item to prepend (no more items to show)
		wrapper.prepend($(topBoundary)[0]);
		
	} else if (items.length !== 0) {
		// Create fillers
		for (let i = 0; i < fillers; i++) {
			wrapper.prepend($('<div class="item filler"></div>')[0]);
		}
		// Last item to prepend (no more items to show)
		wrapper.prepend($(topBoundary)[0]);
	}
}

let scrollChecker

function scrollWrapper(id) {

	let wrapper = $('#'+id+' .item-wrapper')

	wrapper[0].scrollTop = 100000
	// this will scroll the wrapper all the way down as long as wrapper is less than 100k pixels high
	let bottom = wrapper[0].scrollTop
	// bottom is the maximum amount of pixels that .item-wrapper can be scrolled down to

	// If there is a bottom-scroll-indicator inside the itemWrapper, then we add the scroll event listener:
	
	let bottomScrollIndicator = wrapper[0].parentElement.getElementsByClassName('bottom-scroll-indicator')

	wrapper.unbind('scroll')

	wrapper.scroll(function () {
		if (wrapper[0].scrollTop > bottom-3) {
			bottomScrollIndicator[0].style.opacity = 0
		} else {
			bottomScrollIndicator[0].style.opacity = 100
		}
	})

	// Alernative: Achieves the same effect but using setInterval checking every 200ms for devices where the browser prevents running javascript on scroll (to avoid lag)

	// clearInterval(scrollChecker)	

	// scrollChecker = setInterval(function () {
	// 	if (wrapper[0].scrollTop > bottom - 3) {
	// 		bottomScrollIndicator[0].style.opacity = 0
	// 	} else {
	// 		bottomScrollIndicator[0].style.opacity = 100
	// 	}
	// }, 100)
}

// Gives the num-pad a height that corresponds to how the client rendered its height
let renderedHeight = $('#num-pad > table')[0].clientHeight
$('#num-pad').height(renderedHeight)

// Background fixer: Perma options get the right background color depending on the number of perma options as to achieve an aesthetic effect

const optionColorer = function (id) {

	let items = $('#' + id + ' .perma-items .option:visible')

	if (items.length === 0) {
		return false
	}

	for (let i = 0; i < items.length; i++) {
		switch(i) {
			case 0:
				items[i].style.background = '#f5fcff'
		        break
		    case 1:
		        items[i].style.background = '#f1faff'
		        break
		    case 2:
		        items[i].style.background = '#ecf9ff'
		        break
		    case 3:
		        items[i].style.background = '#e7f7ff'
		        break
		    case 4:
		        items[i].style.background = '#e3f6ff'
		        break
		    case 5:
		        items[i].style.background = '#def4ff'
		        break
		    case 6:
		        items[i].style.background = '#d9f3ff'
		        break
		   	case 7:
		        items[i].style.background = '#d1f0ff'
		        break
		    case 8:
		        items[i].style.background = '#cdefff'
		        break
		    case 9:
		        items[i].style.background = '#cdefff'
		        break
		    default:
		        items[i].style.background = '#c8eeff'
		}
	}
}

let permaItems = $('.perma-items') // left here

for (let i = 1; i < permaItems.length; i++) {
	// Starts at 1 instead of 0 to ignore the welcome window
	let id = $(permaItems[i]).parent().parent().attr('id')
	optionColorer(id)
}

// readableDate() is used in ieAdded to display the summary of an income or expense
function readableDate (date) {
	// parameter date is in google spreadsheet format dateTime
	// Taking out the hours and minutes
	date = date.substr(0, date.indexOf(' '))
	let today = dateTime()
	today = today.substr(0, today.indexOf(' '))
	if (date === today) {
		return 'today'
	}

	let dateO = {}
	let todayO = new Date()

	todayO = {
		'day' : todayO.getDate(),
		'month' : todayO.getMonth()+1,
		'year' : todayO.getYear()+1900
	}

	// Tearing apart date
	dateO.month = date.substr(0, date.indexOf('/'))
		date = date.substr(date.indexOf('/')+1)
	dateO.day = date.substr(0, date.indexOf('/'))
		date = date.substr(date.indexOf('/')+1)
	dateO.year = date


	if (dateO.day == todayO.day -1 && dateO.month == todayO.month && dateO.year == todayO.year) {
		return 'yesterday'
	}

	let month

	switch(dateO.month) {
	    case '1':
	        month = 'jan'
	        break
	    case '2':
	        month = 'feb'
	        break
	    case '3':
	        month = 'april'
	        break
	    case '4':
	        month = 'march'
	        break
	    case '5':
	        month = 'may'
	        break
	    case '6':
	        month = 'june'
	        break
	    case '7':
	        month = 'july'
	        break
	    case '8':
	        month = 'aug'
	        break
	    case '9':
	        month = 'sep'
	        break
	    case '10':
	        month = 'oct'
	        break
	    case '11':
	        month = 'nov'
	        break
	    case '12':
	        month = 'dec'
	        break
	}
	if (dateO.year == todayO.year) {
		return `${month} ${dateO.day}`
	} else {
		return `${month} ${dateO.day}, ${dateO.year}`
	}
}

// Making the colons in #ie-added non-selectable
$('#ie-added .ie-resume span:even').css('user-select', 'none')


// To select div with content-editable retro-compatible Tested in IE 8+, Firefox 3+, Opera 9+, & Chrome 2+ https://stackoverflow.com/a/13641884/1478843
jQuery.fn.selectText = function() {
	var range, selection
	return this.each(function() {
		if (document.body.createTextRange) {
			range = document.body.createTextRange()
			range.moveToElementText(this)
			range.select()
		} else if (window.getSelection) {
			selection = window.getSelection()
			range = document.createRange()
			range.selectNodeContents(this)
			selection.removeAllRanges()
			selection.addRange(range)
		}
	})
} // You call it like this: $(this).selectText()



// Functions to handle copying text, backwards compatible
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea")
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    var successful = document.execCommand('copy')
    var msg = successful ? 'successful' : 'unsuccessful'
    console.log('Fallback: Copying text command was ' + msg)
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err)
  }

  document.body.removeChild(textArea)
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!')
  }, function(err) {
    console.error('Async: Could not copy text: ', err)
  })
}


// function to open email app and prefill URL in body
function email(body) {
	var mailToLink = `mailto:?subject=Checkout this app!&body=${encodeURIComponent(body)}`
	window.location.href = mailToLink
}