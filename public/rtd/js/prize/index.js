$(function(){
    $('#dropDownList').show();
})
function changeDropdown(dateId,date,dateFullYear)
{
	var prizeShowRound = "ประกาศผลครั้งที่ "+dateId+" ประจำวันที่ "+dateFullYear;
	$('#allPrize').show();
	$('#specialGift').show();
	$('#collectPrize').hide();
	$('#showDate').empty();
	$('#showDate').append(date);
	$('#date_id').val(dateId);
	$('#prizeShowRound').show();
	$('#prizeShowRound').empty();
	$('#prizeShowRound').append(prizeShowRound);
	$('#prizeShowRoundMobile').show();
	$('#prizeShowRoundMobile').empty();
	$('#prizeShowRoundMobile').append(prizeShowRound);

	console.log(dateId);
	if(dateId == 61){
		$('#allPrize').hide();
		$('#special-gift').hide();
		$('#special-gift-reward').show();
	}else{
		$('#special-gift').show();
		$('#special-gift-reward').hide();
	}

	$('tr[id^="reward-"]').hide();
	$('div[id^="reward-"]').hide();
	$('table[id^="reward-"]').hide();
	// $('#samsung-'+dateId).show();
	// $('tr[id^="bigDoll-"]').hide();
	$('.reward-'+dateId).show();
	// $('#listMenu').attr('aria-hidden',true);
	// $('.dropdown').removeClass('expanded');
	// $('tr[id^="bigDoll-'+dateId+'"]').show();
}