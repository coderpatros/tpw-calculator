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
        waterChangeHandler();
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
    
    function waterChangeHandler()
    {
		var totalVolume = Number(document.getElementById('metricFinalWashVolume').value)
		//volume of all ingredients. 
		var totalSugar = Number(document.getElementById('metricSugar').value) / 1.58 //sacharose density = 1.58
		var totalTomato = Number(document.getElementById('metricTomatoPaste').value) /1120 // tomato paste density = 1.12
		var totalLemon = Number(document.getElementById('metricLemonJuice').value) / 1000
		var remainingWater = totalVolume - (totalSugar + totalTomato + totalLemon)
		document.getElementById('metricWater').value = roundNumberByStepValue(remainingWater, 0.1)
		document.getElementById('imperialWater').value = roundNumberByStepValue(remainingWater * 0.264172052, 0.1)
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
