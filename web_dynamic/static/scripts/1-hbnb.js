window.addEventListener('load', function () {
  const testVars = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      testVars[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).prop('checked')) {
      delete testVars[$(this).attr('data-id')];
    }
    if (Object.keys(testVars).length === 0) {
      $('div.amenities h4').html('&nbsp');
    } else {
      $('div.amenities h4').text(Object.values(testVars).join(', '));
    }
  });
});
