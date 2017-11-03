//= require jquery

@mysql_real_escape_string = (str) ->
  str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) ->
      switch char
        when "\0" then "\\0"
        when "\x08" then "\\b"
        when "\x09" then "\\t"
        when "\x1a" then "\\z"
        when "\n" then "\\n"
        when "\r" then "\\r"
        when "\"", "'","\\", "%" then ""
        # prepends a backslash to backslash, percent,
        # and double/single quotes
    )

$(document).ready ->
  $('form').submit (e) ->
    e.preventDefault()
    email = mysql_real_escape_string(
      $("input[name='session[email]']").val()
    )
    password = mysql_real_escape_string(
      $("input[type='password']").val()
    )
    form_data = $('form').serialize()
    form_data = form_data.replace(/email.+/g, '')
    form_data += "email=#{email}&password=#{password}"
    $.ajax(
      method: $('form').prop('method'),
      url: $('form').prop('action'),
      data: form_data
    ).done( ->
        console.log "submit"
        return
    ).fail( ->
        $('.login-error').show()
        $('.alert-danger').html('Invalid email or password')
        $('input[type="submit"]').attr('disabled', false)
    )
