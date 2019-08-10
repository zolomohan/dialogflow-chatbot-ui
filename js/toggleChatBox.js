$('.chatToggle').click(() => {
	$('.chatContainer').slideToggle(() => $('textarea').focus());
})