(function(tpwCalculator, $, undefined) {
    var $finalWashVolume = $("#finalWashVolume");
    var $outputs = {
        sugar: $("#sugar"),
        tomatoPaste: $("#tomatoPaste"),
        lemonJuice: $("#lemonJuice"),
        yeast: $("#yeast")
    };
    
    var ingredientMultipliers = {
        sugar: 0.225,
        tomatoPaste: 9.825,
        lemonJuice: 3.3831,
        yeast: 2.812
    };

    function roundNumber(number, places)
    {
        var places10 = Math.pow(10, places);
        return Math.round(number * places10) / places10;
    }

    function finalWashVolumeChangeHandler()
    {
        var finalWashVolume = $finalWashVolume.val();
        $.each($outputs, function(fieldName, $field) {
            var fieldStep = $field.attr("step") || 1;
            var inverseStep = 1 / fieldStep;
            var newValue = finalWashVolume * ingredientMultipliers[fieldName];
            newValue = Math.round(newValue * inverseStep) / inverseStep;
            $field.val(newValue);
        });
    };
    

    // hookup event handlers
    $finalWashVolume.on('input', finalWashVolumeChangeHandler);
    finalWashVolumeChangeHandler();
}(window.tpwCalculator = window.tpwCalculator || {}, jQuery));
