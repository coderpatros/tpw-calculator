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

    function roundNumberByStepValue(number, stepValue)
    {
        var inverseStep = 1 / stepValue;
        return Math.round(number * inverseStep) / inverseStep;
    }

    function finalWashVolumeChangeHandler()
    {
        var finalWashVolume = $finalWashVolume.val();
        $.each($outputs, function(fieldName, $field) {
            var fieldStep = $field.attr("step") || 1;
            var newValue = finalWashVolume * ingredientMultipliers[fieldName];
            $field.val(roundNumberByStepValue(newValue, fieldStep));
        });
    };

    function otherIngredientChangeHandler()
    {
        var ingredientName = $(this).attr("id");
        var ingredientValue = $(this).val();
        var newfinalWashValue = ingredientValue / ingredientMultipliers[ingredientName];
        var finalWashStep = $finalWashVolume.attr("step") || 1;
        $finalWashVolume.val(roundNumberByStepValue(newfinalWashValue, finalWashStep));
        $finalWashVolume.change();
    };
    

    // hookup event handlers
    $finalWashVolume.change(finalWashVolumeChangeHandler);
    $finalWashVolume.on('input', finalWashVolumeChangeHandler);
    finalWashVolumeChangeHandler();

    $.each($outputs, function(fieldName, $field) {
        $field.change(otherIngredientChangeHandler);
        $field.on('input', otherIngredientChangeHandler);
    });
}(window.tpwCalculator = window.tpwCalculator || {}, jQuery));
