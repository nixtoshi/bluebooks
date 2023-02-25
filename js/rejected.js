// Rejected code

// Survey via typeform
// Preloads the survey, and only shows it when it's fully loaded
$('#menu .option:contains("Take our survey")').click(function () {
	if (navigator.onLine === false) {
		alert('You are not connected to the internet, please connect and try again')
	} else if ($('div.typeform-widget').length === 0) {
		$('#survey .window-body').html('<div class="typeform-widget" data-url="https://nixden.typeform.com/to/TODDqS" data-transparency="100" data-hide-headers=true data-hide-footer=true style="width: 100%; height: 100%;"></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })() </script> <div style="font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;"> powered by <a href="https://admin.typeform.com/signup?utm_campaign=TODDqS&utm_source=typeform.com-4872679-Basic&utm_medium=typeform&utm_content=typeform-embedded-poweredbytypeform&utm_term=EN" style="color: #999" target="_blank">Typeform</a></div>')
		// Preventing other taps after tapping on survey
		$('#menu div.option').css('pointer-events', 'none')
		$('#menu .option:contains("Take our survey") span').html('<b>Loading survey ...</b>')
		let interval = setInterval(function () {
			// interval checks 
			if ($('button[data-qa="start-button"]').length === 1 || $('iframe').length === 1) {
				clearInterval(interval)
				// Click on survey start
				$('button[data-qa="start-button"]').click()
				// changing button's style
				$('button[data-qa="start-button"]').attr('style', 'background: #a1e0ff;color: white;border: none;')
				// add interval that checks if the iframe has been loaded, then open the survey window
				let interval2 = setInterval(function () {
					if ($('iframe').length === 1) {
						clearInterval(interval2)
						$('iframe').load(function () {
							displayX('survey')
							// Go back to the button's name
							setTimeout(function() {
								// Changing text of the button to loading
								$('#menu .option:contains("Loading survey ...") span').html('Take our <b>survey</b>')
								$('#menu div.option').css('pointer-events', 'all')
							},700)
						})
					}
				},100)
			}
		},100)
	} else if ($('div.typeform-widget').length === 1 || $('iframe').length === 1) {
		displayX('survey')
	}
})