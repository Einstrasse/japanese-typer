var output = $('#out');
var input = $('#in');
var search = $('#search');

const history_limit = 200;
if(localStorage.getItem('history')) {
	var data = localStorage.getItem('history').split(',');
	if (data.length > 0) {
		var last = data[data.length - 1];
		output.val(last);
	}
} else {
	localStorage.setItem('history', "")
}

var is_korean = function(txt) {
	return /[가-힣]|[ㅇ]|[ㅅ]|[ㅑ]|[ㅠ]|[ㅛ]/.test(txt);
}
var is_special = function(txt) {
	return /[_]|[ㅏ]|[ㅣ]|[ㅜ]|[ㅔ]|[ㅗ]|[ㅑ]|[ㅠ]|[ㅛ]|[ㅡ]/.test(txt);
}

var jap2jap = function(j, k) {
	switch(j) {
		case 'ん': //ㅇ
			if (k === 'ㅏ')
				return 'あ';
			if (k === 'ㅣ')
				return 'い';
			if (k === 'ㅜ' || k === 'ㅡ')
				return 'う';
			if (k === 'ㅔ')
				return 'え';
			if (k === 'ㅗ')
				return 'お';
			if (k === 'ㅑ')
				return 'や';
			if (k === 'ㅠ')
				return 'ゆ';
			if (k === 'ㅛ')
				return 'よ';
			break;
		case 'う':
			if (k === 'ㅇ') 
				return 'ん';
			break;
			
		case 'っ': //ㅅ
			if (k === 'ㅏ')
				return 'さ';
			if (k === 'ㅣ')
				return 'し';
			if (k === 'ㅜ' || k ==='ㅡ')
				return 'す';
			if (k === 'ㅔ')
				return 'せ';
			if (k === 'ㅗ')
				return 'そ';
			break;
		case 'お': //오
			if (k === 'ㅏ') 
				return 'わ';
			if (k === '_')
				return 'を';
			break;
		case 'じ': //지
			if (k === '_')
				return 'ぢ'; //지_
			break;
		case 'ず': //즈
			if (k === '_')
				return 'づ'; //즈_
			break;
		case 'や':
			if (k === '_')
				return 'ゃ';
			break;
		case 'ゆ':
			if (k === '_')
				return 'ゅ';
			break;
		case 'よ':
			if (k === '_')
				return 'ょ';
			break;
	}
	return '';
}
var kor2jap = function(k, c) {
	switch(k) {

		// case '아':
		// 	return 'あ';
		// case '이':
		// 	return 'い';
		// case '우':
		// 	return 'う';
		// case '에':
		// 	return 'え';
		// case '오':
		// 	return 'お';
		case '카':
		case '까':
			return 'か';
		case '키':
		case '끼':
			return 'き';
		case '쿠':
		case '꾸':
			return 'く';
		case '케':
		case '께':
			return 'け';
		case '코':
		case '꼬':
			return 'こ';
		case '사':
			return 'さ';
		case '시':
			return 'し';
		case '스':
		case '수':
			return 'す';
		case '세':
		case '새':
			return 'せ';
		case '소':
			return 'そ';
		case '타':
		case '따':
			return 'た';
		case '찌':
		case '치':
			return 'ち';
		case '쯔':
		case '쓰':
		case '츠':
			return 'つ';
		case '테':
		case '태':
			return 'て';
		case '토':
			return 'と';
		case '나':
			return 'な';
		case '니':
			return 'に';
		case '누':
			return 'ぬ';
		case '네':
			return 'ね';
		case '노':
			return 'の';
		case '하':
			return 'は';
		case '히':
			return 'ひ';
		case '후':
			return 'ふ';
		case '헤':
		case '해':
			return 'へ';
		case '호':
			return 'ほ';
		case '마':
			return 'ま';
		case '미':
			return 'み';
		case '무':
			return 'む';
		case '메':
			return 'め';
		case '모':
			return 'も';
		
		case '라':
			return 'ら';
		case '리':
			return 'り';
		case '루':
			return 'る';
		case '레':
			return 'れ';
		case '로':
			return 'ろ';
		case 'ㅇ':
			return 'ん';
		case '가':
			return 'が';
		case '기':
			return 'ぎ';
		case '구':
		case '그':
			return 'ぐ';
		case '게':
		case '개':
			return 'げ';
		case '고':
			return 'ご';
		case '자':
			return 'ざ';
		case '지':
			return 'じ';
		case '즈':
		case '주':
			return 'ず';
		case '제':
		case '재':
			return 'ぜ';
		case '조':
			return 'ぞ';
		case '다':
			return 'だ';
		case 'じ':
			return 'ぢ';
		case '데':
		case '대':
			return 'で';
		case '도':
			return 'ど';
		case '바':
			return 'ば';
		case '비':
			return 'び';
		case '부':
			return 'ぶ';
		case '베':
		case '배':
			return 'べ';
		case '보':
			return 'ぼ';
		case '파':
			return 'ぱ';
		case '피':
			return 'ぴ';
		case '푸':
			return 'ぷ';
		case '페':
		case '패':
			return 'ぺ';
		case '포':
			return 'ぽ';
		case 'ㅅ':
			return 'っ';
			//TODO: 복합 요음 문자.(e.g 쿄 => きょ) 처리 필요

	}
	return '';
}

var save_history = function() {
	var val = output.val();
	var data = localStorage.getItem('history').split(',');
	data.push(val);
	if (data.length > history_limit) {
		data.splice(0, data.length/2);
	}
	localStorage.setItem('history', data);
};

input.keydown(function(e) {
	if (e.keyCode === 8) {
		if (input.val().length === 0) {
			output.val(output.val().slice(0, -1));
		}
	} else if (e.keyCode === 13) {
		google_translate();
		e.preventDefault();
	}
})

input.bind('input propertychange', function(e) {
	var val = this.value;
	if (is_korean(val)) {
		var ch = kor2jap(val);
		if (ch) {
			output.val(output.val() + ch);
			save_history();
			input.val('');
			return;
		}
	}
	if (is_special(val)) {
		if (output.val().length === 0) return;
		var last = output.val().slice(-1);
		var changed = jap2jap(last, val);
		if (changed) {
			output.val(output.val().slice(0, -1) + changed);
			save_history();
			input.val('');
			return;
		}
	}
});


var google_translate = function() {
	var japanese_string = output.val();
	var dest_url = `https://translate.google.com/#ja/ko/${japanese_string}`;

	var script = 'if (location.hostname === "translate.google.com") {\
		location.href = "' + dest_url + '"\
	} else {\
		"Notworked";\
	}';
	console.log(script);
	chrome.tabs.executeScript({
		code: script
	}, function(res) {
		if (res.length > 0 && res[0] === 'Notworked') {
			chrome.tabs.create({
				url: dest_url,
				active: true
			});
		}
	});
	
}
var clear_history = function() {
	localStorage.clear();
}
search.click(google_translate);
$('#history_clear').click(clear_history);