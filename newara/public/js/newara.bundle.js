// 22/11/2026: Frappe 16.60 bỏ nút Home (về /desk) ở đầu breadcrumb trên thanh tiêu đề trang.
// Thêm lại: mỗi lần trang vẽ breadcrumb (frappe.ui.Page.render_breadcrumbs) thì chèn 1 crumb icon Home lên đầu.
// Chèn ở bước vẽ chứ không sửa danh sách item của trang (page.breadcrumbs), nên các chỗ đọc/ghi lại
// breadcrumb (set_title, frappe.breadcrumbs.add…) không bị nhân đôi nút Home.
(function () {
	const Page = frappe.ui && frappe.ui.Page;
	if (!Page || Page.prototype.__newara_home_crumb) return;

	const render_breadcrumbs = Page.prototype.render_breadcrumbs;
	Page.prototype.render_breadcrumbs = function () {
		render_breadcrumbs.apply(this, arguments);

		const $ol = this.$breadcrumbs;
		// không có breadcrumb (vd page trong dialog) thì không vẽ nút Home lẻ loi
		if (!$ol || !$ol.length || !$ol.children("li").length) return;

		const title = frappe.utils.escape_html(__("Home"));
		$ol.prepend(
			`<li class="newara-home-crumb">
				<a class="es-breadcrumbs__item" href="/desk" title="${title}" aria-label="${title}">
					${frappe.utils.icon("home", "sm", "", "", "", true)}
				</a>
			</li>`
		);
	};
	Page.prototype.__newara_home_crumb = true;
})();
