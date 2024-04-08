window.addEventListener('load', function () {
    $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    const testVars = {};
    $('.amenities input[type=checkbox]').click(function () {
      if ($(this).prop('checked')) {
        testVars[$(this).attr('data-id')] = $(this).attr('data-name');
      } else if (!$(this).prop('checked')) {
        delete testVars[$(this).attr('data-id')];
      }
      if (Object.keys(testVars).length === 0) {
        $('div.amenities h4').html('&nbsp;');
      } else {
        $('div.amenities h4').text(Object.values(testVars).join(', '));
      }
    });
  
    const countyIds = {};
    const mtaaIds = {};
    $('.filters button').click(function () {
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({
          amenities: Object.keys(testVars),
          states: Object.keys(countyIds),
          cities: Object.keys(mtaaIds)
        })
      }).done(function (data) {
        $('section.places').empty();
        $('section.places').append('<h1>Places</h1>');
        for (const place of data) {
          const template = `<article>
            <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">
        $${place.price_by_night}
      </div>
            </div>
            <div class="information">
            <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
  
            <br />
  
      ${place.max_guest} Guests
  
      </div>
            <div class="number_rooms">
            <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
  
            <br />
  
      ${place.number_rooms} Bedrooms
      </div>
            <div class="number_bathrooms">
            <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
            <br />
        ${place.number_bathrooms} Bathroom
      </div>
        </div>
            <div class="description">
        ${place.description}
      </div>
        <div class="reviews">
        <h2>Reviews <span class="reviewSpan" data-id="${place.id}">show</span></h2>
        <ul>
        </ul>
        </div>
  
      </article> <!-- End 1 PLACE Article -->`;
          $('section.places').append(template);
        }
        $('.reviewSpan').click(function (event) {
          $.ajax('http://0.0.0.0:5001/api/v1/places/' + $(this).attr('data-id') + '/reviews').done(function (data) {
        $('span').addClass('hideReview');
            if ($('.reviewSpan').text('show')) {
              for (const review of data) {
                $('.reviews ul').append(`<li>${review.text}</li>`);
              }
          console.log($('.reviewSpan li'));
          $('.hideReview').text('hide');
            } else if ($('.hideReview').text('hide')){
              $('.reviews ul').empty();
          $('.reviewSpan').text('show');
            }
          });
        });
      });
    });
  
    $('.stateCheckBox').click(function () {
      if ($(this).prop('checked')) {
        countyIds[$(this).attr('data-id')] = $(this).attr('data-name');
      } else if (!$(this).prop('checked')) {
        delete countyIds[$(this).attr('data-id')];
      }
      if (Object.keys(countyIds).length === 0 && Object.keys(mtaaIds).length === 0) {
        $('.locations h4').html('&nbsp;');
      } else {
        $('.locations h4').text(Object.values(countyIds).concat(Object.values(mtaaIds)).join(', '));
      }
    });
  
    $('.cityCheckBox').click(function () {
      if ($(this).prop('checked')) {
        mtaaIds[$(this).attr('data-id')] = $(this).attr('data-name');
      } else if (!$(this).prop('checked')) {
        delete mtaaIds[$(this).attr('data-id')];
      }
      if (Object.keys(countyIds).length === 0 && Object.keys(mtaaIds).length === 0) {
        $('.locations h4').html('&nbsp;');
      } else {
        $('.locations h4').text(Object.values(mtaaIds).concat(Object.values(countyIds)).join(', '));
      }
    });
  });
