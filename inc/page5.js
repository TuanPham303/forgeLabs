(function ($) {

  toggleAfterSubmitPage();
  clientInfoValidator();

  // email validator
  function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
      return true;
    } else {
      return false;
    }
  }
  // phone number validator
  function validatePhoneNumber(phoneNumber){
    for(let i = 0; i < phoneNumber.length; i++){
      if(isNaN(phoneNumber[i])){
        return false;
      } else {
        return true;
      }
    }
  }
  // validate information empty or not
  function validateEmptyData(data){
    if(data){
      return true;
    } else {
      return false;
    }
  }
  
  function clientInfoValidator(){
    const email = $('#client-email');
    const phoneNumber = $('#phone-number');

    email.on('blur', function(){
      if (!validateEmail(email.val())) {
        $('.email-alert').text('Please provide a valid email address');
        email.focus();
      } else {
        $('.email-alert').text('');
      }
    })

    phoneNumber.on('blur', function(){
      if (!validatePhoneNumber(phoneNumber.val())) {
        $('.phone-alert').text('Please provide a valid phone number');
        phoneNumber.focus();
      } else {
        $('.phone-alert').text('');
      }
    })

  }

  function toggleAfterSubmitPage() {
    $('.close-icon-wrap').on('click', function () {
      $('.after-submit-wrap').hide();
    })
  }


})(jQuery);





