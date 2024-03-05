$(document).ready(function() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function handleRadioChange() {
        // hide all time slots when radio changes
        $(this).closest('.day-section').find('.time-slot').hide();
        
        // show the selected time slot option
        if (this.value === 'single') {
        $(this).closest('.day-section').find('.single').show();
        } else if (this.value === 'double') {
        $(this).closest('.day-section').find('.double').show();
        }
    }

    function createSlider(sliderId, inputOpenId, inputCloseId) {
        var slider = document.getElementById(sliderId);
        noUiSlider.create(slider, {
            start: [480, 1020], // example start range in minutes (8:00 to 17:00)
            connect: true,
            range: {
                'min': 0,
                'max': 1440 // 24 hours in minutes
            },
            step: 15, // 15 minute increments
            format: {
              to: function(value) {
                var hours = Math.floor(value / 60);
                var minutes = value % 60;
                return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
              },
              from: function(value) {
                var parts = value.split(':');
                return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
              }
            }
        });

        // when the slider value changes, update the inputs
        slider.noUiSlider.on('update', function(values, handle) {
            var value = values[handle];
            if (handle === 0) { // if handle is 0, it's the opening time
                $(inputOpenId).val(value);
            } else { // if handle is 1, it's the closing time
                $(inputCloseId).val(value);
            }
        });

        // Update the slider from the input fields
        $(inputOpenId + ', ' + inputCloseId).on('change', function() {
            var openTime = $(inputOpenId).val().split(':').map(function(val) { return parseInt(val, 10); });
            var closeTime = $(inputCloseId).val().split(':').map(function(val) { return parseInt(val, 10); });
            slider.noUiSlider.set([openTime[0] * 60 + openTime[1], closeTime[0] * 60 + closeTime[1]]);
        });
    }

    function initializeDaySections() {
        days.forEach((day, index) => {
            const dayIndex = index; // Unique identifier for each day
            const $daySection = $('#dayTemplate').clone().removeAttr('id').show();
            $daySection.find('strong').text(day);
    
            // Adjusted to ensure IDs are set correctly and exist in the DOM before initialization
            $daySection.find('.time-slider').each(function() {
                const sliderType = $(this).hasClass('single') ? 'single' : 'double';
                const sliderId = `slider-${sliderType}-${day.toLowerCase()}-${dayIndex}`;
                const inputOpenId = `open-${sliderType}-${day.toLowerCase()}-${dayIndex}`;
                const inputCloseId = `close-${sliderType}-${day.toLowerCase()}-${dayIndex}`;
    
                // Ensure nextAll is correctly targeting the intended inputs
                $(this).attr('id', sliderId);
                $(this).nextAll('input[type=time]').first().attr('id', inputOpenId);
                $(this).nextAll('input[type=time]').last().attr('id', inputCloseId);
            });
    
            $('#daysContainer').append($daySection);
    
            // Initialize the slider after the element is surely in the DOM
            $daySection.find('.time-slider').each(function() {
                const sliderType = $(this).hasClass('single') ? 'single' : 'double';
                const sliderId = `slider-${sliderType}-${day.toLowerCase()}-${dayIndex}`;
                const inputOpenId = `#open-${sliderType}-${day.toLowerCase()}-${dayIndex}`;
                const inputCloseId = `#close-${sliderType}-${day.toLowerCase()}-${dayIndex}`;
    
                createSlider(sliderId, inputOpenId, inputCloseId);
            });
        });
    }
    
    $('#hoursForm').submit(function(event) {
        event.preventDefault();
        // form submission logic
        alert("form submission logic goes here.");
    });
    
    initializeDaySections();
});