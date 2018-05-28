var output = $('#out');
var input = $('#in');

var is_korean = function(txt) {
	return /[가-힣]|[ㅊ]/.test(txt);
}
var is_special = function(txt) {
	return /[_]|[ㅏ]/.test(txt);
}

var trans = function(k, c) {
	switch(k) {
		case '아':
			return 'あ';
		case '이':
			return 'い';
		case '우':
			return 'う';
		case '에':
			return 'え';
		case '오':
			return 'お';
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
			return 'せ';
		case '소':
			return 'そ';
		case '타':
		case '따':
			return 'た';
		case '찌':
		case '치':
			return 'ち';
		case '츠':
		case '쯔':
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
		case '야':
			return 'や';
		case '유':
			return 'ゆ';
		case '요':
			return 'よ';
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
		case 'お':
			if (c === 'ㅏ')
				return 'わ';
			else if (c === '_')
				return 'を';
			else return '';
			break;
		case '응':
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
		case 'ず':
			return 'づ';
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
		case 'ㅊ':
			return 'っ';
		case 'や':
			return 'ゃ';
		case 'ゆ':
			return 'ゅ';
		case 'よ':
			return 'ょ';

	}
	return '';
}

input.keydown(function(e) {
	if (e.keyCode === 8) {
		if (input.val().length === 0) {
			output.val(output.val().slice(0, -1));
		}
	}
})
input.bind('input propertychange', function(e) {
	var val = this.value;
	if (is_korean(val)) {
		var ch = trans(val);
		if (ch) {
			output.val(output.val() + ch);
			input.val('');
		}
	} else if (is_special(val)) {
		if (output.val().length === 0) return;
		var last = output.val().slice(-1);
		var changed = trans(last, val);
		if (changed) {
			output.val(output.val().slice(0, -1) + trans(last, val));
			input.val('');
		}
	}
});

$('#search').click(function() {
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
})