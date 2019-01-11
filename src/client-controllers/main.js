
// function to check broken links
function urlExists(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      callback(xhr.status < 400);
    }
  };
  xhr.open('HEAD', url);
  xhr.send();
}

// function to crawl the site and get all the urls to check broken links
function crawlUrl(url) {
	$.get('/crawlcrawler', {
		siteurl: url,

	}).done((data) => {
		console.log(data);
		// const filename = "Orphan_Assets.xlsx";
		// const ws_name = "OrphanAsset";
		// const wb = XLSX.utils.book_new();
		// const ws = XLSX.utils.json_to_sheet(data);
		//
		// /* add worksheet to workbook */
		// XLSX.utils.book_append_sheet(wb, ws, ws_name);
		// /* write workbook */
		// XLSX.writeFile(wb, filename);

	});

}

$(document).ready(() => {
  $('#solution0').click(() => {
		const url = $('#solution0-crawl').val();
		// crawlUrl(url);
		crawlUrl(url);
		// .done((data) => {
		// 	if (data.stat === 'ok') {
		// 		urlExists('https://stackoverflow.com/questions/1591401/javascript-jquery-check-broken-links', function(exists) {
    // 		console.log('"%s" exists?',  exists);
		// 		});
		// 	}
		// });
	});
  });
