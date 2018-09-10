(function(tpwCalculator, $, undefined) {
    var $metricFinalWashVolume = $("#metricFinalWashVolume");
    var $outputs = $("input[data-multiplier]");
    
    function roundNumberByStepValue(number, stepValue)
    {
        var inverseStep = 1 / stepValue;
        return Math.round(number * inverseStep) / inverseStep;
    }

    function metricFinalWashVolumeChangeHandler()
    {
        var finalWashVolume = Number($metricFinalWashVolume.val());
        $outputs.each(function(index, field) {
            var $field = $(field);
            var fieldStep = $field.attr("step") || 1;
            var multiplier = Number($field.data("multiplier"));
            var newValue = finalWashVolume * multiplier;
            $field.val(roundNumberByStepValue(newValue, fieldStep));
        });
    };

    function otherIngredientChangeHandler()
    {
        var ingredientValue = Number($(this).val());
        var multiplier = Number($(this).data("multiplier"));
        var newfinalWashValue = ingredientValue / multiplier;
        var finalWashStep = $metricFinalWashVolume.attr("step") || 1;
        $metricFinalWashVolume.val(roundNumberByStepValue(newfinalWashValue, finalWashStep));
        $metricFinalWashVolume.change();
    };
    

    // hookup event handlers
    $metricFinalWashVolume.change(metricFinalWashVolumeChangeHandler);
    $metricFinalWashVolume.on('input', metricFinalWashVolumeChangeHandler);
    metricFinalWashVolumeChangeHandler();

    $outputs.each(function(index, field) {
        var $field = $(field);
        $field.change(otherIngredientChangeHandler);
        $field.on('input', otherIngredientChangeHandler);
    });
}(window.tpwCalculator = window.tpwCalculator || {}, jQuery));