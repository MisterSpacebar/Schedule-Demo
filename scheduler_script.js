$(document).ready(function() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function handleRadioChange() {
        // Hide all time slots when radio changes
        $(this).closest('.day-section').find('.time-slot').hide();
        
        // Show the selected time slot option
        if (this.value === 'single') {
        $(this).closest('.day-section').find('.single').show();
        } else if (this.value === 'double') {
        $(this).closest('.day-section').find('.double').show();
        }
    }

    function initializeDaySections() {
        days.forEach(day => {
          const $daySection = $('#dayTemplate').clone().removeAttr('id').show();
          $daySection.find('strong').text(day);
    
          // Initialize radio button names and handle change event
          const radioName = `${day.toLowerCase()}Mode`;
          $daySection.find('input[type=radio]').attr('name', radioName).change(handleRadioChange);
    
          // Set the 'Closed' option as default and trigger change to hide time slots
          $daySection.find(`input[type=radio][value=closed]`).prop('checked', true).trigger('change');
    
          $('#daysContainer').append($daySection);
        });
    }
    
    $('#hoursForm').submit(function(event) {
        event.preventDefault();
        // Form submission logic goes here
        alert("Form submission logic goes here.");
    });
    
    initializeDaySections();
});