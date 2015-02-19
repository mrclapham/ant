calculate = function (dividend)
{
   this.onError= function(){
        alert("CLASS ERROR")
       return "Please ensure you entered a number."
    }

    var val = this.input.value
    return  !isNaN(parseFloat( val) ? val/dividend : this.onError());
}
