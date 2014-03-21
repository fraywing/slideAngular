quoteDirectives.directive('slideAngular', function(){

	return {

		scope : {
			"slideAngularMax" : "=",
			"slideAngularIncrement" : "=",
			"slideAngularModel" : "=",
			"slideAngularInitial" : "="
		},
		replace : true,
		template : "<div style='width:100%; position:relative;border:1px solid #C4C4C4; height:13px; background:#E5E5E5; border-radius:10px;' >\
			<div>\
				<span class='slide-angular-knob' style='border:1px solid #C4C4C4; position:relative; border-radius:100%; background:#D8D8D8; cursor:pointer; vertical-align: top; padding:5px 7px; font-size:10px; color:#5B5B5B;' >\
					<span>\
						{{priceValue}}\
					<span>\
				</span>\
			</div>\
		</div>",
		controller : function($scope){

			$scope.bindKnob = function(e){
				
			}
			$scope.unbindKnob = function(e){

			}
		},
		link : function(scope, el, attr){
			var bound = false;

			var knob = $(el).find('.slide-angular-knob');

			knob.mousedown(function(e){
				e.stopPropagation();
				bound = true;
			});
			$(el).mouseup(function(){
				bound = false;
			});
			knob.mouseup(function(){
				bound = false;
			});

			scope.changePosValue = function(val)
			{	
				val = scope.slideAngularIncrement * Math.floor(val/scope.slideAngularIncrement);
				$(knob).html(Math.floor((scope.slideAngularMax*val)/100));
				scope.slideAngularModel = Math.floor((scope.slideAngularMax*val)/100);
				knob.css('left',val+"%");

			}	

			scope.changePosValue(scope.slideAngularInitial);

			scope.changePos = function(e){
				var newPos = ~($(el).offset().left - e.clientX),
					posInc = Math.floor(newPos),
					barWidth = Math.floor(($(el).width())),
					perc = Math.floor(((posInc/barWidth)*100));

					return perc;
			}

			$(el).click(function(e){
				e.stopPropagation();
				var perc = scope.changePos(e);
				perc = scope.slideAngularIncrement * Math.floor(perc/scope.slideAngularIncrement);
				if(perc % scope.slideAngularIncrement === 0)
					{
						$(knob).html(Math.floor((scope.slideAngularMax*perc)/100));
						scope.slideAngularModel = Math.floor((scope.slideAngularMax*perc)/100);
						knob.css('left',perc+"%");
					}	
			});

			$(el).mousemove(function(e){
				if(bound == true)
				{
				var perc = scope.changePos(e);
				if(perc % scope.slideAngularIncrement === 0)
					{
						$(knob).html(Math.round((scope.slideAngularMax*perc)/100));
						scope.slideAngularModel = Math.round((scope.slideAngularMax*perc)/100);
						knob.css('left',perc+"%");
					}	
				}
			});
		}

	};

});
