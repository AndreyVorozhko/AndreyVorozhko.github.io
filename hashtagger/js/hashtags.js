var hashtags = {
    popular : ['love','woman','winter','summer','spring','autumn','smile','beauty','fashion','style','lady','girl','femme','cool','ootd','outfits','dress','handmade','inspiration','femmefatale','queen','girlpower','beautiful','aesthetic'],
    fashion : ['fashionadvice','wardrobe','mindfuldressing','fashionwriter','fashionblogger','personalshopper','whattowear','outfitoftheday','outfit','fashionsecrets','instafashionist','fashiontips','womanfashion','fashiondaily','fashionvideo','fashionstudy','colorfashion','instafashion','fashiongram'],
    style : ['stylist','styleadvice','fashionstyle','knowyourstyle','stylewriter','styleblogger','personalstylist','lookoftheday','lifeofstylist','stylesecrets','mylookstyle','stylebook','stylevideo','stylestudy','foryourstyle','styletips','styleguide','styleinspiration','womensstyle','styleblog'],
    color : ['coloradvice','inspirationcolor','colouranalysis','colouranalyst','knowyourcolours','knowyourwowcolours','livelifeincolour','stylecolor','colorstylist','dresscolor','lookcolor','warmcolours'],
    special : ['dwynlarson','alltypesofbeauty','typesofbeauty','beautyofalltypes','gamine','classic','flamboyant','natural','romantic','dramatic','gamindramatic','romanticclassic','romanticnatural','naturalromantic','gaminclassic','romanticdramatic','naturalclassic','naturalgamine','dramaticgamine','naturaldramatic','romanticgamine'],
    other : ['bodytype', 'whattowear','onlineshopping','personalstyle','personalityprofile','clothingpersonality','imageconsultant','beautyblogger','onlineshopper','imagemaker','lookbest','howtolookgood','whatwomenwant','ootdinspo','elengantandchic','outfitidea','ilovethislook','outfitlove','yourimage','chicdetails','inspirationpic','personalstylistonline','mylookbook','mylooklike','ootdlovers','inspirationnature','whatwomanwant'],
    always : ['onlinestylist']
};

$(document).ready(function(){
    function addTags(tags){
        var str = '';
        tags.forEach(function(item, i, arr){
            str += '<span><input type="checkbox" id="' + item + '" name="' + item + '" value="' + item + '"><label for="' + item + '"> #' + item + '</label></span>';
        });
        return str;
    }
    
    function tagsOut(arr){
        var out = '';
        arr.forEach(function(item, i, arr){
            out += '#' + item + ' ';
        });
        return out;
    }
    
    function copyToClipboard(element) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($(element).text()).select();
      document.execCommand("copy");
      $temp.remove();
    }
    
    $('.popular p').html(addTags(hashtags.popular));
    $('.fashion p').html(addTags(hashtags.fashion));
    $('.style p').html(addTags(hashtags.style));
    $('.color p').html(addTags(hashtags.color));
    $('.special p').html(addTags(hashtags.special));
    $('.other p').html(addTags(hashtags.other));
    $('.always p').html(addTags(hashtags.always));
    
    var total = 0;
    for (key in hashtags) {
        total += hashtags[key].length;
    }
    $('#total').text('Hashtags total:' + total);
    
    var list = [];
    
    $('#hashwrapper').on('change', 'input', function(e){
        if(e.currentTarget.checked){
        list.push(e.currentTarget.value);
        }else{
            for(var i = list.length - 1; i >= 0; i--) {
                if(list[i] === e.currentTarget.value) {
                   list.splice(i, 1);
                }
            }
        }
        var count = '';
        if(list.length > 30){
            count = '<span class="nomore">' + list.length + '</span>';
        }else{
            count = '<span class="maymore">' + list.length + '</span>';
        }
        $('#count').html(count);
        $('#result').text(tagsOut(list));
    });
    
    $('#copy').on('click',function(e){
        e.preventDefault();
        copyToClipboard($('#result'));
    });
});
