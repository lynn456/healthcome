var oLogin = {
	init: function() {
		oLogin.submit()
	},
	submit: function() {
		$('form[role="login"]').submit(function(e) {
			e.preventDefault()

			var email = $('#email'),
			password  = $('#password')

			if ( email.val() == '' ) {
				alert('請確認 EMAIL')
				email.focus()
				return false
			}

			if ( password.val() == '' ) {
				alert('請確認密碼')
				password.focus()
				return false
			}

			firebase.auth().signInWithEmailAndPassword(email.val(), password.val())
			.then(function(user) {
				if ( user.email ) {
					location.replace('/cms/main.html')
				}
			})
			.catch(function(error) {
				switch ( error.code ) {
					case 'auth/invalid-email':
						alert('EMAIL 格式錯誤')
						break;

					case 'auth/user-not-found':
						alert('EMAIL 不存在')
						break;

					case 'auth/wrong-password':
						alert('密碼錯誤')
						break;

					case 'auth/user-disabled':
						alert('帳號鎖定中')
						break;

					default:
						alert('登入錯誤（' + error.code + '）')
						break;
				}
			});
		})
	}
}
oLogin.init()