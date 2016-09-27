
//guidebox api key :  rKUkSLCTdUPbDIjEaj773V5YBYNm7kH4

//Default pull of most recent reviews.  Data placed in recentReviews array
var init = true;
queryMovieReviews(init);

function changeDisplayReview(data , time , index)
{
	setTimeout(function()
	{
		document.getElementById('featuredTitle').innerHTML = data.results[index].display_title;
		document.getElementById('featuredSummary').innerHTML = data.results[index].summary_short;

		if((data.results[index].multimedia) !== null)
		{
			document.getElementById('featuredImage').src = data.results[index].multimedia.src;
		}
		else
		{
			document.getElementById('featuredImage').src = "";
		}

		$("#featuredpicLink").attr("href", data.results[index].link.url);
		$("#featuredtitleLink").attr("href", data.results[index].link.url);
		if(index !== 5)
		{
			index = index +1;
		}
		else
		{
			index = 0;
		}

		changeDisplayReview(data, time , index);
	}, time); //1 second is 1000
}


function initalizeDisplayReview(data)
{

	document.getElementById('featuredTitle').innerHTML = data.results[0].display_title;
	document.getElementById('featuredSummary').innerHTML = data.results[0].summary_short;

	//set image
	if(data.results[0].multimedia !== null)
	{
		document.getElementById('featuredImage').src = data.results[0].multimedia.src;
		$("#featuredImage").fadeIn(400);
	}
	else
	{
		document.getElementById('featuredImage').src = "";
		$("#featuredImage").fadeIn(400);
	}


	$("#featuredpicLink").attr("href", data.results[0].link.url);
	$("#featuredtitleLink").attr("href", data.results[0].link.url);

	//begin recursive changing
	changeDisplayReview(data, 3000 , 1);
}

function queryMovieReviews(initalize, searchWord, sort)
{
	if(initalize === true)
	{
		var url = "https://api.nytimes.com/svc/movies/v2/reviews/all.json";
		url += '?' + $.param({
			'api-key': "e2b6cc6848774ae6b8456b10dcabde34",
			'order': "by-publication-date"
		});
	}
	else
	{
		var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
		url += '?' + $.param({
			'api-key': "e2b6cc6848774ae6b8456b10dcabde34",
			'query': searchWord
		});
	}

	$.ajax({
		url: url,
		method: 'GET',
		success: function(data)
		{
			if(initalize === true)
			{
				initalizeDisplayReview(data);
			}
			else
			{

				var searchResults = "<ul>";
				var reviews = data.results;
				for (var review in reviews)
				{
					searchResults = searchResults + "<li><div class = 'review'><div class = 'reviewTitle'>" + reviews[review].display_title + "</div>";
					if(reviews[review].multimedia !== null)
					{
						searchResults = searchResults + "<div class = 'reviewImage'><img src='"+ reviews[review].multimedia.src +"'></div>";
					}

					searchResults = searchResults +"<div class = 'reviewSummary'>"+ reviews[review].summary_short;
					searchResults = searchResults + "<a href = '" + reviews[review].link.url + "'>  <br/>See more</a></div><div class = 'reviewClear'></div></div></li>";
				}

				if(searchResults === "<ul>")
				{
					searchResults = "No results"
				}

				document.getElementById("resultsOutput").innerHTML = searchResults;
			}

		}

	});
};

$("#button").click(function()
{
	var init = false;
	var searchKeyWord = $("#search-bar").val();
	queryMovieReviews(init, searchKeyWord)
});


$("#OnSearch").click(function()
{
	$("#searchTab").fadeIn();
	$("#featuredTab").fadeOut();
	$("#OnFeatured").toggleClass("tabActive");
	$("#OnSearch").toggleClass("tabActive");
});

$("#OnFeatured").click(function()
{
	$("#searchTab").fadeOut();
	$("#featuredTab").fadeIn();
	$("#OnFeatured").toggleClass("tabActive");
	$("#OnSearch").toggleClass("tabActive");
});
