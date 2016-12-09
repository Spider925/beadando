/*
Panel fejlécekben a kategória alá tartozó képek darabszámának megjelenítése
*/
//console.log($('.indexpictures'))
const $panels = $('.panel')
$panels.each(function() {
    const $panel = $(this)
    const db = $panel.find('.indexpictures').length
    $panel.find('.panel-heading span').before(` (${db}) `)
})


$headings = $('.panel-heading')
$headings.on('click', function () {
    const $ul = $(this).next()
    $ul.slideToggle()

})