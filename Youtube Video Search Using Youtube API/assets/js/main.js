(function ($) {
	"use strict";

    jQuery(document).ready(function($){


        $(document).on('click','.video-play-btn',function(e){
       
            var vid = $(this).attr("id");
            var title =$(this).data('title')
            //alert(title);
            var svid = sessionStorage.setItem('svid',vid);
            var stitle =sessionStorage.setItem('stitle',title);
             window.location = 'video.html'
             return false;
            
        });
        

    	$('#searchForm').submit(function(e){
    		e.preventDefault(); 
    		var q = $('#searchText').val();
    		getVideo(q);
    	});

    	function getVideo(q){
    		$.get(
    			'https://www.googleapis.com/youtube/v3/search',{
    				part:'snippet,id',
    				maxResults: 16,
    				order: 'date',
    				q: q,
    				type: 'video',
    				key:'AIzaSyCkneE6R4QnoWZdPY_0Wsic-2qmiae2MQY'
    			},
    			function(data){
    				//console.log(data.items)
    				var output='';
    				$.each(data.items,function(index,results){
    					output += ` 
						<div class="col-md-3 col-sm-6 col-xs-12">
						<div class="well text-center custom">
						<img src="${results.snippet.thumbnails.medium.url}" alt="Movie Poster" width="200" />
						<h5>${results.snippet.title}</h5>
                        <a  class="btn btn-success video-play-btn"  id="${results.id.videoId}" data-title="${results.snippet.title}" href="#">Play</a>
						<a class="btn btn-info" target="_blank" href="https://www.ssyoutube.com/watch?v=${results.id.videoId}">Download</a>
						</div>
						</div>
    					`
    				});
                   
    				$('#searchResult').html(output);
    			}
    		);
}


    });



}(jQuery));	




 function singlevideo(){
            var svid = sessionStorage.getItem("svid");
            var stitle = sessionStorage.getItem("stitle");
            $.get(
                'https://www.googleapis.com/youtube/v3/search',{
                    part:'snippet,id',
                    q: svid,
                    maxResults: 1,
                    type: 'video',
                    key:'AIzaSyCkneE6R4QnoWZdPY_0Wsic-2qmiae2MQY'
                },
                function(data){
                    //console.log(data.items);
                    var output ="";
                    $.each(data.items,function(index,item){
                        output += `
                        <div class="panel panel-default">
                            <div class="panel-body">
                            <iframe width="720" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                            </div>
                            <div class="panel-footer">
                            <h3>${item.snippet.title}</h3>
                            <p><b>Channel Title: </b> ${item.snippet.channelTitle}</p>
                            <p><b>Video Description: </b> <br />
                            ${item.snippet.description}
                            </p>
                            </div>
                        </div>

                        `;
                    });
                    $('#singlevideo').html(output);
                }
            )
            $.get(
                'https://www.googleapis.com/youtube/v3/search',{
                    part:'snippet,id',
                    q: stitle,
                    maxResults: 5,
                    type: 'video',
                    key:'AIzaSyCkneE6R4QnoWZdPY_0Wsic-2qmiae2MQY'
                },
                function(data){
                    console.log(data.items);
                    var output = '';
                    $.each(data.items,function(index,item){
                        output += `
                        <div class="singleitem">
                            <img src="${item.snippet.thumbnails.medium.url}" alt="video image">
                            <div class="text">
                                <a  class="video-play-btn"  id="${item.id.videoId}" data-title="${item.snippet.title}" href="#"><h4>${item.snippet.title}</h4></a>
                            </div>
                        </div> 

                        `;
                    });
                    $('#relatedvideo').html(output);
                }

                )
        }