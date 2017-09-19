$.ajax({
	type: "POST",
	url: "http://localhost:12345/getjobs",
	data: {
		page: 0
	},
	success: function(data) {
		var results = JSON.parse(data)
		var html = results.results.map(function(item){
			if(item.company_img){
				return `
					<li class="activeable list-item" data-positionid="${item.position_id}" data-companyid="${item.id}">
						<img src="${item.company_img}" class="item-logo">
						<div class="item-desc">
							<h2 class="item-title">${item.company}</h2>
							<p class="item-info">
								<span class="item-pos">
	                       		 ${item.position_name}
	                    		</span>
								<span class="item-salary">${item.salary}</span>
							</p>
							<p class="item-time">今天 10:00</p>
						</div>
					</li>
				`
			}else{
				return `
					<li class="activeable list-item" data-positionid="${item.position_id}" data-companyid="${item.id}">
						<img src="img/default.jpg" class="item-logo">
						<div class="item-desc">
							<h2 class="item-title">${item.company}</h2>
							<p class="item-info">
								<span class="item-pos">
	                       		 ${item.position_name}
	                    		</span>
								<span class="item-salary">${item.salary}</span>
							</p>
							<p class="item-time">今天 10:00</p>
						</div>
					</li>
				`
			}
		}).join("");
		$(".list").html(html)
	}
})