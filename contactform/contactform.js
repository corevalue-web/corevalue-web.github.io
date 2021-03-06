jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function () {
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (!i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function () { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    if (ferror) return false;
    else var str = $(this).serialize();
    var action = $(this).attr('action');
    if (!action) {
      action = 'contactform/contactform.php';
    }

    var url = 'http://192.168.100.125:8080/gmail/send';
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();
    $.ajax({
      url: url,
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({ "name": name, "email": email, "subject": subject, "message": message }), //Stringified Json Object
      async: false,    //Cross-domain requests and dataType: "jsonp" requests do not support synchronous operation
      cache: false,    //This will force requested pages not to be cached by the browser  
      processData: false, //To avoid making query String instead of JSON
      success: function (resposeJsonObject) {
        alert("Sent");
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
        // Success Action
      }
    });
    /*$.ajax({
      url: 'http://localhost:8080/gmail/send',
      async: false,
      data: gmail,
      error: function(response) {
        //displayResponseMessage(response);
        console.log("Error");
      },
      success: function(response) {
        console.log(" Successfull");
      },
      type: 'POST',
      headers: {
        Accept: 'application/json;charset=utf-8',
        contentType: 'application/json;charset=utf-8'
      },
      dataType: 'json'
    });*/
    return false;
  });

});
