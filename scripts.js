const category_url = "https://opentdb.com/api_category.php"
function generate_url(qnt,category_id,difficulty,type){
    return `https://opentdb.com/api.php?amount=${qnt}&category=${category_id}&difficulty=${difficulty}&type=${type}`
}
var url = generate_url(10, 20, "easy", "multiple")
console.log(url);

var form = document.getElementById('form')

